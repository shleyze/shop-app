import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'
import { Orders } from '@/collections/Orders'
import { Categories } from '@/collections/Categories'
import { Products } from '@/collections/Products'
import { Cities } from '@/collections/Cities'
import { Stores } from '@/collections/Stores'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Orders, Products, Categories, Media, Stores, Cities, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      token: (process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN || '') as string,
      collections: {
        media: {
          disableLocalStorage: true,
          // prefix: 'https://ggtwpgjpqnnys215.public.blob.vercel-storage.com',
        },
      },
    }),
  ],
})
