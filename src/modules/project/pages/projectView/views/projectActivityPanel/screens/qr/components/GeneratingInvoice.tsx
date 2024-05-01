import { Button, HStack, SkeletonText, useDisclosure, VStack } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { IoMdRefresh } from 'react-icons/io'

import { SkeletonLayout } from '../../../../../../../../../components/layouts'
import { Body2 } from '../../../../../../../../../components/typography'
import { QRCodeSizeMap } from './QRCodeComponent'

const FUNDING_REQUEST_TIMEOUT = 45_000

export const GeneratingInvoice = ({ refreshInvoice }: { refreshInvoice: () => void }) => {
  const { t } = useTranslation()
  const { onOpen, onClose, isOpen } = useDisclosure()
  const timeout = useRef<NodeJS.Timeout | undefined>()

  useEffect(() => {
    timeout.current = setTimeout(onOpen, FUNDING_REQUEST_TIMEOUT)
    return () => clearTimeout(timeout.current)
  }, [onOpen])

  const handleRefresh = () => {
    refreshInvoice()
    onClose()
    timeout.current = setTimeout(onOpen, FUNDING_REQUEST_TIMEOUT)
  }

  if (isOpen) {
    return (
      <VStack width={'350px'} height={'335px'} justifyContent={'center'}>
        <VStack w="full" alignItems="center">
          <Body2 bold textAlign="center">
            {t('Generating an invoice is taking longer than expected')}
          </Body2>
          <Body2>{t('Click refresh to try again')}</Body2>
          <Button
            textTransform="uppercase"
            variant="secondary"
            size="sm"
            borderRadius="40px"
            leftIcon={<IoMdRefresh />}
            onClick={handleRefresh}
          >
            {t('Refresh')}
          </Button>
        </VStack>
      </VStack>
    )
  }

  return (
    <VStack w="full" spacing="20px">
      <VStack w="full" spacing="10px" alignItems="center">
        <HStack w="full">
          <SkeletonLayout height="40px" width="100%" />
          <SkeletonLayout height="40px" width="100%" />
        </HStack>
        <SkeletonLayout height={QRCodeSizeMap} width={QRCodeSizeMap} />
        <SkeletonText noOfLines={2} width="200px" />
      </VStack>
      <SkeletonLayout maxWidth="360px" height="40px" width="100%" />
      <SkeletonLayout height="300px" width="100%" />
    </VStack>
  )
}
