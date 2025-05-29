import { Box, Stack, StackProps, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { useGrant } from '@/modules/grants/pages/grantsIndividualPage/hooks/useGrant.tsx'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { Body, H2 } from '@/shared/components/typography'
import { standardPadding } from '@/shared/styles'

import { getPath } from '../../../../../../../shared/constants'
import { FeaturedCardSkeleton } from './FeaturedProjectCard'
import { MiniProjectCard } from './MiniProjectCard.tsx'

type Props = {
  grantId: string
  showMini?: boolean
  startAnimating?: boolean
} & StackProps

export const FeaturedGrantCard = ({ grantId, showMini, startAnimating, ...rest }: Props) => {
  const { grant, loading } = useGrant(grantId)

  if (loading || !grant) {
    if (showMini) {
      return null
    }

    return <FeaturedCardSkeleton />
  }

  if (showMini) {
    return (
      <MiniProjectCard
        imageUrl={grant.image}
        title={grant.title}
        startAnimating={startAnimating}
        as={Link}
        to={getPath('grants', grant.id)}
      />
    )
  }

  return (
    <Stack
      as={Link}
      direction={{ base: 'column', sm: 'row' }}
      width="100%"
      height={{ base: 'auto', sm: '252px' }}
      alignItems="start"
      spacing="0px"
      padding="0px"
      borderRadius="8px"
      overflow="hidden"
      to={getPath('grants', grant.id)}
      _hover={{ backgroundColor: 'neutral1.2', cursor: 'pointer' }}
      {...rest}
    >
      {grant.image && (
        <Box width={{ base: '100%', sm: '44%' }} height={{ base: '240px', sm: '100%' }} overflow="hidden">
          <ImageWithReload
            height="full"
            width="full"
            src={`${grant.image}`}
            alt={`grant-${grant.name}-header`}
            objectFit="cover"
          />
        </Box>
      )}
      <VStack
        width={{ base: '100%', sm: '45%' }}
        height="100%"
        minWidth="200px"
        alignItems="start"
        spacing="10px"
        overflow="hidden"
        padding={standardPadding}
        justifyContent={{ base: 'start', sm: 'space-between' }}
      >
        <H2 size="2xl" bold>
          {grant.title}
        </H2>
        <Body light medium noOfLines={4} isTruncated whiteSpace="normal">
          {grant.shortDescription}
        </Body>
      </VStack>
    </Stack>
  )
}
