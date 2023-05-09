import { Badge, Button, HStack, VStack } from '@chakra-ui/react'

import { ID } from '../../../../constants'
import { useProjectContext } from '../../../../context'

export const SectionNav = () => {
  const { project } = useProjectContext()

  if (!project) {
    return null
  }

  const entriesLength = project.entries ? project.entries.length : 0
  const rewardsLength = project.rewards ? project.rewards.length : 0
  const milestoneLength = project.milestones ? project.milestones.length : 0

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
        {entriesLength && (
          <Button
            background="none"
            rightIcon={<Badge>{entriesLength}</Badge>}
            onClick={handleEntriesClick}
          >
            Entries
          </Button>
        )}
        {rewardsLength && (
          <Button
            background="none"
            rightIcon={<Badge>{rewardsLength}</Badge>}
            onClick={handleRewardsClick}
          >
            Rewards
          </Button>
        )}
        {milestoneLength && (
          <Button
            background="none"
            rightIcon={<Badge>{milestoneLength}</Badge>}
            onClick={handleMilestonesClick}
          >
            Milestones
          </Button>
        )}
      </HStack>
    </VStack>
  )
}
