import { Box, Button, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { ProjectRewardAvailability } from '../../../../../../../components/molecules/projectDisplay/ProjectRewardAvailability'
import { Body2 } from '../../../../../../../components/typography'
import { ImageWithReload } from '../../../../../../../components/ui'
import { PathName } from '../../../../../../../shared/constants'
import { ProjectRewardForCreateUpdateFragment, RewardCurrency } from '../../../../../../../types'
import { isActive, toInt } from '../../../../../../../utils'
import { useFundingContext } from '../../../../../context'
import { useProjectAtom } from '../../../../../hooks/useProjectAtom'
import { ProjectRewardShippingEstimate } from '../../../../../pages1/projectView/views/rewards/components/ProjectRewardShippingEstimate'

type Props = {
  reward: ProjectRewardForCreateUpdateFragment
  key?: number
}

export const ProjectRewardPanel = ({ reward }: Props) => {
  const { t } = useTranslation()
  const location = useLocation()
  const { project } = useProjectAtom()
  const {
    fundForm: { updateReward, setState: setFundingFormState },
  } = useFundingContext()
  const navigate = useNavigate()

  const isRewardAvailable = reward.maxClaimable ? reward.maxClaimable - reward.sold > 0 : true

  const isInProjectPage = location.pathname.includes(PathName.project)

  if (!project || !isActive(project.status)) {
    return <></>
  }

  return (
    <Box w="100%" border="2px" borderColor="neutral.200" borderRadius={12} mt={2} p={3} pos={'relative'}>
      <Stack direction="row" flexWrap={'wrap'}>
        <Box
          width="96px"
          height="72px"
          borderRadius={6}
          overflow={'hidden'}
          border="1px solid"
          borderColor={'neutral.700'}
        >
          <ImageWithReload src={reward.image || ''} alt={reward.name} width="100%" height="100%" objectFit="cover" />
        </Box>
        <Stack direction="column" flex={1} pl={2} spacing="3px">
          <Body2 xBold color="neutral.900">
            {reward.name}
          </Body2>
          <Body2 color="neutral.600">
            <ProjectRewardAvailability reward={reward} isColored />
            {`${reward.sold} ${t('backers')}`}
          </Body2>
          <ProjectRewardShippingEstimate reward={reward} />
        </Stack>
        <Stack direction="column" align={'flex-end'} justifyContent={'space-between'}>
          <Text lineHeight={1.4} fontWeight={700} fontSize={14} color="neutral.600">
            {project.rewardCurrency === RewardCurrency.Usdcent
              ? `$${reward.cost / 100}`
              : `${reward.cost.toLocaleString()} sats`}
          </Text>
          <Button
            variant="primaryNeutral"
            size="sm"
            px={2}
            onClick={async () => {
              updateReward({ id: toInt(reward.id), count: 1 })
              if (isInProjectPage) {
                await navigate(PathName.projectRewards)
              }

              // setMobileView(MobileViews.funding)
              setFundingFormState('step', 'contribution')
            }}
            isDisabled={!isRewardAvailable}
          >
            <Text isTruncated>{t('Select item')}</Text>
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
