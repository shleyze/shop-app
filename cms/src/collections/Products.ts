import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'mainImage'],
  },
  labels: {
    singular: 'Продукт',
    plural: 'Продукты',
  },
  access: {
    read: () => true,
  },
  auth: false,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'stores',
      type: 'relationship',
      relationTo: 'stores',
      hasMany: true,
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      // required: true,
    },
    {
      name: 'additionalImages',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },

    {
      name: 'inStock',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'sku',
      type: 'text',
      unique: true,
    },
  ],
}
