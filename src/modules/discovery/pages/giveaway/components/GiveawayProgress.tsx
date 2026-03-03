import { Button, HStack, Icon, Skeleton, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiCheckCircleBold, PiTicketBold } from 'react-icons/pi'
import { Link as RouterLink } from 'react-router'

import { Body, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'

import { AcelerandoVipMyPositionResponse } from '../types'
import { formatSats } from '../utils'

type GiveawayProgressProps = {
  data?: AcelerandoVipMyPositionResponse | null
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
  onViewFeatured?: () => void
}

export const GiveawayProgress = ({ data, isLoading, isError, onRetry, onViewFeatured }: GiveawayProgressProps) => {
  const mutedText = useColorModeValue('neutral1.9', 'neutral1.10')
  const winningBg = useColorModeValue('orange.50', 'rgba(245,158,11,0.08)')
  const ticketColor = 'warning.9'

  if (isLoading) {
    return (
      <VStack align="stretch" spacing={3}>
        <Skeleton h="28px" w="180px" />
        <Skeleton h="60px" borderRadius="xl" />
      </VStack>
    )
  }

  if (isError) {
    return (
      <VStack align="stretch" spacing={4}>
        <H2 size="xl" bold>
          {t('Your Progress')}
        </H2>
        <Body color={mutedText}>{t('We could not load your position right now.')}</Body>
        <Button size="sm" onClick={onRetry} variant="outline" colorScheme="neutral1" alignSelf="flex-start">
          {t('Retry')}
        </Button>
      </VStack>
    )
  }

  if (!data) {
    return null
  }

  return (
    <VStack align="stretch" spacing={3}>
      <H2 size="xl" bold>
        {t('Your Progress')}
      </H2>

      <HStack
        spacing={4}
        bg={data.inTop3 ? winningBg : undefined}
        borderRadius={data.inTop3 ? 'xl' : undefined}
        px={data.inTop3 ? 4 : 0}
        py={data.inTop3 ? 3 : 0}
        flexWrap="wrap"
      >
        <Icon as={PiTicketBold} boxSize={5} color={data.inTop3 ? ticketColor : mutedText} flexShrink={0} />
        <HStack flex={1} spacing={2}>
          {data.inTop3 ? (
            <HStack spacing={2}>
              <Icon as={PiCheckCircleBold} boxSize={4} color={ticketColor} />
              <Body bold>{t("You're in the top 3 — you're winning a ticket!")}</Body>
            </HStack>
          ) : (
            <Body color={mutedText}>
              {t('Contribute {{amount}} more to reach the top 3 and win a ticket.', {
                amount: formatSats(data.distanceToTop3Sats),
              })}
            </Body>
          )}
        </HStack>
        <HStack spacing={3} flexShrink={0}>
          <Button size="md" variant="outline" colorScheme="neutral1" onClick={onViewFeatured} py={6}>
            {t('View Featured Projects')}
          </Button>
          <Button as={RouterLink} to={getPath('projectDiscovery')} size="md" colorScheme="primary1" py={6}>
            {t('Discover Projects')}
          </Button>
        </HStack>
      </HStack>
    </VStack>
  )
}
