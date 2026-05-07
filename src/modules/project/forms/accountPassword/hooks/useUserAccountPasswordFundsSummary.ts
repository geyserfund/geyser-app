import { useUserAccountPasswordFundsSummaryQuery } from '@/types'

export const useUserAccountPasswordFundsSummary = () =>
  useUserAccountPasswordFundsSummaryQuery({
    fetchPolicy: 'network-only',
  })
