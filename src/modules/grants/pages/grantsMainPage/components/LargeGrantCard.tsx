import { Box, HStack, Image, VStack } from '@chakra-ui/react'
import { Link } from 'react-router'

import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'

import { Grant } from '../../../../../types'
import { useMobileMode } from '../../../../../utils'
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

export const LargeGrantCard = ({ grant, showBanner }: Props) => {
  const isMobile = useMobileMode()

  return (
    <VStack
      mt={3}
      as={Link}
      to={getPath('grants', grant.id)}
      minWidth={'100%'}
      maxHeight={{ base: '296px', lg: '496px' }}
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
          borderTopRightRadius="8px"
          borderTopLeftRadius="8px"
          overflow="hidden"
          height={{ base: '296px', lg: '320px' }}
          width="100%"
        >
          <Image
            objectFit="cover"
            borderTopLeftRadius="8px"
            borderTopRightRadius="8px"
            src={grant.image}
            alt={`${grant.title} grant banner image`}
            minWidth={'100%'}
            height="100%"
          />
          {isMobile && (
            <Box position="absolute" top={2} right={1} zIndex={2} p={1} borderRadius="md">
              <GrantStatus status={grant.status} startDate={grant?.statuses[0]?.startAt || 0} />
            </Box>
          )}
        </Box>
      ) : null}
      <VStack maxHeight={{ base: '138px', lg: '179px' }} w="100%" p={{ base: 2, lg: 4 }} spacing={{ base: 2, lg: 3 }}>
        <HStack w="100%" justifyContent="space-between">
          <Body size={{ base: 'lg', lg: 'xl' }} medium>
            {grant.title}
          </Body>
          {!isMobile && <GrantStatus status={grant.status} startDate={grant?.statuses[0]?.startAt || 0} />}
        </HStack>
        <HStack w="100%" justifyContent="flex-start" spacing={6}>
          <GrantWidget grant={grant} />
        </HStack>
        {!isMobile && <Sponsors w="100%" justifyContent="start" sponsors={grant.sponsors} />}
      </VStack>
    </VStack>
  )
}
