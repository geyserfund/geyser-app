import { Button, ButtonProps, HStack, Switch, SwitchProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

type EnableFiatContributionsProps = CardLayoutProps & {
  disableImage?: boolean
  switchProps?: SwitchProps
  buttonProps?: ButtonProps
  isIdentityVerified?: boolean
}

export const EnableFiatContributions = ({
  disableImage,
  buttonProps,
  switchProps,
  isIdentityVerified,
  ...props
}: EnableFiatContributionsProps) => {
  return (
    <CardLayout padding={4} {...props}>
      <HStack w="full" justifyContent="space-between">
        <Body size="lg" medium>
          {t('Enable fiat contributions')}
        </Body>
        {isIdentityVerified ? (
          <HStack>
            <Body size="lg" color="primary1.9" medium>
              {t('Enabled')}
            </Body>
          </HStack>
        ) : buttonProps ? (
          <Button size="lg" variant="solid" colorScheme="primary1" {...buttonProps}>
            {t('Enable')}
          </Button>
        ) : (
          <Switch size="lg" {...switchProps} />
        )}
      </HStack>
      <HStack flexDirection={{ base: 'column', lg: 'row' }} spacing={4}>
        <VStack alignItems={'start'}>
          <Body size="sm" light>
            {t(
              'Enable your contributors to fund with fiat. When enabled, all payments are automatically converted to Bitcoin and instantly deposited in your connected Bitcoin wallet.',
            )}
          </Body>
          <Body size="sm" light>
            {t('Fiat contributions have an additional 3.5% fee charged by the third-party payment processor.')}
          </Body>
        </VStack>
      </HStack>
    </CardLayout>
  )
}
