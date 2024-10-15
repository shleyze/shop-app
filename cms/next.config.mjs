import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  redirects: async () => [
    {
      source: '/',
      destination: '/admin/',
      permanent: true,
    },
  ],
}

export default withPayload(nextConfig)
