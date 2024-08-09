import { Button, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { BsExclamationTriangle } from 'react-icons/bs'
import { useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { Body } from '@/shared/components/typography'
import { getPath, GeyserOnChainGuideUrl } from '@/shared/constants'
import { Feedback, FeedBackVariant } from '@/shared/molecules'
import { useMobileMode } from '@/utils'

import { useDownloadRefund } from '../hooks/useDownloadRefund'
import { onChainRefundDownloadedAtom } from '../states'

export const PaymentOnchainPrompt = () => {
  const isMobile = useMobileMode()

  const { project } = useFundingFormAtom()

  const setOnchainRefundDownloadAtom = useSetAtom(onChainRefundDownloadedAtom)

  const { downloadRefundJson, downloadRefundQr } = useDownloadRefund()

  const navigate = useNavigate()

  const handleClick = () => {
    if (isMobile) {
      downloadRefundQr()
    } else {
      downloadRefundJson()
    }

    setOnchainRefundDownloadAtom(true)
    navigate(getPath('fundingPaymentOnchainQR', project.name))
  }

  return (
    <VStack spacing={6}>
      <Feedback variant={FeedBackVariant.WARNING} icon={<BsExclamationTriangle fontSize={'24px'} />}>
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
