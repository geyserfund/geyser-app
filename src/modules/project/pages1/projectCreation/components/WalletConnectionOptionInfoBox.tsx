import { Badge, HTMLChakraProps, VStack } from '@chakra-ui/react'

import { Body } from '@/shared/components/typography'

export type WalletConnectionOptionInfoBoxProps = HTMLChakraProps<'div'> & {
  primaryNode: React.ReactNode
  promoText?: string
  secondaryText?: string | React.ReactElement
}

export const WalletConnectionOptionInfoBox = ({
  primaryNode,
  promoText,
  secondaryText,
  children,
  ...rest
}: WalletConnectionOptionInfoBoxProps) => {
  return (
    <VStack
      backgroundColor={'utils.pbg'}
      textColor={'utils.text'}
      spacing={2}
      p={4}
      alignItems="start"
      fontSize={'10px'}
      borderRadius={'md'}
      border="1px solid"
      borderColor="neutral1.6"
      borderTopRightRadius={0}
      borderTopLeftRadius={0}
      borderTop={'none'}
      {...rest}
    >
      {primaryNode}
      {promoText && (
        <Badge variant="soft" pt={1} colorScheme="primary1" size="sm">
          {promoText}
        </Badge>
      )}
      {secondaryText && (
        <Body size="sm" light>
          {secondaryText}
        </Body>
      )}
      {children}
    </VStack>
  )
}
