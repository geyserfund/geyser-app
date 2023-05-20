import { HTMLChakraProps, Text, VStack } from '@chakra-ui/react'

type Props = HTMLChakraProps<'div'> & {
  primaryText: string | React.ReactElement
  promoText?: string
  secondaryText: string | React.ReactElement
}

export const WalletConnectionOptionInfoBox = ({
  primaryText,
  promoText,
  secondaryText,
  children,
}: Props) => {
  return (
    <VStack
      backgroundColor={'neutral.100'}
      textColor={'neutral.700'}
      spacing={2}
      p={4}
      alignItems="start"
      fontSize={'10px'}
      borderRadius={'md'}
    >
      <Text variant="body1" fontWeight="medium">
        {primaryText}
      </Text>
      {promoText && (
        <Text fontWeight="medium" variant="body2" color="primary.600">
          {promoText}
        </Text>
      )}
      <Text variant="body2" color="neutral.600">
        {secondaryText}
      </Text>
      {children}
    </VStack>
  )
}
