import { User } from '../types/generated/graphql'

export const defaultUser: User = {
  __typename: 'User',
  id: 0,
  email: '',
  username: '',
  imageUrl: '',
  externalAccounts: [],
  contributions: [],
  ownerOf: [],
  entries: [],
  fundingTxs: [],
  projects: [],
  projectFollows: [],
  badges: [],
}
