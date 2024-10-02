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
      name: 'price', // required
      type: 'number', // required
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
