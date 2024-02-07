import { VStack } from '@chakra-ui/layout'

import { useProjectContext } from '../../../../../context'
import { standardPadding } from '../../../../../styles'
import { ActivityBrief } from './ActivityBrief'
import { InfoScreenFeed } from './InfoScreenFeed'
import { InfoScreenRewards } from './InfoScreenRewards'

export const InfoScreen = () => {
  const { project } = useProjectContext()

  if (!project) {
    return null
  }

  const activeProjectRewards = project
    ? project.rewards.filter((reward) => reward.isHidden === false)
    : []

  return (
    <VStack
      py={{ base: '0px', lg: '10px' }}
      spacing={4}
      width="100%"
      height="100%"
      overflowY="hidden"
      position="relative"
    >
      <ActivityBrief px={standardPadding} />

      {activeProjectRewards.length > 0 ? (
        <InfoScreenRewards />
      ) : (
        <InfoScreenFeed />
      )}
    </VStack>
  )
}
