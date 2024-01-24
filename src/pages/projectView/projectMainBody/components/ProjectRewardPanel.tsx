import { Box, Text, Stack, Button } from '@chakra-ui/react'
import {
  ProjectRewardForCreateUpdateFragment, RewardCurrency
} from '../../../../types'
import { useTranslation } from 'react-i18next'
import { MobileViews, useProjectContext } from '../../../../context'
import {
  isActive,
  toInt
} from '../../../../utils'
import { useNavigate } from 'react-router-dom'
import { PathName } from '../../../../constants'

type Props = {
  reward: ProjectRewardForCreateUpdateFragment,
  key: number
}

export const ProjectRewardPanel = ({ reward }: Props) => {

  const { t } = useTranslation()
  const {
    project,
    setMobileView,
    fundForm: { updateReward },
  } = useProjectContext()
  const navigate = useNavigate()

  if(!project || !isActive) {
    return <></>;
  }

  return (
    <Box
      backgroundColor="neutral.50"
      border='2px'
      borderColor='neutral.200'
      borderRadius={12}
      mt={2}
      p={3}
      pos={'relative'}
    >
        <Stack direction="row">
            <Box borderRadius={12} overflow={'hidden'} width="70px">
                <div style={{display: 'block', position: 'relative', paddingTop: '100%', width: '100%'}}>
                    <div style={{display: 'block', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `transparent url(${reward.image}) no-repeat center center / cover`}}>
                    </div>
                </div>
            </Box>
            <Stack direction="column" flex={1} pl={2} gap={0.25}>
                <Text fontWeight={700} fontSize={16} color='neutral.900'>{reward.name}</Text>
                <Text fontSize={12} color='neutral.600'>{
                    `${(reward.maxClaimable && reward.maxClaimable > 0 ? (reward.maxClaimable - reward.sold) + ` ${t('remaining')}, ` : '')}${reward.sold} ${t('sold')}`
                  }</Text>
            </Stack>
            <Stack direction="column" align={'flex-end'}>
                <Text fontWeight={700} fontSize={16} color='neutral.600'>{project.rewardCurrency == RewardCurrency.Usdcent ? `$${reward.cost / 100}` : `${reward.cost.toLocaleString()} sats`}</Text>
                <Button
                    variant='secondary'
                    size='sm'
                    px={2}
                    style={{ flex: 1 }}
                    onClick={() => {
                        updateReward({ id: toInt(reward.id), count: 1 })
                        navigate(PathName.projectRewards)
                        setMobileView(MobileViews.funding)
                    }}
                >
                    <Text isTruncated>{t('Select')}</Text>
                </Button>
            </Stack>
        </Stack>
    </Box>
  )
}