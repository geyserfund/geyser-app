import { Button, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { PayoutRsk } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/PayoutRsk.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { ProjectFundingStrategy, Satoshis } from '@/types/index.ts'

import { useRefetchQueries } from '../aonNotification/hooks/useRefetchQueries.ts'
import { usePrismWithdrawable } from './usePrismWithdrawable.ts'

export const TiaPayoutNotification = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const payoutRskModal = useModal()
  const { refetchQueriesOnPayoutSuccess } = useRefetchQueries()
  const { queryProject } = useProjectAPI()
  const { getUSDCentsAmount } = useBTCConverter()

  const projectRskEoa = project?.rskEoa || ''
  const { withdrawable, isLoading } = usePrismWithdrawable({
    rskAddress: projectRskEoa,
  })
  const withdrawableSats = withdrawable ? Number(withdrawable / 10000000000n) : 0
  const withdrawableUsdCents = getUSDCentsAmount(withdrawableSats as Satoshis)
  const withdrawableUsd = withdrawableUsdCents / 100
  const hasMinimumNotice = withdrawableUsd >= 1 && withdrawableUsd < 10

  if (!project || !isProjectOwner || project.fundingStrategy !== ProjectFundingStrategy.TakeItAll) {
    return null
  }

  const hasWithdrawable = withdrawable !== null && withdrawable > 0n && withdrawableUsd >= 1

  if (!projectRskEoa || isLoading || !hasWithdrawable) {
    return null
  }

  return (
    <>
      <Feedback variant={FeedBackVariant.SUCCESS}>
        <VStack spacing={4} align="stretch" w="full">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            align={{ base: 'stretch', md: 'center' }}
            justify="space-between"
            spacing={3}
            w="full"
            flex="1"
          >
            <VStack align="start" spacing={2} flex="1">
              <Body size="xl" bold>
                {t('Funds available to withdraw')}
              </Body>
              <Body dark>
                {hasMinimumNotice
                  ? t('Minimum withdrawal is $10. You currently have funds below the minimum in your project wallet.')
                  : t('You have funds ready in your project wallet.')}
              </Body>
            </VStack>
            <Button
              colorScheme="primary1"
              variant="solid"
              size="lg"
              w={{ base: 'full', md: 'auto' }}
              alignSelf={{ base: 'stretch', md: 'center' }}
              ml={{ base: 0, md: 'auto' }}
              onClick={payoutRskModal.onOpen}
            >
              {t('Withdraw funds')}
            </Button>
          </Stack>
        </VStack>
      </Feedback>

      <PayoutRsk
        {...payoutRskModal}
        project={project}
        rskAddress={projectRskEoa}
        payoutAmountOverride={withdrawableSats}
        onCompleted={() => {
          refetchQueriesOnPayoutSuccess()
          queryProject.execute()
        }}
      />
    </>
  )
}
