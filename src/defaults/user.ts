import { User } from '../types/generated/graphql';

export const defaultUser: User = {
  id: 0,
  username: '',
  imageUrl: '',
  externalAccounts: [],
  contributions: [],
  ownerOf: [],
};
