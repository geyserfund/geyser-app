import { Box, Button, HStack, Skeleton, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

type WithdrawableFundsCardProps = {
  withdrawableSats: bigint
  withdrawableUsd: number
  isWithdrawableLoading: boolean
  isWithdrawStateLoading: boolean
  isBelowMinimumWithdrawal: boolean
  hasActiveWithdraw: boolean
  canWithdraw: boolean
  withdrawButtonLabel: string
  minimumSats: string
  onOpenWithdrawModal: () => void
}

export const WithdrawableFundsCard = ({
  withdrawableSats,
  withdrawableUsd,
  isWithdrawableLoading,
  isWithdrawStateLoading,
  isBelowMinimumWithdrawal,
  hasActiveWithdraw,
  canWithdraw,
  withdrawButtonLabel,
  minimumSats,
  onOpenWithdrawModal,
}: WithdrawableFundsCardProps) => {
  return (
    <VStack spacing={3} align="flex-start" w="full">
      <Body size="md" medium color="neutral1.11">
        {t('Withdrawable funds')}
      </Body>
      <Box w="full" px={4} py={3} borderWidth="1px" borderColor="neutral1.6" borderRadius="xl" bg="neutral1.1">
        <VStack w="full" align="stretch" spacing={3}>
          <Skeleton isLoaded={!isWithdrawableLoading}>
            <HStack justifyContent="space-between" alignItems={{ base: 'flex-start', md: 'center' }}>
              <VStack align="flex-start" spacing={1}>
                <Body size="lg" medium color="neutral1.12">
                  {t('{{amount}} sats', { amount: withdrawableSats.toLocaleString() })}
                </Body>
                <Body size="sm" color="neutral1.10">
                  {t('≈ {{amount}} USD', { amount: `$${withdrawableUsd.toFixed(2)}` })}
                </Body>
              </VStack>
              <Button
                size="sm"
                colorScheme="primary1"
                isDisabled={!canWithdraw || isWithdrawableLoading || isWithdrawStateLoading}
                isLoading={isWithdrawStateLoading}
                onClick={onOpenWithdrawModal}
              >
                {withdrawButtonLabel}
              </Button>
            </HStack>
          </Skeleton>
          {isBelowMinimumWithdrawal ? (
            <Body size="sm" color="neutral1.9">
              {t('{{amount}} sats minimum required before withdrawals are enabled.', {
                amount: minimumSats,
              })}
            </Body>
          ) : null}
          {hasActiveWithdraw ? (
            <Feedback variant={FeedBackVariant.INFO} noIcon>
              <HStack
                w="full"
                justifyContent="space-between"
                alignItems={{ base: 'flex-start', md: 'center' }}
                flexDirection={{ base: 'column', md: 'row' }}
                spacing={3}
              >
                <Body size="sm">{t('You have a withdrawal in progress.')}</Body>
                <Button size="sm" colorScheme="blue" variant="soft" flexShrink={0} onClick={onOpenWithdrawModal}>
                  {t('View withdrawal')}
                </Button>
              </HStack>
            </Feedback>
          ) : null}
        </VStack>
      </Box>
    </VStack>
  )
}
