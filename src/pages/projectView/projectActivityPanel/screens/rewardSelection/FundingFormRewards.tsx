import { Box, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { SectionTitle } from '../../../../../components/ui'
import { useProjectContext } from '../../../../../context'
import { ProjectRewardForCreateUpdateFragment } from '../../../../../types'
import { FundingFormRewardItem } from '../../../projectMainBody/components'
import {useMobileMode, useNotification} from "../../../../../utils";

type Props = {
  readOnly?: boolean
  onRewardClick?: (reward: ProjectRewardForCreateUpdateFragment) => void
}

export const FundingFormRewards = ({ readOnly, onRewardClick }: Props) => {
  const { t } = useTranslation()
  const {
    project,
    fundForm: { state, updateReward },
  } = useProjectContext()
  const isMobile = useMobileMode()
  const rewards = project?.rewards || []
  const { toast } = useNotification()

  const hasRewards = rewards && rewards.length

  if (!hasRewards) {
    return null
  }

  const rewardsById = state.rewardsByIDAndCount || {}

  const hasSelectedRewards = Boolean(
    Object.keys(rewardsById).reduce(
      (prev, key) => prev + (rewardsById[key] || 0),
      0,
    ),
  )

  const getRewardCount = (rewardId: number) => {
    if (state.rewardsByIDAndCount) {
      return state.rewardsByIDAndCount[`${rewardId}`] || 0
    }

    return 0
  }

  const handleAdd = (reward: ProjectRewardForCreateUpdateFragment, count: number) => {
    const rewardStockRemaining = reward.maxClaimable ? reward.maxClaimable - reward.sold : -1;
    if(rewardStockRemaining > count) {
      updateReward({ id: reward.id, count: count + 1 })
    } else {
      toast({
        title: 'Reward Limit',
        description: `Maximum number of ${rewardStockRemaining} available for this reward`,
        status: 'error',
      })
    }
  }

  const handleRemove = (rewardId: number, count: number) => {
    if (count > 0) {
      updateReward({ id: rewardId, count: count - 1 })
    }
  }

  const availableRewards = rewards.filter(reward => getRewardCount(reward.id) === 0)

  return (
    <Box width="100%">
      <SectionTitle>{t('Rewards Basket')}</SectionTitle>

      {hasSelectedRewards ? (
        <VStack mt={1} padding="2px">
          {rewards.map((reward) => {
            const count = getRewardCount(reward.id)
            const add = () => {
              handleAdd(reward, count);
            }

            return (count > 0 ? (
                <FundingFormRewardItem
                    readOnly={readOnly}
                    onClick={onRewardClick ? () => onRewardClick(reward) : add}
                    onRemoveClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      handleRemove(reward.id, count)
                    }}
                    onAddClick={add}
                    key={reward.id}
                    reward={reward}
                    count={count}
                />
            ) : null)
          })}
        </VStack>
      ) : (
          <Text>{t('No rewards are selected')}</Text>
      )}

      {availableRewards.length > 0 && isMobile && (
        <VStack width={"100%"} direction={"column"} mt={5} flex={1} align={"flex-start"}>
          <SectionTitle>{t('Available Rewards')}</SectionTitle>
          <VStack mt={1} padding="2px" width={"100%"}>
            {availableRewards.map((reward) => {
              const count = getRewardCount(reward.id)
              const add = () => {
                handleAdd(reward, count);
              }

              return (count == 0 ? (
                  <FundingFormRewardItem
                      readOnly={readOnly}
                      onClick={onRewardClick ? () => onRewardClick(reward) : add}
                      onRemoveClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        handleRemove(reward.id, count)
                      }}
                      onAddClick={add}
                      key={reward.id}
                      reward={reward}
                      count={count}
                  />
              ) : null)
            })}
          </VStack>
        </VStack>
      )}
    </Box>
  )
}
