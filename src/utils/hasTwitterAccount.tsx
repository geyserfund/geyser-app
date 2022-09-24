import { IUserExternalAccount, IUser } from '../interfaces';

export const hasTwitterAccount = (user: IUser) => {
  if (!user) {
    return false;
  }

  return user.externalAccounts.some(
    (account: IUserExternalAccount) => account.type === 'twitter',
  );
};
