import { Box, Stack, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { H2, H3 } from '../../../../components/typography'
import { ImageWithReload } from '../../../../components/ui'
import { getPath } from '../../../../constants'
import { Grant } from '../../../../types'
import { FeaturedCardSkeleton } from './FeaturedSkeleton'
import { ProjectRowLayout } from './ProjectRowLayout'

interface Props {
  grant: Grant | null
  loading: boolean
}

export const FeaturedGrantCard = ({ grant, loading }: Props) => {
  if (loading || !grant) {
    return <FeaturedCardSkeleton title="Featured Grant" />
  }

  return (
    <ProjectRowLayout title="Featured Grant" width="100%">
      <Stack
        as={Link}
        direction={{ base: 'column', sm: 'row' }}
        width="100%"
        height={{ base: 'auto', sm: '245px' }}
        alignItems="start"
        spacing="0px"
        padding="0px"
        borderRadius="8px"
        overflow="hidden"
        to={getPath('grants', grant.id)}
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
              alt={`grant-${grant.name}-header`}
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
