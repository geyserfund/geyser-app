import { Divider, HStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { refundedSwapDataAtom } from '@/modules/project/funding/state/swapAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { H2 } from '@/shared/components/typography'

import { getPath } from '../../../../../../../shared/constants'
import { standardPadding } from '../../../../../../../shared/styles'
import { RefundProcessing, RefundSummary, SafeToDeleteNotice } from '../components'

export const RefundInitiatedPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const refundedSwapData = useAtomValue(refundedSwapDataAtom)

  useEffect(() => {
    setTimeout(() => {
      handleCheckIfRefundTransactionIsThere()
    }, 100)
  }, [])

  const handleCheckIfRefundTransactionIsThere = useCallback(() => {
    if (!refundedSwapData) {
      navigate(getPath('refund'))
    }
  }, [refundedSwapData, navigate])

  return (
    <HStack w="full" h="full" justifyContent="center" alignItems="center">
      <CardLayout maxWidth="700px" padding={standardPadding} spacing={6}>
        <H2 size="2xl" bold>
          {t('Refund')}
        </H2>
        <RefundProcessing noborder />
        <Divider />
        <RefundSummary />
        <SafeToDeleteNotice />
      </CardLayout>
    </HStack>
  )
}
