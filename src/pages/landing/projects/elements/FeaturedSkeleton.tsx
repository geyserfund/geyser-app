import { HStack, Skeleton, SkeletonText, VStack } from '@chakra-ui/react'

import { CardLayout } from '../../../../components/layouts'
import { ProjectRowLayout } from './ProjectRowLayout'

interface Props {
  title: string
}

export const FeaturedCardSkeleton = ({ title }: Props) => {
  return (
    <ProjectRowLayout title={title} width="100%">
      <CardLayout
        noborder
        direction={{ base: 'column', sm: 'row' }}
        width="100%"
        height={{ base: 'auto', sm: '245px' }}
        alignItems="start"
        spacing="20px"
        padding="0px"
      >
        <Skeleton
          width={{ base: '100%', sm: '55%' }}
          height={{ base: '240px', sm: '100%' }}
          borderRadius="8px"
          overflow="hidden"
        />
        <VStack
          width={{ base: '100%', sm: '45%' }}
          height="100%"
          minWidth="200px"
          alignItems="start"
          justifyContent="start"
          spacing="10px"
          overflow="hidden"
        >
          <Skeleton borderRadius="8px" width="80%" height="20px" />
          <Skeleton borderRadius="8px" width="60%" height="20px" />
          <Skeleton borderRadius="8px" width="100%" height="20px" />
          <SkeletonText noOfLines={5} width="100%" />
          <HStack>
            <Skeleton borderRadius="8px" height="40px" width="40px" />
            <Skeleton borderRadius="8px" height="40px" width="40px" />
            <Skeleton borderRadius="8px" height="40px" width="40px" />
          </HStack>
        </VStack>
      </CardLayout>
    </ProjectRowLayout>
  )
}
