import { Icon, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { Trans } from 'react-i18next'
import { PiInfo } from 'react-icons/pi'

import { fundingPaymentDetailsAtom } from '@/modules/project/funding/state/fundingPaymentAtom.ts'
import { Body } from '@/shared/components/typography/index.ts'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

import { WaitingForPayment } from '../../../components/WaitingForPayment.tsx'

/** Component for displaying awaiting payment UI in fiat swap flow */
export const FiatSwapAwaitingPayment: React.FC = () => {
  const fundingPaymentDetails = useAtomValue(fundingPaymentDetailsAtom)
  const checkoutUrl = fundingPaymentDetails.fiatSwap?.checkoutUrl

  return (
    <VStack w="full" spacing={6} paddingTop={10}>
      <WaitingForPayment title={t('Waiting for payment to be confirmed')} />

      <Feedback
        variant={FeedBackVariant.INFO}
        icon={<Icon as={PiInfo} fontSize="30px" />}
        title={t('Waiting for payment to be confirmed')}
      >
        <VStack w="full" alignItems="start">
          <Body size="lg" bold>
            {t('Redirection Notice')}
          </Body>
          <Body>
            <Trans i18nextKey="You should be redirected to a new tab to complete your payment. If the page hasn't opened automatically, please open it by <1>clicking here.</1>">
              {
                "You should be redirected to a new tab to complete your payment. If the page hasn't opened automatically, please open it by"
              }{' '}
              <Link isExternal href={checkoutUrl || ''}>
                <Body as="span" medium textDecoration={'underline'}>
                  {t('clicking here')}
                </Body>
              </Link>
            </Trans>
          </Body>
        </VStack>
      </Feedback>
    </VStack>
  )
}
