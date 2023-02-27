import { StackProps, Text, VStack } from '@chakra-ui/react'
import { BiErrorAlt } from 'react-icons/bi'

import { colors } from '../../styles'

interface NoDataErrorProps extends StackProps {
  message?: string
}

export const NoDataError = ({ message, ...props }: NoDataErrorProps) => {
  return (
    <VStack w="full" {...props} justifyContent="center">
      <BiErrorAlt fontSize="40px" color={colors.secondaryRed} />
      <Text>{message || 'Failed to fetch data'}</Text>
    </VStack>
  )
}
