import {
  Box,
  HStack,
  Skeleton,
  SkeletonText,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import { H2, H3 } from '../../../../components/typography'
import { ImageWithReload } from '../../../../components/ui'
import { getPath } from '../../../../constants'
import { Grant } from '../../../../types'
import { ProjectRowLayout } from './ProjectRowLayout'

interface Props {
  grant: Grant | null
  loading: boolean
}

export const FeaturedGrantCard = ({ grant, loading }: Props) => {
  const navigate = useNavigate()

  if (loading || !grant) {
    return <FeaturedProjectSkeleton />
  }

  return (
    <ProjectRowLayout title="Featured Grant" width="100%">
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        width="100%"
        height={{ base: 'auto', sm: '245px' }}
        alignItems="start"
        spacing="0px"
        padding="0px"
        borderRadius="8px"
        overflow="hidden"
        onClick={() => navigate(getPath('grants', grant.id))}
        _hover={{ backgroundColor: 'neutral.100', cursor: 'pointer' }}
      >
        {grant.image && (
          <Box
            width={{ base: '100%', sm: '55%' }}
            height={{ base: '240px', sm: '100%' }}
            borderTopRightRadius="8px"
            borderBottomRightRadius="8px"
            overflow="hidden"
          >
            <ImageWithReload
              height="full"
              width="full"
              src={grant.image}
              objectFit="cover"
            />
          </Box>
        )}
        <VStack
          width={{ base: '100%', sm: '45%' }}
          height="100%"
          minWidth="200px"
          alignItems="start"
          justifyContent="start"
          spacing="10px"
          overflow="hidden"
          padding="10px"
        >
          <H2 color="brand.neutral700"> {grant.title} </H2>
          <H3
            color="brand.neutral800"
            noOfLines={3}
            isTruncated
            whiteSpace="normal"
          >
            {grant.shortDescription}
          </H3>
        </VStack>
      </Stack>
    </ProjectRowLayout>
  )
}

export const FeaturedProjectSkeleton = () => {
  return (
    <ProjectRowLayout title="Featured Project" width="100%">
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
