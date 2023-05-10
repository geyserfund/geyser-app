import { Badge, Button, HStack, VStack } from '@chakra-ui/react'

import { useProjectContext } from '../../../../context'
import { UseProjectAnchors } from '../../projectNavigation/hooks/useProjectAnchors'

export const SectionNav = ({
  entriesLength,
  rewardsLength,
  milestonesLength,
  onEntriesClick,
  onRewardsClick,
  onMilestonesClick,
}: UseProjectAnchors) => {
  const { project } = useProjectContext()

  if (!project) {
    return null
  }

  return (
    <VStack width="100%" spacing="40px">
      <HStack justifyContent="center" spacing="13px">
        {entriesLength && (
          <Button
            background="none"
            rightIcon={<Badge>{entriesLength}</Badge>}
            onClick={onEntriesClick}
          >
            Entries
          </Button>
        )}
        {rewardsLength && (
          <Button
            background="none"
            rightIcon={<Badge>{rewardsLength}</Badge>}
            onClick={onRewardsClick}
          >
            Rewards
          </Button>
        )}
        {milestonesLength && (
          <Button
            background="none"
            rightIcon={<Badge>{milestonesLength}</Badge>}
            onClick={onMilestonesClick}
          >
            Milestones
          </Button>
        )}
      </HStack>
    </VStack>
  )
}
