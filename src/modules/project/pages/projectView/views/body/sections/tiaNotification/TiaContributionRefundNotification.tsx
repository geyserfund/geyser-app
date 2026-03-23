import { Button, Stack, VStack } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { t } from 'i18next'

import { useAuthContext } from '@/context/auth.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { QUERY_PAYMENTS_REFUNDABLE } from '@/modules/project/graphql/queries/refundsQuery.ts'
import { PaymentAttemptRefundModal } from '@/modules/project/pages/projectFunding/views/refund/components/PaymentAttemptRefundModal.tsx'
import { getRefundFileFromPayment } from '@/modules/project/pages/projectFunding/views/refund/utils/paymentRefund.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { PaymentStatus, RefundablePaymentsGetResponse } from '@/types/index.ts'

type RefundableProjectPayment = {
  paymentId: string | number | bigint
  amount: number
  paymentUuid: string
  refundFile?: ReturnType<typeof getRefundFileFromPayment>
}

export const TiaContributionRefundNotification = () => {
  const { user } = useAuthContext()
  const { project } = useProjectAtom()
  const refundModal = useModal<{ payment: RefundableProjectPayment }>()

  const { data, refetch } = useQuery<{ paymentsRefundableGet: RefundablePaymentsGetResponse }>(QUERY_PAYMENTS_REFUNDABLE, {
    skip: !user.id || !project.id,
  })

  const projectPayments =
    data?.paymentsRefundableGet?.refundablePayments
      .filter((entry) => entry.project.id === project.id)
      .flatMap((entry) =>
        entry.payments.map((payment) => ({
          paymentId: payment.id,
          amount: payment.accountingAmountDue,
          paymentUuid: payment.uuid,
          status: payment.status,
          refundFile: getRefundFileFromPayment(payment),
        })),
      )
      .filter((payment) => payment.status === PaymentStatus.Refundable && payment.refundFile) || []

  const selectedPayment = refundModal.props.payment
  const defaultPayment = projectPayments[0]

  if (!defaultPayment) {
    return null
  }

  const handleCompleted = async () => {
    refundModal.onClose()
    await refetch()
  }

  return (
    <>
      <Feedback variant={FeedBackVariant.WARNING}>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          align={{ base: 'stretch', md: 'center' }}
          justify="space-between"
        >
          <VStack spacing={1} align="stretch" flex={1}>
            <Body size="xl" bold>
              {t('Contribution payment failed')}
            </Body>
            <Body dark>
              {projectPayments.length > 1
                ? t('You attempted contributions on this project and some payments failed.')
                : t('You attempted a contribution on this project and the payment failed.')}
            </Body>
          </VStack>
          <Button
            colorScheme="warning"
            variant="solid"
            size="lg"
            alignSelf={{ base: 'stretch', md: 'center' }}
            flexShrink={0}
            onClick={() => refundModal.onOpen({ payment: defaultPayment })}
          >
            {t('Claim Refund')}
          </Button>
        </Stack>
      </Feedback>

      <PaymentAttemptRefundModal
        isOpen={refundModal.isOpen}
        onClose={refundModal.onClose}
        amount={selectedPayment?.amount || 0}
        paymentId={selectedPayment?.paymentId || 0}
        paymentUuid={selectedPayment?.paymentUuid}
        refundFile={selectedPayment?.refundFile}
        onCompleted={handleCompleted}
      />
    </>
  )
}
