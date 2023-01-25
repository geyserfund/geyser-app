import { HStack, StackProps, Text } from '@chakra-ui/react'

interface CharacterLimitErrorProps extends StackProps {
  length: number
  limit: number
  message?: string
}

export const CharacterLimitError = ({
  message,
  length,
  limit,
  ...rest
}: CharacterLimitErrorProps) => {
  return (
    <HStack
      width="100%"
      justifyContent="space-between"
      paddingTop="5px"
      {...rest}
    >
      <Text fontSize="12px" color="brand.error">
        {message || " You're over the character limit"}
      </Text>
      <Text fontSize="12px" color="brand.error">{` ${length}/${limit}`}</Text>
    </HStack>
  )
}
