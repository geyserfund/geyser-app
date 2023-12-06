import { useMutation } from '@apollo/client'
import { GridItem, HStack, VStack, Text } from '@chakra-ui/react'
import { forwardRef, useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import {
  DeleteConfirmModal,
  RewardCard,
} from '../../../../components/molecules'
import { TitleDivider } from '../../../../components/ui/TitleDivider'
import { fundingStages, ID } from '../../../../constants'
import { MobileViews, useProjectContext } from '../../../../context'
import { useModal } from '../../../../hooks/useModal'
import {
  Project,
  ProjectRewardForCreateUpdateFragment,
} from '../../../../types'
import {
  isActive,
  toInt,
  useMobileMode,
  useNotification,
} from '../../../../utils'
import { truthyFilter } from '../../../../utils/array'

export const Rewards = forwardRef<HTMLDivElement>((_, ref) => {
  const refContainer = useRef(null);
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const { toast } = useNotification()
  const location = useLocation()

  useEffect(() => {
    // Check if hash is present in URL
    if(window.location.hash && window.location.hash.startsWith("#r")) {
      const rewardId = window.location.hash.substring(2);
      for (let i = 0; i < refContainer.current.children.length; i++) {
        if(refContainer.current.children[i].children[0].id == `reward-id-${rewardId}`) {
          refContainer.current.children[i].children[0].scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [window.location.hash]);

  const {
    project,
    setMobileView,
    fundingFlow: { fundState },
    fundForm: { updateReward },
  } = useProjectContext()

  const [selectedReward, setSelectedReward] =
    useState<ProjectRewardForCreateUpdateFragment>()

  if (!project) {
    return null
  }

  const renderRewards = () => {
    if (project.rewards && project.rewards.length > 0) {
      return project.rewards.filter(truthyFilter).map((reward) => {
        return (
          <VStack
            key={reward.id}
            pb={4}
            px={2}
            alignSelf="stretch"
            alignItems="stretch"
            justifySelf="stretch"
            justifyContent="stretch"
            flexWrap="wrap"
          >
            <RewardCard
              key={reward.id}
              width="100%"
              reward={reward}
              onSelectReward={() => {
                if (
                  fundState === fundingStages.initial &&
                  isActive(project.status)
                ) {
                  updateReward({ id: toInt(reward.id), count: 1 })
                  setMobileView(MobileViews.funding)
                }
              }}
            />
          </VStack>
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

        <VStack width="100%" flexWrap="wrap" justifyContent="center" ref={refContainer}>
          {renderRewards()}
        </VStack>
      </CardLayout>
    </>
  )
})
