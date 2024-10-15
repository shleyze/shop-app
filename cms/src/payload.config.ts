import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'
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
          prefix: `https://${process.env.VERCEL_URL}`,
        },
      },
    }),
  ],
  email: nodemailerAdapter({
    defaultFromAddress: 'shop@app.ru',
    defaultFromName: 'ShopApp',
    transport: await nodemailer.createTransport({
      service: 'Gmail',
      port: 465,
      secure: true,
      host: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }),
  }),
})
