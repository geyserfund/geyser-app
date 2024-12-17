import { HStack, Icon, VStack } from '@chakra-ui/react'
import { PiDiamondFill } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'
import { fonts } from '@/shared/styles/fonts'

export const Copyright = () => {
  return (
    <VStack w="full" paddingTop={10}>
      <HStack>
        <Icon as={PiDiamondFill} fontSize="12px" />
        <Icon as={PiDiamondFill} fontSize="12px" />
        <Icon as={PiDiamondFill} fontSize="12px" />
      </HStack>
      <Body medium fontFamily={fonts.cormorant} light>
        {'© Geyser Inc.'}
      </Body>
    </VStack>
  )
}
