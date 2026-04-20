import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { PiCrownBold, PiTicketBold } from 'react-icons/pi'

import { Body, H2 } from '@/shared/components/typography'

import { AcelerandoVipLeaderboardEntry } from '../types'
import { formatDateTimeWithTimezone, formatSats } from '../utils'

type GiveawayLeaderboardProps = {
  entries: AcelerandoVipLeaderboardEntry[]
  isLoading?: boolean
  isError?: boolean
  lastUpdatedAt?: string
  timezone?: string
  onRetry?: () => void
}

const LeaderboardSkeleton = () => (
  <VStack alignItems="stretch" gap={2}>
    {Array.from({ length: 6 }).map((_, index) => (
      <HStack key={`lb-skel-${index}`} w="full" justifyContent="space-between" py={2}>
        <HStack flex={1} spacing={3}>
          <Skeleton h="20px" w="28px" />
          <Skeleton h="32px" w="32px" borderRadius="full" />
          <Skeleton h="16px" w="140px" />
        </HStack>
        <Skeleton h="16px" w="100px" />
      </HStack>
    ))}
  </VStack>
)

const TICKET_COLOR = 'warning.9'

export const GiveawayLeaderboard = ({
  entries,
  isLoading,
  isError,
  lastUpdatedAt,
  timezone,
  onRetry,
}: GiveawayLeaderboardProps) => {
  const headerBg = useColorModeValue('neutral1.2', 'neutral1.3')
  const top3Bg = useColorModeValue('orange.50', 'rgba(245,158,11,0.08)')
  const mutedText = useColorModeValue('neutral1.9', 'neutral1.10')
  const subtleText = useColorModeValue('neutral1.8', 'neutral1.10')

  return (
    <VStack align="stretch" spacing={6}>
      <VStack align="stretch" spacing={1}>
        <HStack spacing={2} flexWrap="wrap" justify="space-between">
          <HStack spacing={2}>
            <Icon as={PiCrownBold} boxSize={5} color="warning.9" />
            <H2 size="xl" bold>
              {t('Current Winners')}
            </H2>
          </HStack>
          {lastUpdatedAt && timezone ? (
            <Body size="xs" color={subtleText}>
              {t('Updated {{dateTime}}', { dateTime: formatDateTimeWithTimezone(lastUpdatedAt, timezone) })}
            </Body>
          ) : null}
        </HStack>
        <Body size="sm" color={mutedText}>
          {t('Top 3 contributors by eligible sats — they win a VIP ticket.')}
        </Body>
      </VStack>

      {isLoading ? <LeaderboardSkeleton /> : null}

      {!isLoading && isError ? (
        <VStack align="start" spacing={3}>
          <Body color={mutedText}>{t('We could not load the leaderboard right now.')}</Body>
          <Button size="sm" onClick={onRetry} variant="outline" colorScheme="neutral1">
            {t('Retry')}
          </Button>
        </VStack>
      ) : null}

      {!isLoading && !isError && entries.length === 0 ? (
        <Box p={6} bg={headerBg} borderRadius="lg" textAlign="center">
          <Body color={subtleText}>{t('No contributions yet. Be the first!')}</Body>
        </Box>
      ) : null}

      {!isLoading && !isError && entries.length > 0 ? (
        <Box w="full" overflowX="auto">
          <Table variant="simple" size="md">
            <Thead>
              <Tr bg={headerBg}>
                <Th w="80px">{t('Rank')}</Th>
                <Th>{t('Contributor')}</Th>
                <Th isNumeric>{t('Score (sats)')}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {entries.slice(0, 3).map((entry) => {
                const isTop3 = entry.rank <= 3

                return (
                  <Tr
                    key={`lb-${entry.userId}-${entry.rank}`}
                    bg={isTop3 ? top3Bg : undefined}
                    fontWeight={isTop3 ? 'semibold' : 'normal'}
                    transition="background 0.2s"
                    _hover={{ bg: isTop3 ? top3Bg : headerBg }}
                  >
                    <Td>
                      <HStack spacing={2}>
                        {isTop3 ? (
                          <Icon as={PiTicketBold} boxSize={5} color={TICKET_COLOR} flexShrink={0} />
                        ) : (
                          <Box w="20px" flexShrink={0} />
                        )}
                        <Text fontWeight={isTop3 ? 'bold' : 'normal'}>{entry.rank}</Text>
                      </HStack>
                    </Td>
                    <Td>
                      <HStack spacing={3}>
                        <Avatar size="sm" name={entry.displayName} src={entry.avatarUrl || undefined} />
                        <Text>{entry.displayName}</Text>
                      </HStack>
                    </Td>
                    <Td isNumeric fontWeight={isTop3 ? 'bold' : 'normal'}>
                      {formatSats(entry.scoreSats)}
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </Box>
      ) : null}
    </VStack>
  )
}
