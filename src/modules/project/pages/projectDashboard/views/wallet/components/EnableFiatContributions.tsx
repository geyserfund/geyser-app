import { Button, ButtonProps, HStack, Icon } from '@chakra-ui/react'
import { t } from 'i18next'
import { AiFillApple } from 'react-icons/ai'
import { FaBitcoin } from 'react-icons/fa'

import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

type EnableFiatContributionsProps = CardLayoutProps & {
  buttonProps?: ButtonProps
  isIdentityVerified?: boolean
}

export const EnableFiatContributions = ({
  buttonProps,
  isIdentityVerified,
  ...props
}: EnableFiatContributionsProps) => {
  return (
    <CardLayout padding={4} {...props}>
      <HStack w="full" justifyContent="space-between">
        <Body size="lg" medium>
          {t('Fiat contributions')}
        </Body>

        <Button size="lg" variant="outline" colorScheme="primary1" {...buttonProps}>
          {t('Enabled')}
        </Button>
      </HStack>
      <HStack w="full" backgroundColor="neutral1.3" padding={2} borderRadius="8px">
        <Icon as={AiFillApple} fontSize="16px" color="utils.text" />
        <Icon as={FaBitcoin} fontSize="16px" color="utils.text" />

        <Body size="xs">{t('Accept payments with Apple Pay, Bitcoin & 20+ methods')}</Body>
      </HStack>
      <Body size="sm" light>
        {t(
          'Contributors can pay with several fiat payments and you receive Bitcoin. Fiat contributions have an additional 3.5% fee charged by the third party payment processor. Learn more about it here.',
        )}
      </Body>
    </CardLayout>
  )
}
