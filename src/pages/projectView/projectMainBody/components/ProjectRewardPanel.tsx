import { Box, Button, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { PathName } from '../../../../constants'
import { MobileViews, useProjectContext } from '../../../../context'
import {
  ProjectRewardForCreateUpdateFragment,
  RewardCurrency,
} from '../../../../types'
import { isActive, toInt } from '../../../../utils'
import { ProjectRewardAvailability } from '../../../../components/molecules/projectDisplay/ProjectRewardAvailability'

type Props = {
  reward: ProjectRewardForCreateUpdateFragment,
  key?: number
}

export const ProjectRewardPanel = ({ reward }: Props) => {
  const { t } = useTranslation()
  const {
    project,
    setMobileView,
    fundForm: { updateReward, setState: setFundingFormState },
  } = useProjectContext()
  const navigate = useNavigate()
  const rewardStockRemaining = reward.maxClaimable ? reward.maxClaimable - reward.sold : -1;

  if (!project || !isActive) {
    return <></>
  }

  return (
    <Box
      w="100%"
      backgroundColor="neutral.50"
      border="2px"
      borderColor="neutral.200"
      borderRadius={12}
      mt={2}
      p={3}
      pos={'relative'}
    >
        <Stack direction="row">
            <Box width="70px">
                <Box style={{display: 'block', position: 'relative', paddingTop: '100%', width: '100%', borderRadius: "12px", overflow: "hidden"}}>
                    <Box style={{display: 'block', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `transparent url(${reward.image}) no-repeat center center / cover`}}>
                    </Box>
                </Box>
            </Box>
            <Stack direction="column" flex={1} pl={2} gap={0.25}>
                <Text fontWeight={700} fontSize={14} color='neutral.900'>{reward.name}</Text>
                <Text fontSize={14} color='neutral.600'>
                    <ProjectRewardAvailability numberOfRewardsAvailable={rewardStockRemaining} />
                    {`${reward.sold} ${t('sold')}`}
                </Text>
            </Stack>
            <Stack direction="column" align={'flex-end'} justifyContent={'space-between'}>
                <Text lineHeight={1.4} fontWeight={700} fontSize={14} color='neutral.600'>{project.rewardCurrency == RewardCurrency.Usdcent ? `$${reward.cost / 100}` : `${reward.cost.toLocaleString()} sats`}</Text>
                <Button
                    variant='secondary'
                    size='sm'
                    px={2}
                    onClick={async () => {
                        updateReward({ id: toInt(reward.id), count: 1 })
                        await navigate(PathName.projectRewards)
                        setMobileView(MobileViews.funding)
                        setFundingFormState('step', 'contribution')
                    }}
                    isDisabled={rewardStockRemaining === 0}
                >
                    <Text isTruncated>{t('Select')}</Text>
                </Button>
            </Stack>
        </Stack>
    </Box>
  )
}
