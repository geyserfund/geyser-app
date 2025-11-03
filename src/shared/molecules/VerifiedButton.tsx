import { HStack, Icon, StackProps } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiCheckBold } from 'react-icons/pi'

import { Body, BodyProps } from '../components/typography/Body.tsx'

export const VerifiedButton = ({ bodyProps, ...rest }: { bodyProps?: BodyProps } & StackProps) => {
  return (
    <HStack border="1px solid" borderColor="primary1.9" borderRadius="8px" paddingX={2} paddingY={1} {...rest}>
      <Body size="lg" color="primary1.9" medium {...bodyProps}>
        {t('Verified')}
      </Body>
      <Icon as={PiCheckBold} color="primary1.9" />
    </HStack>
  )
}
