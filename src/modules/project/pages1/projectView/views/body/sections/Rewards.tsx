import { GridItem, IconButton, SimpleGrid, Text, useBreakpoint } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { BsPencilFill } from 'react-icons/bs'
import { Link, useLocation } from 'react-router-dom'

import { TitleDivider } from '../../../../../../../components/ui/TitleDivider'
import { getPath, ID } from '../../../../../../../constants'
import { CardLayout } from '../../../../../../../shared/components/layouts'
import { isActive, toInt, useMobileMode, useNotification } from '../../../../../../../utils'
import { truthyFilter } from '../../../../../../../utils/array'
import { useFundingContext, useProjectContext } from '../../../../../context'
import { RewardCard } from '../components/RewardCard'

export const Rewards = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const location = useLocation()
  const breakpoint = useBreakpoint({ ssr: false })
  const largeView = ['xl', '2xl'].includes(breakpoint)
  const { toast } = useNotification()

  const { project, setMobileView, isProjectOwner } = useProjectContext()
  const {
    fundForm: { state: fundFormState, setState: setFundingFormState, updateReward },
  } = useFundingContext()

  if (!project || !isActive || !project.rewards || project.rewards.length === 0) {
    return null
  }

  const activeProjectRewards = project.rewards.filter((reward) => reward.isHidden === false)

  const renderRewards = () => {
    if (activeProjectRewards.length > 0) {
      return activeProjectRewards.filter(truthyFilter).map((reward) => {
        const count = (fundFormState.rewardsByIDAndCount && fundFormState.rewardsByIDAndCount[`${reward.id}`]) || 0
        return (
          <RewardCard
            key={reward.id}
            width="100%"
            reward={reward}
            count={count}
            onRewardClick={() => {
              const isRewardAvailable = reward.maxClaimable ? reward.maxClaimable - reward.sold > count : true
              if (isRewardAvailable) {
                updateReward({ id: toInt(reward.id), count: count + 1 })
              } else {
                toast({
                  title: 'Reward Limit',
                  description: `Maximum number of ${reward.maxClaimable - reward.sold} rewards are available`,
                  status: 'error',
                })
              }

              setMobileView(MobileViews.funding)
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

  if (!project.rewards.length) {
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

        <SimpleGrid columns={largeView ? 2 : 1} spacing={'20px'} width={'100%'}>
          {renderRewards()}
        </SimpleGrid>
      </CardLayout>
    </>
  )
})
