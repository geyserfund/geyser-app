import { VStack } from '@chakra-ui/layout'

import { useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'

import { standardPadding } from '../../../../../../../../styles'
// import { MobileViews, useProjectContext } from '../../../../../../context'
import { ActivityBrief } from './views/ActivityBrief'
import { InfoScreenFeed } from './views/InfoScreenFeed'
import { InfoScreenRewards } from './views/InfoScreenRewards'

export const InfoScreen = () => {
  const { project } = useProjectAtom()
  const { rewards } = useRewardsAtom()

  if (!project) {
    return null
  }

  const activeProjectRewards = rewards ? rewards.filter((reward) => reward.isHidden === false) : []
  const showFeed = activeProjectRewards.length === 0

  return (
    <VStack
      py={{ base: '0px', lg: '10px' }}
      spacing={4}
      width="100%"
      height="100%"
      overflow="hidden"
      position="relative"
    >
      <ActivityBrief px={standardPadding} />

      {showFeed ? <InfoScreenFeed /> : <InfoScreenRewards />}
    </VStack>
  )
}
