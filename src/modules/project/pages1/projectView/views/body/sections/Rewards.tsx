import { GridItem, IconButton, SimpleGrid, Text } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { BsPencilFill } from 'react-icons/bs'
import { Link, useLocation } from 'react-router-dom'

import { TitleDivider } from '../../../../../../../components/ui/TitleDivider'
import { getPath, ID } from '../../../../../../../constants'
import { CardLayout } from '../../../../../../../shared/components/layouts'
import { isActive, toInt, useMobileMode, useNotification } from '../../../../../../../utils'
import { truthyFilter } from '../../../../../../../utils/array'
import { useProjectAtom, useRewardsAtom } from '../../../hooks/useProjectAtom'
import { RewardCard } from '../components/RewardCard'

export const Rewards = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const location = useLocation()

  const { toast } = useNotification()

  const { project, isProjectOwner } = useProjectAtom()
  const { rewards } = useRewardsAtom()

  // const {
  //   fundForm: { state: fundFormState, setState: setFundingFormState, updateReward },
  // } = useFundingContext()

  if (!isActive(project.status) || rewards.length === 0) {
    return null
  }

  const activeProjectRewards = rewards.filter((reward) => reward && reward.isHidden === false)

  const renderRewards = () => {
    if (activeProjectRewards.length > 0) {
      return activeProjectRewards.map((reward) => {
        // This is the number of items that is selected
        // const count = (fundFormState.rewardsByIDAndCount && fundFormState.rewardsByIDAndCount[`${reward.id}`]) || 0

        return (
          <RewardCard
            key={reward.id}
            width="100%"
            reward={reward}
            count={0}
            onRewardClick={() => {
              // const isRewardAvailable = reward.maxClaimable ? reward.maxClaimable - reward.sold > count : true
              // if (isRewardAvailable) {
              //   updateReward({ id: toInt(reward.id), count: count + 1 })
              // } else {
              //   toast({
              //     title: 'Reward Limit',
              //     description: `Maximum number of ${reward.maxClaimable - reward.sold} rewards are available`,
              //     status: 'error',
              //   })
              // }
              // setMobileView(MobileViews.funding)
              // setFundingFormState('step', 'contribution')
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

  const isRewardTitleFixed = location.pathname.includes('rewards') && isMobile

  const rightActionButton = isProjectOwner ? (
    <IconButton
      aria-label="editRewards"
      as={Link}
      to={getPath('projectManageRewards', project.name)}
      variant="ghost"
      icon={<BsPencilFill />}
    />
  ) : undefined

  if (!activeProjectRewards.length) {
    return null
  }

  return (
    <>
      <CardLayout
        ref={ref}
        id={ID.project.rewards.container}
        width="100%"
        flexDirection="column"
        alignItems="flex-start"
        spacing="25px"
        mobileDense
      >
        <TitleDivider badge={activeProjectRewards.length} isFixed={isRewardTitleFixed} rightAction={rightActionButton}>
          {t('Rewards')}
        </TitleDivider>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={'20px'} width={'100%'}>
          {renderRewards()}
        </SimpleGrid>
      </CardLayout>
    </>
  )
})
