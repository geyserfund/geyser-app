import { IUserProfile } from '../interfaces';

export const defaultUser: IUserProfile = {
  id: 0,
  username: '',
  imageUrl: '',
  externalAccounts: [],
  contributions: [],
  ownerOf: [],
};
