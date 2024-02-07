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
  key?: number
}

export const ProjectRewardPanel = ({ reward }: Props) => {

  const { t } = useTranslation()
  const {
    project,
    setMobileView,
    fundForm: { updateReward },
  } = useProjectContext()
  const navigate = useNavigate()
  const rewardStockRemaining = reward.maxClaimable ? reward.maxClaimable - reward.sold : -1;

  if(!project || !isActive) {
    return <></>;
  }

  const renderRewardAvailability = () => {
    if(rewardStockRemaining > 0) {
      return <><Box as={'span'} color={'secondary.red'}>{rewardStockRemaining + ` ${t('remaining')}`}</Box> <Box as={'span'} style={{fontSize: "10px", position: "relative", top: "-2px"}}>&#8226;</Box> </>;
    } else if (rewardStockRemaining === 0) {
      return <><Box as={'span'} color={'neutral.600'} fontWeight={700}>{t('Sold Out')}</Box> <Box as={'span'} style={{fontSize: "10px", position: "relative", top: "-2px"}}>&#8226;</Box> </>;
    } else {
      return '';
    }
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
            <Box width="70px">
                <Box style={{display: 'block', position: 'relative', paddingTop: '100%', width: '100%', borderRadius: "12px", overflow: "hidden"}}>
                    <Box style={{display: 'block', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `transparent url(${reward.image}) no-repeat center center / cover`}}>
                    </Box>
                </Box>
            </Box>
            <Stack direction="column" flex={1} pl={2} gap={0.25}>
                <Text fontWeight={700} fontSize={14} color='neutral.900'>{reward.name}</Text>
                <Text fontSize={14} color='neutral.600'>
                    {renderRewardAvailability()}
                    {`${reward.sold} ${t('sold')}`}
                </Text>
            </Stack>
            <Stack direction="column" align={'flex-end'} justifyContent={'space-between'}>
                <Text lineHeight={1.4} fontWeight={700} fontSize={14} color='neutral.600'>{project.rewardCurrency == RewardCurrency.Usdcent ? `$${reward.cost / 100}` : `${reward.cost.toLocaleString()} sats`}</Text>
                <Button
                    variant='secondary'
                    size='sm'
                    px={2}
                    onClick={() => {
                        updateReward({ id: toInt(reward.id), count: 1 })
                        navigate(PathName.projectRewards)
                        setMobileView(MobileViews.funding)
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