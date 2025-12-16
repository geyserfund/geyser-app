import { Button, Divider, Link as ChakraLink, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiWarning } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { GeyserOnChainGuideUrl } from '@/shared/constants/index.ts'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

import { useDownloadRefund } from '../paymentOnchain/hooks/useDownloadRefund.ts'

export const PaymentDownloadRefundFile = ({ onComplete }: { onComplete: () => void }) => {
  const { fileToDownload } = useDownloadRefund({
    isAllOrNothing: true,
  })

  return (
    <VStack w="full" spacing={4}>
      <Feedback variant={FeedBackVariant.WARNING} icon={<PiWarning fontSize={'24px'} />}>
        <VStack w="full" alignItems="start">
          <Body size="lg" medium>
            {t('Download refund file before proceeding')}
          </Body>
          <Body size={'sm'}>
            {t(
              'If this project does not reach its goal, or you change your mind before it is completed, you can request a refund. To make sure you can claim a refund later, please download the refund file now and store it somewhere safe.',
            )}{' '}
            <Link isExternal href={GeyserOnChainGuideUrl} color="primary1.11">
              {t('More info')}.
            </Link>
          </Body>
          <Divider />

          <Body size={'sm'}>
            {t('By continuing, you agree that you are responsible for keeping this file and claiming any refund.')}
          </Body>
        </VStack>
      </Feedback>
      <Button
        as={ChakraLink}
        href={fileToDownload?.content}
        download={fileToDownload?.download}
        isExternal
        size="lg"
        variant="solid"
        minWidth="310px"
        colorScheme="primary1"
        onClick={onComplete}
      >
        {t('Download & Continue')}
      </Button>
    </VStack>
  )
}
