import { HTMLChakraProps, Text, VStack } from '@chakra-ui/react'

type Props = HTMLChakraProps<'div'> & {
  primaryNode: React.ReactNode
  promoText?: string
  secondaryText: string | React.ReactElement
}

export const WalletConnectionOptionInfoBox = ({
  primaryNode,
  promoText,
  secondaryText,
  children,
  ...rest
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
      borderTopRightRadius={0}
      borderTopLeftRadius={0}
      {...rest}
    >
      {primaryNode}
      {promoText && (
        <Text pt={1} fontWeight="medium" variant="body2" color="primary.600">
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
