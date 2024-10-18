import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    hideAPIURL: true,
  },
  timestamps: false,
  labels: {
    singular: 'Категория',
    plural: 'Категории',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Название',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Краткое описание',
      type: 'text',
      required: true,
    },
  ],
}
