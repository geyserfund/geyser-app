import { StackProps, Text, VStack } from '@chakra-ui/react'
import { BiErrorAlt } from 'react-icons/bi'

interface NoDataErrorProps extends StackProps {
  message?: string
}

export const NoDataError = ({ message, ...props }: NoDataErrorProps) => {
  return (
    <VStack w="full" {...props} justifyContent="center" paddingY="20px">
      <BiErrorAlt fontSize="40px" color={'secondary.red'} />
      <Text>{message || 'Failed to fetch data'}</Text>
    </VStack>
  )
}
