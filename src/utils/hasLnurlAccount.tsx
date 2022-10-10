import { IUserExternalAccount, IUserProfile } from '../interfaces';

export const hasLnurlAccount = (user: IUserProfile) => {
  if (!user) {
    return false;
  }

  return user.externalAccounts.some(
    (account: IUserExternalAccount) => account.type === 'lnurl',
  );
};
