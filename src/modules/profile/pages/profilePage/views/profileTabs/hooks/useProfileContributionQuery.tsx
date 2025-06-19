import { t } from 'i18next'
import { useState } from 'react'

import { usePaginationAtomHook } from '@/shared/hooks/utils/usePaginationAtomHook.tsx'

import { UserProjectContributionFragment, useUserProfileContributionsQuery } from '../../../../../../../types'
import { useNotification } from '../../../../../../../utils'

const PROFILE_CONTRIBUTION_FETCH_LIMIT = 30

export const useProfileContributionQuery = (userId: number) => {
  const { toast } = useNotification()
  const [isLoading, setIsLoading] = useState(true)
  const [contributions, setContributions] = useState<UserProjectContributionFragment[]>([])

  const { fetchMore } = useUserProfileContributionsQuery({
    variables: {
      where: {
        id: userId,
      },
      input: {
        pagination: {
          take: PROFILE_CONTRIBUTION_FETCH_LIMIT,
        },
      },
    },
    skip: !userId,
    onCompleted(data) {
      handleDataUpdate(data.user.contributions)
      setIsLoading(false)
    },
    onError(error) {
      toast({
        status: 'error',
        title: t('Failed to fetch contributions'),
        description: `${error.message}`,
      })
      setIsLoading(false)
    },
  })

  const { handleDataUpdate, isLoadingMore, noMoreItems, fetchNext } =
    usePaginationAtomHook<UserProjectContributionFragment>({
      fetchMore,
      queryName: ['user', 'contributions'],
      itemLimit: PROFILE_CONTRIBUTION_FETCH_LIMIT,
      variables: {
        where: {
          id: userId,
        },
      },
      setData: setContributions,
    })

  return { isLoading, contributions, isLoadingMore, noMoreItems, fetchNext }
}
