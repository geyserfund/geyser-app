import { HStack, Image, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import {
  getTransactionFromChainSwap,
  getTransactionFromSwap,
} from '@/modules/project/pages/projectFunding/views/fundingPayment/views/paymentOnchain/refund/api.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import {
  PaymentStatus,
  PaymentType,
  usePaymentStatusUpdatedSubscription,
  UserProjectContributionStatusFragment,
} from '@/types/generated/graphql.ts'

import { useRefetchQueries } from '../hooks/useRefetchQueries.ts'

const CONTRIBUTION_PENDING_IMAGE =
  'https://storage.googleapis.com/geyser-projects-media/app/contribution/contribution_pending.png'
const CONTRIBUTION_CONFIRMED_IMAGE =
  'https://storage.googleapis.com/geyser-projects-media/app/contribution/contribution_confirmed.png'

type ContributionStage = 1 | 2 | 3

export const ContributionPendingToProjectNotification = ({
  contribution,
}: {
  contribution: UserProjectContributionStatusFragment
}) => {
  const [stage, setStage] = useState<ContributionStage>(1)
  const [transactionId, setTransactionId] = useState<string | null>(null)

  const { refetchQueriesOnPledgeRefund } = useRefetchQueries()
  const { queryProject } = useProjectAPI()

  /** Get latest payment from contribution */
  const latestPayment = contribution.payments.find((payment) => payment.status === PaymentStatus.Pending)
  const paymentType = latestPayment?.paymentType
  const swapId =
    latestPayment?.paymentDetails?.__typename === 'OnChainToRskSwapPaymentDetails' ||
    latestPayment?.paymentDetails?.__typename === 'OnChainToLightningSwapPaymentDetails' ||
    latestPayment?.paymentDetails?.__typename === 'LightningToRskSwapPaymentDetails'
      ? latestPayment.paymentDetails.swapId
      : undefined

  /** Fetch transaction ID for mempool link (only for onchain payments) */
  useEffect(() => {
    const fetchTransactionId = async () => {
      if (!swapId) return

      try {
        if (paymentType === PaymentType.OnChainToLightningSwap) {
          const transaction = await getTransactionFromSwap(swapId)
          setTransactionId(transaction.id)
        } else if (paymentType === PaymentType.OnChainToRskSwap) {
          const transaction = await getTransactionFromChainSwap(swapId, 'userLock')
          setTransactionId(transaction.id)
        }
      } catch (error) {
        console.error('Failed to fetch transaction ID:', error)
      }
    }

    fetchTransactionId()
  }, [swapId, paymentType, stage])

  /** Subscribe to payment status updates */
  usePaymentStatusUpdatedSubscription({
    variables: {
      input: {
        contributionUUID: contribution.uuid || '',
      },
    },
    skip: !contribution.uuid,
    onData(options) {
      const payment = options.data.data?.paymentStatusUpdated

      if (!payment) return

      // Stage 2: Payment is claimable
      if (payment.status === PaymentStatus.Claimable) {
        setStage(2)
      }

      // Stage 3: Payment is paid
      if (payment.status === PaymentStatus.Paid) {
        setStage(3)
        // Refetch queries when payment is paid
        refetchQueriesOnPledgeRefund()
        queryProject.execute()
      }
    },
  })

  const getStageContent = () => {
    switch (stage) {
      case 1:
        return {
          image: CONTRIBUTION_PENDING_IMAGE,
          text: t(
            'Transaction broadcast (step 1 of 3). Confirmation takes ~10 min. If stuck here for too long, please contact us at support@geyser.fund',
          ),
          showMempool:
            (paymentType === PaymentType.OnChainToRskSwap || paymentType === PaymentType.OnChainToLightningSwap) &&
            transactionId !== null,
        }
      case 2:
        return {
          image: CONTRIBUTION_PENDING_IMAGE,
          text: t(
            'Swap to AON contract (step 2 of 3). Confirmation takes ~2 min. If stuck here for too long, please contact us at support@geyser.fund',
          ),
          showMempool: false,
        }
      case 3:
        return {
          image: CONTRIBUTION_CONFIRMED_IMAGE,
          text: t(
            'Transaction confirmed (step 3 of 3). Confirmation imminent. If stuck here for too long, please contact us at support@geyser.fund',
          ),
          showMempool: false,
        }
      default:
        return {
          image: CONTRIBUTION_PENDING_IMAGE,
          text: t(
            'Transaction broadcast (step 1 of 3). Confirmation takes ~2 min. If stuck here for too long, please contact us at support@geyser.fund',
          ),
          showMempool: false,
        }
    }
  }

  const { image, text, showMempool } = getStageContent()

  return (
    <Feedback variant={FeedBackVariant.SUCCESS} noIcon>
      <HStack alignItems="start" spacing={4} w="full">
        <Image src={image} alt="Contribution status" boxSize="100px" />
        <VStack alignItems="start" spacing={0} w="full">
          <Body size="xl" bold color="utils.text">
            {t('Contribution status')}
          </Body>
          <Body size="md" medium color="utils.text">
            {text}
          </Body>
          {showMempool && transactionId && (
            <Link
              href={`https://mempool.space/tx/${transactionId}`}
              isExternal
              color="primary1.11"
              fontWeight="bold"
              fontSize="md"
            >
              {t('View mempool')}
            </Link>
          )}
        </VStack>
      </HStack>
    </Feedback>
  )
}
