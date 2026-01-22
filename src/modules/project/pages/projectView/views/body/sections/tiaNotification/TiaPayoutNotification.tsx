import { Button, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { PayoutRsk } from '@/modules/project/pages/projectFunding/views/refundPayoutRsk/PayoutRsk.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { ProjectFundingStrategy } from '@/types/index.ts'

import { useRefetchQueries } from '../aonNotification/hooks/useRefetchQueries.ts'
import { usePrismWithdrawable } from './usePrismWithdrawable.ts'

const KEY_CONFIG_DEADLINE = '30th of June 2026'
const KEY_CONFIG_URL = 'https://guides.geyser.fund'

export const TiaPayoutNotification = () => {
  const { project, isProjectOwner, projectOwner } = useProjectAtom()
  const payoutRskModal = useModal()
  const { refetchQueriesOnPayoutSuccess } = useRefetchQueries()
  const { queryProject } = useProjectAPI()

  const creatorRskAddress = projectOwner?.user?.accountKeys?.rskKeyPair?.address || ''
  const { withdrawable, isLoading } = usePrismWithdrawable({
    projectId: project?.id,
    receiver: creatorRskAddress,
  })
  const withdrawableSats = withdrawable ? Number(withdrawable / 10000000000n) : 0

  if (!project || !isProjectOwner || project.fundingStrategy !== ProjectFundingStrategy.TakeItAll) {
    return null
  }

  const hasRskAddress = Boolean(creatorRskAddress)

  const hasWithdrawable = withdrawable !== null && withdrawable > 0n

  if (!hasRskAddress) {
    return (
      <Feedback variant={FeedBackVariant.INFO}>
        <VStack spacing={4} align="stretch">
          <Body size="xl" bold>
            {t('Configure your account keys')}
          </Body>
          <Body dark>
            {t(`Configure your account keys before ${KEY_CONFIG_DEADLINE} to continue receiving contributions after that date.`)}{' '}
            <Link href={KEY_CONFIG_URL} isExternal textDecoration="underline">
              {t('More information here.')}
            </Link>
          </Body>
        </VStack>
      </Feedback>
    )
  }

  if (isLoading || !hasWithdrawable) {
    return null
  }

  return (
    <>
      <Feedback variant={FeedBackVariant.SUCCESS}>
        <VStack spacing={4} align="stretch">
          <Body size="xl" bold>
            {t('Funds available to withdraw')}
          </Body>
          <Body dark>{t('You have funds ready in the Prism contract.')}</Body>
          <Button colorScheme="primary1" variant="solid" size="lg" w="full" onClick={payoutRskModal.onOpen}>
            {t('Withdraw funds')}
          </Button>
        </VStack>
      </Feedback>

      <PayoutRsk
        {...payoutRskModal}
        project={project}
        payoutAmountOverride={withdrawableSats}
        onCompleted={() => {
          refetchQueriesOnPayoutSuccess()
          queryProject.execute()
        }}
      />
    </>
  )
}
