import { Button, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { PiWarning } from 'react-icons/pi'
import { useLocation, useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { Body } from '@/shared/components/typography'
import { getPath, GeyserOnChainGuideUrl } from '@/shared/constants'
import { Feedback, FeedBackVariant } from '@/shared/molecules'
import { ProjectFundingStrategy } from '@/types/index.ts'
import { useMobileMode } from '@/utils'

import { PaymentAccountPassword } from '../../../components/PaymentAccountPassword.tsx'
import { useDownloadRefund } from '../hooks/useDownloadRefund'
import { onChainRefundDownloadedAtom } from '../states/onChainStatus.ts'

export const PaymentOnchainPrompt = () => {
  const { project } = useFundingFormAtom()

  const navigate = useNavigate()
  const location = useLocation()

  const handleComplete = () => {
    navigate({ pathname: getPath('fundingPaymentOnchainQR', project.name), search: location.search }, { replace: true })
  }

  if (project.fundingStrategy === ProjectFundingStrategy.AllOrNothing) {
    return <PaymentAccountPassword onComplete={handleComplete} />
  }

  return <PaymentOnchainDownloadPrompt onComplete={handleComplete} />
}

export const PaymentOnchainDownloadPrompt = ({ onComplete }: { onComplete: () => void }) => {
  const isMobile = useMobileMode()

  const setOnchainRefundDownloadAtom = useSetAtom(onChainRefundDownloadedAtom)

  const { downloadRefundJson, downloadRefundQr } = useDownloadRefund()

  const handleClick = () => {
    if (isMobile) {
      downloadRefundQr()
    } else {
      downloadRefundJson()
    }

    setOnchainRefundDownloadAtom(true)
    onComplete()
  }

  return (
    <VStack spacing={6}>
      <Feedback variant={FeedBackVariant.WARNING} icon={<PiWarning fontSize={'24px'} />}>
        <VStack w="full" alignItems="start">
          <Body size="lg" medium>
            {t('Download refund file before proceeding')}
          </Body>
          <Body size={'sm'}>
            {t(
              'To keep Geyser KYC-free, on-chain transactions are swapped to Lightning in a non-custodial way. So, we require you to download a Refund File as backup in the rare case a payment fails.',
            )}{' '}
            <Link isExternal href={GeyserOnChainGuideUrl} color="primary1.11">
              {t('More info')}.
            </Link>
          </Body>

          <Body size={'sm'}>{t('By continuing, you acknowledge that you are responsible for claiming refunds.')}</Body>
        </VStack>
      </Feedback>
      <Button size="lg" variant="solid" minWidth="310px" colorScheme="primary1" onClick={handleClick}>
        {t('Download & Continue')}
      </Button>
    </VStack>
  )
}
