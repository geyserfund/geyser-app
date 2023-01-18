import { User } from '../../types/generated/graphql';

export const hasTwitterAccount = (user: User) => {
  if (!user) {
    return false;
  }

  return (user.externalAccounts || []).some((account) => {
    return account?.type === 'twitter';
  });
};
