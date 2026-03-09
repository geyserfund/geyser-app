import { HStack, Image, StackProps } from '@chakra-ui/react'
import { t } from 'i18next'

import PaymentMethodsImage from '@/assets/project-payment-methods.webp'
import { Body } from '@/shared/components/typography/Body.tsx'

type ProjectPaymentMethodsHintProps = StackProps & {
  textSize?: 'xs' | 'sm' | 'md'
}

/** Displays the payment methods note shown below project contribution CTAs. */
export const ProjectPaymentMethodsHint = ({
  justifyContent = 'flex-start',
  textSize = 'sm',
  ...props
}: ProjectPaymentMethodsHintProps) => {
  return (
    <HStack w="full" spacing={1.5} alignItems="center" justifyContent={justifyContent} {...props}>
      <Image src={PaymentMethodsImage} alt="" aria-hidden="true" h="24px" w="auto" objectFit="contain" />

      <Body size={textSize} light textAlign="inherit" lineHeight="1.2">
        {t('with Bitcoin and most fiat currencies')}
      </Body>
    </HStack>
  )
}
