import { useQuery } from '@apollo/client'

import { QUERY_USER_ACCOUNT_PASSWORD_FUNDS_SUMMARY } from '@/modules/project/graphql/queries/user.ts'

type UserAccountPasswordFundsSummaryQuery = {
  userAccountPasswordFundsSummary: {
    unclaimedFundsSats: number
    tiaUnclaimedFundsSats: number
    aonUnclaimedFundsSats: number
    pledgedSats: number
  }
}

export const useUserAccountPasswordFundsSummary = () =>
  useQuery<UserAccountPasswordFundsSummaryQuery>(QUERY_USER_ACCOUNT_PASSWORD_FUNDS_SUMMARY, {
    fetchPolicy: 'network-only',
  })
