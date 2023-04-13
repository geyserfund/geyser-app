import { ExternalAccountType } from '../../pages/auth'
import { User } from '../../types/generated/graphql'

export const hasNostrAccount = (user: User) => {
  if (!user) {
    return false
  }

  return (user.externalAccounts || []).some((account) => {
    return account?.accountType === ExternalAccountType.nostr
  })
}

export const hasTwitterAccount = (user: User) => {
  if (!user) {
    return false
  }

  return (user.externalAccounts || []).some((account) => {
    return account?.accountType === ExternalAccountType.twitter
  })
}

export const hasLightningAccount = (user: User) => {
  if (!user) {
    return false
  }

  return (user.externalAccounts || []).some((account) => {
    return account?.accountType === ExternalAccountType.lightning
  })
}
