import { type CollectionConfig, getPayload } from 'payload'
import config from '@payload-config'
import ShortUniqueId from 'short-unique-id'

import { getEmail } from '@/utils/getEmail'
import type { Order } from '@/payload-types'
import type { LabelFunction, StaticLabel } from 'payload/dist/config/types'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    hideAPIURL: true,
  },
  labels: {
    singular: 'Заказ',
    plural: 'Заказы',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'orderNumber',
      label: 'Номер',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'store',
      label: 'Магазин',
      type: 'relationship',
      relationTo: 'stores',
      required: true,
      hasMany: false,
    },
    {
      name: 'items',
      label: 'Корзина',
      labels: {
        plural: 'Продукта',
        singular: 'Продукт',
      },
      type: 'array',
      required: true,

      fields: [
        {
          name: 'product',
          label: 'Продукт',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'quantity',
          label: 'Количество',
          type: 'number',
          required: true,
          min: 1,
        },
      ],
    },
    {
      name: 'total',
      label: 'Итого',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Нельзя редактировать. Высчитывается автоматически',
      },
    },
    {
      name: 'email',
      label: 'Почта',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      label: 'Статус',
      type: 'select',
      options: [
        { label: 'Создан', value: 'new' },
        { label: 'Отправлен', value: 'shipped' },
        { label: 'Доставлен', value: 'delivered' },
        { label: 'Отменен', value: 'cancelled' },
      ],
      required: true,
      defaultValue: 'new',
      access: {
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
      },
    },
    {
      name: 'shippingAddress',
      label: 'Адрес доставки',
      type: 'text',
      required: true,
    },
    {
      name: 'phoneNumber',
      label: 'Номер телефона',
      type: 'text',
      required: true,
    },
    {
      name: 'paymentMethod',
      label: 'Способ оплаты',
      type: 'select',
      options: [
        { label: 'Самовывоз', value: 'self_delivery' },
        { label: 'Наличные при доставке', value: 'cash_on_delivery' },
        { label: 'Карта при доставке', value: 'cash_on_delivery' },
      ],
      required: true,
    },
    {
      name: 'paymentStatus',
      label: 'Статус оплаты',
      type: 'select',
      options: [
        { label: 'Ожидает оплаты', value: 'pending' },
        { label: 'Оплачено', value: 'paid' },
        { label: 'Ошибка оплаты', value: 'failed' },
        { label: 'Возвращено', value: 'refunded' },
      ],
      required: true,
      defaultValue: 'pending',
    },
    {
      name: 'description',
      label: 'Комментарий клиента',
      type: 'textarea',

      admin: {
        readOnly: true,
        description: 'Нельзя редактировать',
      },
    },
    {
      name: 'notes',
      label: 'Внутренние комментарии',
      type: 'textarea',
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        const order = { ...data } as Order
        const payload = await getPayload({ config })

        let nextOrder = { ...order }

        if (operation === 'create') {
          const uid = new ShortUniqueId({
            dictionary: 'alphanum_upper',
          })

          nextOrder = {
            ...order,
            orderNumber: uid.rnd(),
          }
        }

        const products = await payload.find({
          collection: 'products',
          where: {
            id: {
              in: order?.items?.map((item) => item.product).join(','),
            },
          },
          limit: 100,
        })

        return {
          ...nextOrder,
          total: order?.items?.reduce((acc, item) => {
            const price = products?.docs.find((doc) => doc.id === item.product)?.price || 0
            const quantity = item?.quantity || 0

            acc += price * quantity
            return acc
          }, 0),
        }
      },
    ],

    afterChange: [
      async ({ operation, doc, previousDoc }) => {
        const order = { ...doc } as Order
        const prevOrder = { ...previousDoc } as Order

        if (operation === 'update' && prevOrder.status !== order.status && order.status !== 'new') {
          const payload = await getPayload({ config })

          const products = await payload.find({
            collection: 'products',
            where: {
              id: {
                in: order?.items?.map((item) => item.product).join(','),
              },
            },
          })
          const store = await payload.findByID({
            collection: 'stores',
            id: doc.store,
          })

          const originalOrder = {
            ...doc,
            items: order.items.map((item) => {
              return {
                ...item,
                product: products.docs?.find((doc) => doc.id === item.product),
              }
            }),
            store,
          }

          let label

          if (doc.status === 'shipped') {
            label = 'отправлен'
          }
          if (doc.status === 'delivered') {
            label = 'доставлен'
          }
          if (doc.status === 'cancelled') {
            label = 'отменен'
          }

          await payload.email.sendEmail({
            from: 'sender@server.com',
            to: originalOrder.email,
            subject: `Заказ #${originalOrder?.orderNumber} ${label}`,
            html: getEmail(originalOrder),
          })
        }
      },
    ],

    afterOperation: [
      async ({ operation, result }) => {
        const order = { ...result } as Order
        if (operation === 'create') {
          const payload = await getPayload({ config })

          const products = await payload.find({
            collection: 'products',
            where: {
              id: {
                in: order?.items?.map((item) => item.product?.id || item.product).join(','),
              },
            },
          })

          const store = await payload.findByID({
            collection: 'stores',
            id: typeof order.store === 'string' ? order.store : order.store.id,
          })

          const originalOrder = {
            ...order,
            items: order.items.map((item) => {
              return {
                ...item,
                product: products.docs?.find(
                  (doc) => doc.id === item.product || doc.id === item.product?.id,
                ),
              }
            }),
            store,
          } as Order

          await payload.email.sendEmail({
            from: 'sender@server.com',
            to: originalOrder.email,
            subject: `Создан заказ #${originalOrder?.orderNumber}`,
            html: getEmail(originalOrder),
          })
        }
      },
    ],
  },
}
