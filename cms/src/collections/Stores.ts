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

  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'coordinates',
      type: 'group',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          required: true,
        },
        {
          name: 'longitude',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'city',
      type: 'relationship',
      relationTo: 'cities',
      hasMany: false,
      required: true,
    },

    {
      name: 'deliveryZone',
      type: 'group',
      fields: [
        {
          name: 'polygon',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
