import { SimpleGrid } from '@chakra-ui/react'

import { useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { ID } from '../../../../../../../shared/constants'
import { isActive } from '../../../../../../../utils'
import { RewardCard } from '../../../../projectView/views/rewards/shared'

export const ProjectCreationRewards = () => {
  const { project } = useProjectAtom()
  const { rewards } = useRewardsAtom()

  if (!project || !isActive || !rewards || rewards.length === 0) {
    return null
  }

  const renderRewards = () => {
    return rewards.map((reward) => {
      return <RewardCard key={reward.id} width="100%" reward={reward} noLink isLaunch />
    })
  }

  if (!rewards.length) {
    return null
  }

  return (
    <>
      <CardLayout
        id={ID.project.rewards.container}
        width="100%"
        flexDirection="column"
        alignItems="flex-start"
        spacing="25px"
        dense
        noborder
        p={0}
      >
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={'20px'} width={'100%'}>
          {renderRewards()}
        </SimpleGrid>
      </CardLayout>
    </>
  )
}
