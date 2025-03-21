import { t } from 'i18next'
import { useState } from 'react'

import { UserProjectContributionsFragment, useUserProfileContributionsQuery } from '../../../../../../../types'
import { useNotification } from '../../../../../../../utils'

export const useProfileContributionQuery = (userId: number) => {
  const { toast } = useNotification()
  const [isLoading, setIsLoading] = useState(true)
  const [contributions, setContributions] = useState<UserProjectContributionsFragment[]>([])

  useUserProfileContributionsQuery({
    variables: {
      where: {
        id: userId,
      },
    },
    skip: !userId,
    onCompleted(data) {
      setContributions(data.user.projectContributions)
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

  return { isLoading, contributions }
}
