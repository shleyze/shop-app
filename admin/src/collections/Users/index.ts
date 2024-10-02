import type { CollectionConfig, Endpoint } from 'payload'

import { anyone, authenticated, authenticatedAsAdmin } from '@/access'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticatedAsAdmin,
    create: anyone,
    delete: authenticatedAsAdmin,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'userKind',
      type: 'group',
      fields: [
        {
          name: 'isAdmin',
          type: 'checkbox',
          label: 'Admin',
          defaultValue: false,
        },
        {
          name: 'isClient',
          type: 'checkbox',
          label: 'Client',
          defaultValue: true,
        },
      ],
      access: {
        create: authenticatedAsAdmin,
        update: authenticatedAsAdmin,
      },
    },
  ],
  timestamps: true,
}

export default Users
