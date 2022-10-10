import { IUserExternalAccount, IUserProfile } from '../interfaces';

export const hasTwitterAccount = (user: IUserProfile) => {
  if (!user) {
    return false;
  }

  return user.externalAccounts.some(
    (account: IUserExternalAccount) => account.type === 'twitter',
  );
};
