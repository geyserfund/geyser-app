import { StackProps, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BiErrorAlt } from 'react-icons/bi'

interface NoDataErrorProps extends StackProps {
  message?: string
}

export const NoDataError = ({ message, ...props }: NoDataErrorProps) => {
  const { t } = useTranslation()
  return (
    <VStack w="full" {...props} justifyContent="center" paddingY="20px">
      <BiErrorAlt fontSize="40px" color={'secondary.red'} />
      <Text>{message || t('Failed to fetch data')}</Text>
    </VStack>
  )
}
