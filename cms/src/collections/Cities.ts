import type { CollectionConfig } from 'payload'

export const Cities: CollectionConfig = {
  slug: 'cities',
  labels: {
    singular: 'Город',
    plural: 'Города',
  },
  timestamps: false,
  access: {
    read: () => true,
  },

  admin: {
    useAsTitle: 'name',
    hideAPIURL: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название',
    },
    {
      name: 'coordinates',
      type: 'group',
      label: 'Координаты',
      admin: {
        disableListColumn: true,
      },
      fields: [
        {
          name: 'latitude',
          label: 'Широта',
          type: 'number',
          required: true,
        },
        {
          name: 'longitude',
          label: 'Долгота',
          type: 'number',
          required: true,
        },
      ],
    },
  ],
}
