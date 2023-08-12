import { Button, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { IoMdRefresh } from 'react-icons/io'

import { Body2 } from '../../../../../../components/typography'
import Loader from '../../../../../../components/ui/Loader'

const FUNDING_REQUEST_TIMEOUT = 45_000

export const GeneratingInvoice = ({
  refreshInvoice,
}: {
  refreshInvoice: () => void
}) => {
  const { t } = useTranslation()
  const { onOpen, onClose, isOpen } = useDisclosure()
  const timeout = useRef<number | undefined>()

  useEffect(() => {
    timeout.current = setTimeout(onOpen, FUNDING_REQUEST_TIMEOUT)
    return () => clearTimeout(timeout.current)
  }, [onOpen])

  const handleRefresh = () => {
    refreshInvoice()
    onClose()
    timeout.current = setTimeout(onOpen, FUNDING_REQUEST_TIMEOUT)
  }

  return (
    <VStack width={'350px'} height={'335px'} justifyContent={'center'}>
      {isOpen ? (
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
      ) : (
        <VStack>
          <Loader />
          <Text>{t('Generating Invoice')}</Text>
        </VStack>
      )}
    </VStack>
  )
}
