import { VStack } from '@chakra-ui/react'

import { Project } from '../../../../types'
import { LeaderboardCardListItem, LeaderboardFeatureProject } from '.'

export const LeaderboardBody = ({ projects }: { projects: Project[] }) => {
  const featuredCard = projects[0]
  const restOfTheCards = projects.slice(1)

  return (
    <VStack width="100%" spacing="10px">
      <LeaderboardFeatureProject project={featuredCard} paddingTop="10px" />
      {restOfTheCards.map((project) => (
        <LeaderboardCardListItem key={project.id} project={project} />
      ))}
    </VStack>
  )
}
