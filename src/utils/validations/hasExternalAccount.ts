import { ExternalAccountType } from '../../pages/auth'
import { UserProfile } from '../../pages/profile'
import { UserMeFragment } from '../../types/generated/graphql'

type UserAccount = UserMeFragment | UserProfile

export const hasNostrAccount = (user: UserAccount) => {
  if (!user || !user.id) {
    return false
  }

  return (user.externalAccounts || []).some((account) => {
    return account?.accountType === ExternalAccountType.nostr
  })
}

export const hasTwitterAccount = (user: UserAccount) => {
  if (!user || !user.id) {
    return false
  }

  return (user.externalAccounts || []).some((account) => {
    return account?.accountType === ExternalAccountType.twitter
  })
}

export const hasFacebookAccount = (user: UserAccount) => {
  if (!user || !user.id) {
    return false
  }

  return (user.externalAccounts || []).some((account) => {
    return account?.accountType === ExternalAccountType.facebook
  })
}

export const hasGoogleAccount = (user: UserAccount) => {
  if (!user || !user.id) {
    return false
  }

  return (user.externalAccounts || []).some((account) => {
    return account?.accountType === ExternalAccountType.google
  })
}

export const hasGithubAccount = (user: UserAccount) => {
  if (!user || !user.id) {
    return false
  }

  return (user.externalAccounts || []).some((account) => {
    return account?.accountType === ExternalAccountType.github
  })
}

export const hasLightningAccount = (user: UserAccount) => {
  if (!user || !user.id) {
    return false
  }

  return (user.externalAccounts || []).some((account) => {
    return account?.accountType === ExternalAccountType.lightning
  })
}
