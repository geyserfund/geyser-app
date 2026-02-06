import { Button, Link as ChakraLink, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { PiWarning } from 'react-icons/pi'
import { Navigate, useLocation, useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { Body } from '@/shared/components/typography'
import { getPath, GeyserOnChainGuideUrl } from '@/shared/constants'
import { Feedback, FeedBackVariant } from '@/shared/molecules'
import { isAllOrNothing } from '@/utils'
import { ProjectFundingStrategy } from '@/types/index.ts'

import { useDownloadRefund } from '../hooks/useDownloadRefund'
import { onChainRefundDownloadedAtom } from '../states/onChainStatus.ts'

export const PaymentOnchainPrompt = () => {
  const { project } = useFundingFormAtom()

  const setOnchainRefundDownloadAtom = useSetAtom(onChainRefundDownloadedAtom)

  const navigate = useNavigate()
  const location = useLocation()

  const handleComplete = () => {
    navigate({ pathname: getPath('fundingPaymentOnchainQR', project.name), search: location.search }, { replace: true })
  }

  const creatorRskAddress = project?.rskEoa || ''
  const isPrismTia = project?.fundingStrategy === ProjectFundingStrategy.TakeItAll && Boolean(creatorRskAddress)
  const isRskSwapFlow = isAllOrNothing(project) || isPrismTia

  if (isRskSwapFlow) {
    setOnchainRefundDownloadAtom(true)
    return <Navigate to={getPath('fundingPaymentOnchainQR', project.name)} replace />
  }

  return <PaymentOnchainDownloadPrompt onComplete={handleComplete} />
}

export const PaymentOnchainDownloadPrompt = ({ onComplete }: { onComplete: () => void }) => {
  const setRefundFileDownloaded = useSetAtom(onChainRefundDownloadedAtom)

  const { buttonProps } = useDownloadRefund()

  const handleClick = () => {
    setRefundFileDownloaded(true)
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
            <ChakraLink isExternal href={GeyserOnChainGuideUrl} color="primary1.11">
              {t('More info')}.
            </ChakraLink>
          </Body>

          <Body size={'sm'}>{t('By continuing, you acknowledge that you are responsible for claiming refunds.')}</Body>
        </VStack>
      </Feedback>
      <Button {...buttonProps} size="lg" variant="solid" minWidth="310px" colorScheme="primary1" onClick={handleClick}>
        {t('Download & Continue')}
      </Button>
    </VStack>
  )
}
