import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: 'Заказ',
    plural: 'Заказы',
  },
  admin: {
    hideAPIURL: true,
  },
  fields: [
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'purchase',
      type: 'relationship',
      relationTo: 'goods',
      hasMany: true,
    },
  ],
}
