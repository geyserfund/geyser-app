import { Badge, Box, Link, Stack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'

import { StickToTop } from '../../../../../../../../../shared/components/layouts'
import { dimensions, ID, PathName } from '../../../../../../../../../shared/constants'
import { standardPadding } from '../../../../../../../../../styles'
import { useMobileMode } from '../../../../../../../../../utils'
import { ProjectRewardPanel } from '../../../components'

export const InfoScreenRewards = () => {
  const isMobile = useMobileMode()
  const { project } = useProjectAtom()
  const { rewards } = useRewardsAtom()
  const navigate = useNavigate()

  const handleAllRewardsButtonClick = () => {
    // setMobileView(MobileViews.rewards)
    navigate(PathName.projectRewards)
  }

  if (!project) {
    return null
  }

  const activeProjectRewards = rewards?.filter((reward) => reward.isHidden === false)
  if (activeProjectRewards.length === 0) {
    return null
  }

  return (
    <Box
      id={ID.project.activity.rewards.wrapper}
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      overflow="hidden"
      flex="1"
    >
      <StickToTop
        id={ID.project.activity.rewards.body}
        wrapperId={ID.project.activity.rewards.wrapper}
        width="100%"
        offset={dimensions.topNavBar.desktop.height}
        bias={10}
        buffer={10}
        disable={!isMobile}
      >
        <InfoScreenRewardsTitle
          rewardsLength={activeProjectRewards.length}
          handleAllRewardsButtonClick={handleAllRewardsButtonClick}
        />
      </StickToTop>

      <VStack width="100%" overflow="auto" height={'100%'} pb="20px" px={standardPadding}>
        {activeProjectRewards.map((reward) => (
          <ProjectRewardPanel key={reward.id} reward={reward} />
        ))}
      </VStack>
    </Box>
  )
}

export const InfoScreenRewardsTitle = ({
  rewardsLength,
  handleAllRewardsButtonClick,
}: {
  rewardsLength: number
  handleAllRewardsButtonClick: () => void
}) => {
  const { t } = useTranslation()

  return (
    <Stack w="full" direction="row" justify="space-between" alignItems={'center'} px={standardPadding} py="10px">
      <Stack direction="row" alignItems={'center'}>
        <Text fontWeight={500} fontSize={18} color="neutral.900" lineHeight={1}>
          {t('Rewards')}
        </Text>
        <Badge>{rewardsLength}</Badge>
      </Stack>
      <Text fontWeight={500} onClick={handleAllRewardsButtonClick}>
        <Link fontSize={'16px'} color={'neutral.600'} textDecoration={'none'}>
          {t('See all rewards')}
        </Link>
      </Text>
    </Stack>
  )
}
