import { GridItem, Text, SimpleGrid, useBreakpoint } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import {
  RewardCard,
} from '../../../../components/molecules'
import { TitleDivider } from '../../../../components/ui/TitleDivider'
import { ID } from '../../../../constants'
import { MobileViews, useProjectContext } from '../../../../context'
import {
  isActive,
  toInt,
  useMobileMode
} from '../../../../utils'
import { truthyFilter } from '../../../../utils/array'

export const Rewards = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const location = useLocation()
  const breakpoint = useBreakpoint({ ssr: false })
  const largeView = ['xl','2xl'].includes(breakpoint);

  const {
    project,
    setMobileView,
    fundForm: { state: fundFormState, setState: setFundingFormState, updateReward },
  } = useProjectContext()

  if (!project || !isActive) {
    return null
  }

  const renderRewards = () => {
    if (project.rewards && project.rewards.length > 0) {
      return project.rewards.filter(truthyFilter).map((reward) => {
        return (
          <RewardCard
              key={reward.id}
              width="100%"
              reward={reward}
              onClick={() => {
                const count = (fundFormState.rewardsByIDAndCount && fundFormState.rewardsByIDAndCount[`${reward.id}`]) || 0
                updateReward({ id: toInt(reward.id), count: count + 1 })
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
        <TitleDivider
          badge={project.rewards.length}
          isFixed={isRewardTitleFixed}
        >
          {t('Rewards')}
        </TitleDivider>

        <SimpleGrid columns={largeView ? 2 : 1} spacing={3} width={"100%"}>
          {renderRewards()}
        </SimpleGrid>
      </CardLayout>
    </>
  )
})
