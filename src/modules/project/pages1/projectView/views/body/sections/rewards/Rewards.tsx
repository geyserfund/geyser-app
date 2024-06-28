import { GridItem, SimpleGrid, Text } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import { isActive, toInt, useMobileMode, useNotification } from '../../../../../../../../utils'
import { useFundingContext } from '../../../../../../context'
import { useProjectAtom, useRewardsAtom } from '../../../../../../hooks/useProjectAtom'
import { BodySectionLayout } from '../../components'
import { RewardCard } from './components/RewardCard'

export const Rewards = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  const { toast } = useNotification()

  const { project } = useProjectAtom()
  const { rewards } = useRewardsAtom()

  const {
    fundForm: { state: fundFormState, setState: setFundingFormState, updateReward },
  } = useFundingContext()

  if (!isActive(project.status) || rewards.length === 0) {
    return null
  }

  const activeProjectRewards = rewards.filter((reward) => reward && reward.isHidden === false)

  const renderRewards = () => {
    if (activeProjectRewards.length > 0) {
      return activeProjectRewards.map((reward) => {
        // This is the number of items that is selected
        const count = (fundFormState.rewardsByIDAndCount && fundFormState.rewardsByIDAndCount[`${reward.id}`]) || 0

        return (
          <RewardCard
            key={reward.id}
            width="100%"
            reward={reward}
            count={0}
            onRewardClick={() => {
              if (reward.maxClaimable && reward.maxClaimable - reward.sold <= count) {
                toast({
                  title: 'Reward Limit',
                  description: `Maximum number of ${reward.maxClaimable - reward.sold} rewards are available`,
                  status: 'error',
                })
                return
              }

              updateReward({ id: toInt(reward.id), count: count + 1 })
              setFundingFormState('step', 'contribution')
            }}
          />
        )
      })
    }

    return (
      <GridItem colSpan={isMobile ? 2 : 1}>
        <Text>{t('There are no rewards available.')}</Text>
      </GridItem>
    )
  }

  if (!activeProjectRewards.length) {
    return null
  }

  return (
    <BodySectionLayout ref={ref} title={t('Rewards')}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4} width={'100%'}>
        {renderRewards()}
      </SimpleGrid>
    </BodySectionLayout>
  )
})
