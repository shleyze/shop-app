import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    hideAPIURL: true,
  },
  timestamps: false,
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
      label: 'Название',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Краткое Описание',
      type: 'textarea',
    },
    {
      name: 'description',
      label: 'Подробное описание',
      type: 'textarea',
    },
    {
      name: 'price',
      label: 'Цена',
      type: 'number',
      required: true,
    },
    {
      name: 'category',
      label: 'Категория',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'stores',
      label: 'Магазины',
      type: 'relationship',
      relationTo: 'stores',
      hasMany: true,
    },
    {
      name: 'mainImage',
      label: 'Главное изображение',
      type: 'upload',
      relationTo: 'media',
      // required: true,
    },
    // {
    //   name: 'additionalImages',
    //   type: 'array',
    //   fields: [
    //     {
    //       name: 'image',
    //       type: 'upload',
    //       relationTo: 'media',
    //     },
    //   ],
    // },

    // {
    //   name: 'inStock',
    //   type: 'checkbox',
    //   defaultValue: true,
    // },
    // {
    //   name: 'sku',
    //   type: 'text',
    //   unique: true,
    // },
  ],
}
