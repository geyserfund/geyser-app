import { HTMLChakraProps, Text, VStack } from '@chakra-ui/react'

import { Body } from '@/shared/components/typography'

type Props = HTMLChakraProps<'div'> & {
  primaryNode: React.ReactNode
  promoText?: string
  secondaryText: string | React.ReactElement
}

export const WalletConnectionOptionInfoBox = ({ primaryNode, promoText, secondaryText, children, ...rest }: Props) => {
  return (
    <VStack
      backgroundColor={'neutral1.3'}
      textColor={'utils.text'}
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
        <Body size="sm" pt={1} medium color="primary1.11">
          {promoText}
        </Body>
      )}
      <Body size="sm" light>
        {secondaryText}
      </Body>
      {children}
    </VStack>
  )
}
