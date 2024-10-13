import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'status', 'total', 'createdAt'],
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'store',
      type: 'relationship',
      relationTo: 'stores',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'total',
      type: 'number',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Новый', value: 'new' },
        { label: 'Подтвержден', value: 'confirmed' },
        { label: 'В обработке', value: 'processing' },
        { label: 'Отправлен', value: 'shipped' },
        { label: 'Доставлен', value: 'delivered' },
        { label: 'Отменен', value: 'cancelled' },
      ],
      required: true,
      defaultValue: 'new',
    },
    {
      name: 'shippingAddress',
      type: 'group',
      fields: [
        { name: 'street', type: 'text', required: true },
        { name: 'city', type: 'text', required: true },
      ],
    },
    {
      name: 'paymentMethod',
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
      name: 'notes',
      type: 'textarea',
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create') {
          data.statusHistory = [
            {
              status: data.status,
              date: new Date(),
            },
          ]
        } else if (operation === 'update') {
          const lastStatus = data.statusHistory[data.statusHistory.length - 1]
          if (lastStatus.status !== data.status) {
            data.statusHistory.push({
              status: data.status,
              date: new Date(),
            })
          }
        }
        return data
      },
    ],
  },
}
