import { Box, HStack, Image, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'

import { Grant } from '../../../types'
import { useMobileMode } from '../../../utils'
import { GrantStatusBadge } from './GrantStatusBadge'
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

  const to = getPath('grants', grant.id)

  const navigate = useNavigate()

  return (
    <VStack
      mt={3}
      onClick={() => navigate(to)}
      minWidth={'100%'}
      height={{ base: '320px', lg: '496px' }}
      cursor="pointer"
      border={`1px solid`}
      borderColor="neutralAlpha.6"
      borderRadius="8px"
      bgColor="neutralAlpha.1"
      spacing={0}
    >
      {showBanner && grant.image ? (
        <Box borderTopRightRadius="12px" borderTopLeftRadius="12px" overflow="hidden" height="320px">
          <Image objectFit="cover" src={grant.image} minWidth={'100%'} />
        </Box>
      ) : null}
      <VStack height="179px" w="100%" p={4} spacing={3}>
        <HStack w="100%" justifyContent="space-between">
          <Body fontSize="20px" medium>
            {grant.title}
          </Body>
          <GrantStatusBadge status={grant.status} startDate={grant?.statuses[0]?.startAt || 0} />
        </HStack>
        <HStack w="100%" justifyContent="flex-start" spacing={6}>
          <GrantWidget grant={grant} />
        </HStack>
        {!isMobile && <Sponsors w="100%" justifyContent="start" sponsors={grant.sponsors} />}
      </VStack>
    </VStack>
  )
}
