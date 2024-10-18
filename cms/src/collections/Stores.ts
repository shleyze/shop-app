import type { CollectionConfig } from 'payload'

export const Stores: CollectionConfig = {
  slug: 'stores',
  labels: {
    singular: 'Магазин',
    plural: 'Магазины',
  },
  access: {
    read: () => true,
  },
  timestamps: false,

  admin: {
    useAsTitle: 'name',
    hideAPIURL: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Название',
      required: true,
    },
    {
      name: 'address',
      label: 'Адрес',
      type: 'text',
      required: true,
    },
    {
      name: 'coordinates',
      label: 'Координаты',
      type: 'group',
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
    {
      name: 'city',
      label: 'Город',
      type: 'relationship',
      relationTo: 'cities',
      hasMany: false,
      required: true,
    },
    {
      name: 'deliveryZone',
      label: 'Зона доставки',
      type: 'group',
      admin: {
        disableListColumn: true,
      },
      fields: [
        {
          name: 'polygon',
          label: 'Зоны',
          type: 'json',
          required: true,
        },
      ],
    },
  ],
}
