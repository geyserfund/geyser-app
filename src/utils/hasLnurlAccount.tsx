import { User } from '../types/generated/graphql';

export const hasLnurlAccount = (user: User) => {
  if (!user) {
    return false;
  }

  return (user.externalAccounts || []).some((account) => {
    return account?.type === 'lnurl';
  });
};
