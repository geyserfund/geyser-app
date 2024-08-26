import { Box, HStack, Image, VStack } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'

import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'

import { Grant } from '../../../types'
import { useMobileMode } from '../../../utils'
import { GrantStatus } from './GrantStatusBadge'
import GrantWidget from './GrantWidget'
import { Sponsors } from './Sponsors'

interface Props {
  grant: Grant
  showBanner: boolean
}

export const GrantValues: {
  [key: string]: { applicants: number; amount: number }
} = {
  'grant-round-001': {
    applicants: 90,
    amount: 100000000,
  },
  'grant-round-002': {
    applicants: 45,
    amount: 100000000,
  },
}

export const SmallGrantCard = ({ grant, showBanner }: Props) => {
  const isMobile = useMobileMode()

  const Direction = isMobile ? VStack : HStack

  return (
    <HStack
      mt={3}
      as={Link}
      to={getPath('grants', grant.id)}
      minWidth={'100%'}
      maxHeight={{ base: '98px', lg: '230px' }}
      cursor="pointer"
      border={`1px solid`}
      borderColor="neutralAlpha.6"
      borderRadius="8px"
      bgColor="neutralAlpha.1"
      spacing={0}
    >
      {showBanner && grant.image ? (
        <Box
          position="relative"
          borderTopLeftRadius="8px"
          borderBottomLeftRadius="8px"
          width={{ base: '96px', lg: '228px' }}
          height={{ base: '96px', lg: '228px' }}
        >
          <Image
            objectFit="cover"
            src={grant.image}
            borderTopLeftRadius="8px"
            borderBottomLeftRadius="8px"
            w={{ base: '96px', lg: '228px' }}
            h={{ base: '96px', lg: '228px' }}
          />
          {isMobile && (
            <Box position="absolute" top={0.5} left={1} zIndex={2} p={1} borderRadius="md">
              <GrantStatus status={grant.status} startDate={grant?.statuses[0]?.startAt || 0} />
            </Box>
          )}
        </Box>
      ) : null}
      <VStack
        flex={1}
        height={{ base: '98px', lg: '228px' }}
        p={{ base: 2, lg: 6 }}
        spacing={{ base: 2, lg: 3 }}
        justifyContent="flex-start"
      >
        <HStack w="100%" justifyContent="space-between">
          <Body size={{ base: 'md', lg: 'lg' }} medium>
            {grant.title}
          </Body>
          {!isMobile && <GrantStatus status={grant.status} startDate={grant?.statuses[0]?.startAt || 0} />}
        </HStack>
        <Direction w="100%" justifyContent="flex-start" alignItems="flex-start" spacing={{ base: 0, lg: 6 }}>
          <GrantWidget grant={grant} compact={isMobile} />
        </Direction>
        {!isMobile && (
          <Sponsors w="100%" height={'100%'} justifyContent="start" alignItems="flex-end" sponsors={grant.sponsors} />
        )}
      </VStack>
    </HStack>
  )
}
