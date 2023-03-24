import { User } from '../../types/generated/graphql'

export const hasNostrAccount = (user: User) => {
  if (!user) {
    return false
  }

  return (user.externalAccounts || []).some((account) => {
    return account?.type === 'nostr'
  })
}
