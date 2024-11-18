import { User } from '../types/generated/graphql'

export const defaultUser: Omit<User, 'heroStats'> = {
  __typename: 'User',
  id: 0,
  email: '',
  username: '',
  heroId: '',
  imageUrl: '',
  externalAccounts: [],
  contributions: [],
  ownerOf: [],
  entries: [],
  fundingTxs: [],
  projects: [],
  projectFollows: [],
  badges: [],
  isEmailVerified: false,
  hasSocialAccount: false,
  posts: [],
}
