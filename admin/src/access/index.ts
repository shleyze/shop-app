import type { AccessArgs, Access } from 'payload'

import type { User } from '@/payload-types'

export type isAuthenticated = (args: AccessArgs<User>) => boolean

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user)
}

export const authenticatedAsAdmin: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user) && !!user?.userKind?.isAdmin
}

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}

export const anyone: Access = () => true
