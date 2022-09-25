import { IUserExternalAccount, IUser } from '../interfaces';

export const hasLnurlAccount = (user: IUser) => {
  if (!user) {
    return false;
  }

  return user.externalAccounts.some(
    (account: IUserExternalAccount) => account.type === 'lnurl',
  );
};
