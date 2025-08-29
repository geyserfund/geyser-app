import { useSetAtom } from 'jotai'

import { __production__, __staging__ } from '@/shared/constants'
import { useGuardianProjectRewardsGetQuery } from '@/types'

import { guardianRewardsAtom, guardianRewardsLoadingAtom } from '../state/guardianRewards'

const PRODUCTION_GUARDIAN_PROJECT_ID = 2621
const STAGING_GUARDIAN_PROJECT_ID = 892
const DEVELOPMENT_GUARDIAN_PROJECT_ID = 892

const guardianProjectId = __production__
  ? PRODUCTION_GUARDIAN_PROJECT_ID
  : __staging__
  ? STAGING_GUARDIAN_PROJECT_ID
  : DEVELOPMENT_GUARDIAN_PROJECT_ID

export const useGuardianProjectRewards = () => {
  const setGuardianProjectRewards = useSetAtom(guardianRewardsAtom)
  const setGuardianProjectRewardsLoading = useSetAtom(guardianRewardsLoadingAtom)

  useGuardianProjectRewardsGetQuery({
    variables: {
      input: {
        where: {
          projectId: guardianProjectId,
        },
      },
    },
    onCompleted(data) {
      setGuardianProjectRewards(data.projectRewardsGet)
      setGuardianProjectRewardsLoading(false)
    },
    onError() {
      setGuardianProjectRewardsLoading(false)
    },
  })
}
