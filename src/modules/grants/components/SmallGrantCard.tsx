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

export const SmallGrantCard = ({ grant, showBanner }: Props) => {
  const isMobile = useMobileMode()

  const to = getPath('grants', grant.id)

  const navigate = useNavigate()

  return (
    <HStack
      mt={3}
      onClick={() => navigate(to)}
      minWidth={'100%'}
      maxHeight={{ base: '228px', lg: '228px' }}
      cursor="pointer"
      border={`1px solid`}
      borderColor="neutralAlpha.6"
      borderRadius="8px"
      bgColor="neutralAlpha.1"
      spacing={0}
    >
      {showBanner && grant.image ? (
        <Box borderTopRightRadius="8px" borderTopLeftRadius="12px" width="228px" height="228px">
          <Image
            objectFit="fill"
            src={grant.image}
            borderTopLeftRadius="8px"
            borderBottomLeftRadius="8px"
            w="228px"
            h="228px"
          />
        </Box>
      ) : null}
      <VStack flex={1} height="228px" p={6} spacing={3} justifyContent="flex-start">
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
    </HStack>
  )
}
