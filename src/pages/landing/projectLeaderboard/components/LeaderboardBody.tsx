import { StackProps, VStack } from '@chakra-ui/react'

import { Project } from '../../../../types'
import { LeaderboardCardListItem, LeaderboardFeatureProject } from '.'

export interface LeaderboardBodyProps extends StackProps {
  projects: Project[]
}

export const LeaderboardBody = ({
  projects,
  ...rest
}: LeaderboardBodyProps) => {
  const featuredCard = projects[0]
  const restOfTheCards = projects.slice(1)

  return (
    <VStack width="100%" spacing="10px" {...rest}>
      <LeaderboardFeatureProject project={featuredCard} paddingTop="10px" />
      {restOfTheCards.map((project) => (
        <LeaderboardCardListItem key={project.id} project={project} />
      ))}
    </VStack>
  )
}
