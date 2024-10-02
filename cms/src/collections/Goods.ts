import type { CollectionConfig } from 'payload'

export const Goods: CollectionConfig = {
  slug: 'goods',
  labels: {
    singular: 'Позиция',
    plural: 'Позиции',
  },
  admin: {
    useAsTitle: 'title',
    hideAPIURL: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название',
      required: true,
    },
  ],
}
