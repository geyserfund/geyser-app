import { GridItem, SimpleGrid, Text, useMediaQuery } from '@chakra-ui/react'

import { CardLayout } from '../../../../components/layouts'
import { ProjectSectionBar } from '../../../../components/molecules'
import {
  fundingStages,
  ID,
  IFundingStages,
  projectTypes,
} from '../../../../constants'
import { MobileViews, useProjectContext } from '../../../../context'
import { UpdateReward } from '../../../../hooks'
import { isActive, toInt, useMobileMode } from '../../../../utils'
import { FundingFormRewardItem } from '../components/FundingFormRewardItem'

type Props = {
  updateReward: UpdateReward
  fundState: IFundingStages
}

export const Rewards = ({ fundState, updateReward }: Props) => {
  const isMobile = useMobileMode()
  const [isSmallerThan1265] = useMediaQuery('(max-width: 1265px)')

  const { project, setMobileView } = useProjectContext()

  const isRewardBased = project.type === projectTypes.reward
  const rewardsLength = project.rewards ? project.rewards.length : 0

  const renderRewards = () => {
    if (project.rewards && project.rewards.length > 0) {
      return project.rewards.map((reward) => {
        if (reward) {
          return (
            <GridItem
              key={reward.id}
              colSpan={isSmallerThan1265 ? 2 : 1}
              maxWidth="350px"
            >
              <FundingFormRewardItem
                onClick={() => {
                  if (
                    fundState === fundingStages.initial &&
                    isActive(project.status)
                  ) {
                    updateReward({ id: toInt(reward.id), count: 1 })
                    setMobileView(MobileViews.funding)
                  }
                }}
                item={{ ...reward }}
                readOnly
              />
            </GridItem>
          )
        }
      })
    }

    return (
      <GridItem colSpan={isMobile ? 2 : 1}>
        <Text>There are no rewards available.</Text>
      </GridItem>
    )
  }

  if (!isRewardBased) {
    return null
  }

  return (
    <CardLayout
      id={ID.project.view.rewards}
      width="100%"
      flexDirection="column"
      alignItems="flex-start"
      spacing="25px"
      padding="24px"
    >
      <ProjectSectionBar name={'Rewards'} number={rewardsLength} />

      <SimpleGrid
        width="100%"
        columns={isSmallerThan1265 ? 1 : 2}
        spacingX={7}
        spacingY={8}
      >
        {renderRewards()}
      </SimpleGrid>
    </CardLayout>
  )
}
