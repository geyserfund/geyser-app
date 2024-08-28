import { StackProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiWarningOctagon } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'

interface NoDataErrorProps extends StackProps {
  message?: string
}

export const NoDataError = ({ message, ...props }: NoDataErrorProps) => {
  const { t } = useTranslation()
  return (
    <VStack w="full" {...props} justifyContent="center" paddingY="20px">
      <PiWarningOctagon fontSize="40px" color={'error.9'} />
      <Body>{message || t('Failed to fetch data')}</Body>
    </VStack>
  )
}
