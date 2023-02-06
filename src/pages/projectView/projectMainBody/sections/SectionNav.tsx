import { Badge, Button, HStack, VStack } from '@chakra-ui/react'

import { ID } from '../../../../constants'
import { useProjectContext } from '../../../../context'

export const SectionNav = () => {
  const { project, isProjectOwner } = useProjectContext()

  const entriesLength = project.entries ? project.entries.length : 0
  const rewardsLength = project.rewards ? project.rewards.length : 0
  const milestoneLength = project.milestones ? project.milestones.length : 0

  const isRewardBased = project.rewards && project.rewards.length > 0
  const hasMilestones = project.milestones && project.milestones.length > 0
  const hasEntries = project.entries && project.entries.length > 0

  const handleEntriesClick = () => {
    const entriesElement = document.getElementById(ID.project.view.entries)
    if (entriesElement) {
      entriesElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleRewardsClick = () => {
    const rewardsRef = document.getElementById(ID.project.view.rewards)
    if (rewardsRef) {
      rewardsRef.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleMilestonesClick = () => {
    const milestonesRef = document.getElementById(ID.project.view.milestones)
    if (milestonesRef) {
      milestonesRef.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <VStack width="100%" spacing="40px">
      <HStack justifyContent="center" spacing="13px">
        {(hasEntries || isProjectOwner) && (
          <Button
            background="none"
            rightIcon={
              entriesLength ? <Badge>{entriesLength}</Badge> : undefined
            }
            onClick={handleEntriesClick}
          >
            Blogs
          </Button>
        )}
        {(isRewardBased || isProjectOwner) && (
          <Button
            background="none"
            rightIcon={
              rewardsLength ? <Badge>{rewardsLength}</Badge> : undefined
            }
            onClick={handleRewardsClick}
          >
            Rewards
          </Button>
        )}
        {(hasMilestones || isProjectOwner) && (
          <Button
            background="none"
            rightIcon={
              milestoneLength ? <Badge>{milestoneLength}</Badge> : undefined
            }
            onClick={handleMilestonesClick}
          >
            Milestones
          </Button>
        )}
      </HStack>
    </VStack>
  )
}
