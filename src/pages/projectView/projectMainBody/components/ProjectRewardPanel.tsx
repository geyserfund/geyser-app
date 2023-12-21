import { Box, Text, Stack, Button } from '@chakra-ui/react'
import {
  ProjectReward
} from '../../../../types'
import { useTranslation } from 'react-i18next'
import { MobileViews, useProjectContext } from '../../../../context'
import { fundingStages } from '../../../../constants'
import {
  isActive,
  toInt
} from '../../../../utils'

type Props = {
  reward: ProjectReward,
  showDetails?: boolean,
  showContributors?: boolean
  key: number
}

export const ProjectRewardPanel = ({ reward, showDetails = false, showContributors = false }: Props) => {

  const { t } = useTranslation()
  const {
    project,
    setMobileView,
    fundingFlow: { fundState },
    fundForm: { updateReward },
  } = useProjectContext()

  if(!project) {
    return;
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
            <Stack direction="column" flex={1} pt={3} pl={2}>
                <Text fontWeight={700} fontSize={16} color='neutral.900' lineHeight={1}>{reward.name}</Text>
                <Text fontSize={12} color='neutral.600'>{
                    `${(reward.maxClaimable && reward.maxClaimable > 0 ? (reward.maxClaimable - reward.sold) + ' remaining, ' : '')}${reward.sold} sold`
                  }</Text>
            </Stack>
            <Stack direction="column" align={'flex-end'}>
                <Text fontWeight={700} fontSize={16} color='neutral.600'>${reward.cost / 100}</Text>
                <Button
                    variant='secondary'
                    size='sm'
                    px={2}
                    style={{ flex: 1 }}
                    onClick={() => {
                      if (
                        fundState === fundingStages.initial &&
                        isActive(project.status)
                      ) {
                        updateReward({ id: toInt(reward.id), count: 1 })
                        setMobileView(MobileViews.funding)
                      }
                    }}
                >
                    <Text isTruncated>{t('Select')}</Text>
                </Button>
            </Stack>
        </Stack>
    </Box>
  )
}