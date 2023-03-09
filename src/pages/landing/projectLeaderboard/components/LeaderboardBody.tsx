import {
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  StackProps,
  VStack,
} from '@chakra-ui/react'

import { Project } from '../../../../types'
import { LeaderboardCardListItem, LeaderboardFeatureProject } from '.'

export interface LeaderboardBodyProps extends StackProps {
  projects: Project[]
}

export const LeaderboardBody = ({
  projects,
  ...rest
}: LeaderboardBodyProps) => {
  const [featuredCard, ...restOfTheCards] = projects

  return (
    <VStack width="100%" spacing="10px" {...rest}>
      {featuredCard && (
        <LeaderboardFeatureProject project={featuredCard} marginTop="10px" />
      )}
      {restOfTheCards?.map((project) => (
        <LeaderboardCardListItem key={project.id} project={project} />
      ))}
    </VStack>
  )
}

export const LeaderboardBodySkeleton = () => {
  return (
    <VStack width="100%" spacing="10px" marginTop="10px">
      <VStack padding="0px" w="100%" alignItems="start">
        <Skeleton width="100%" height="200px" borderRadius="8px" />
        <SkeletonText noOfLines={1} w="full" />
        <Skeleton borderRadius="8px" height="20px" width="80%" />
        <HStack w="100%">
          <SkeletonCircle size="20px" />
          <SkeletonText flex={1} noOfLines={1} />
        </HStack>
        <SkeletonText noOfLines={2} />
      </VStack>
      {[1, 2, 3].map((value) => (
        <HStack
          key={value}
          backgroundColor="white"
          borderRadius="8px"
          _hover={{ backgroundColor: 'neutral.100' }}
          width="100%"
        >
          <Skeleton height="60px" width="60px" borderRadius="8px" />

          <VStack
            height="100%"
            flex={1}
            overflow="hidden"
            alignItems="start"
            justifyContent="space-between"
          >
            <Skeleton borderRadius="8px" height="20px" width="60%" />
            <SkeletonText width="100%" noOfLines={1} />
          </VStack>
        </HStack>
      ))}
    </VStack>
  )
}
