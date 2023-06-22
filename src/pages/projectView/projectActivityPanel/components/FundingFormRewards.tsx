import { CheckIcon } from '@chakra-ui/icons'
import { Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ItemCard } from '../../../../components/layouts/ItemCard'
import { SectionTitle } from '../../../../components/ui'
import { useProjectContext } from '../../../../context'
import { ProjectRewardForCreateUpdateFragment } from '../../../../types'
import { FundingFormRewardItem } from '../../projectMainBody/components'

type Props = {
  readOnly?: boolean
  onRewardClick?: (reward: ProjectRewardForCreateUpdateFragment) => void
}

export const FundingFormRewards = ({ readOnly, onRewardClick }: Props) => {
  const { t } = useTranslation()
  const {
    project,
    fundForm: { state, updateReward, resetRewards },
  } = useProjectContext()

  const rewards = project?.rewards || []

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

  const handleAdd = (rewardId: number, count: number) => {
    updateReward({ id: rewardId, count: count + 1 })
  }

  const handleRemove = (rewardId: number, count: number) => {
    if (count > 0) {
      updateReward({ id: rewardId, count: count - 1 })
    }
  }

  return (
    <Box width="100%">
      <SectionTitle>{t('Donate to receive a reward')}</SectionTitle>

      {rewards.length > 0 ? (
        <VStack mt={1} padding="2px">
          {readOnly ? null : (
            <ItemCard cursor="initial" onClick={resetRewards}>
              <HStack>
                <Text flexGrow={1} fontWeight={500}>
                  {t('No reward')}
                </Text>
                <IconButton
                  variant="secondary"
                  isActive={!hasSelectedRewards}
                  border={
                    hasSelectedRewards ? '1px solid neutral.200' : undefined
                  }
                  aria-label="select-reward"
                  icon={hasSelectedRewards ? undefined : <CheckIcon />}
                />
              </HStack>
            </ItemCard>
          )}
          {rewards.map((reward) => {
            const count = getRewardCount(reward.id)
            const add = () => handleAdd(reward.id, count)
            return (
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
                item={reward}
                count={count}
              />
            )
          })}
        </VStack>
      ) : null}
    </Box>
  )
}
