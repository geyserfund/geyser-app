import { HStack, Icon, StackProps, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiEnvelopeSimple } from 'react-icons/pi'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body, H2 } from '@/shared/components/typography/index.ts'
import { SubscribeForm } from '@/shared/sections/SubscribeForm.tsx'

/** Newsletter subscription section for the landing page with a signup form and supporting copy. */
export const NewsletterSignup = (props: StackProps) => {
  const borderColor = useColorModeValue('amber.6', 'amber.7')
  const bgColor = useColorModeValue('amber.1', 'amber.2')
  const iconColor = useColorModeValue('black', 'white')
  const titleColor = useColorModeValue('neutral1.11', 'white')
  const bodyColor = 'neutralAlpha.11'

  return (
    <CardLayout
      w="full"
      alignSelf="center"
      spacing={6}
      padding={8}
      borderColor={borderColor}
      bg={bgColor}
      {...props}
    >
      <VStack spacing={3} textAlign="left" align="flex-start" w="full">
        <HStack spacing={3} align="center" justify="flex-start" w="full">
          <Icon as={PiEnvelopeSimple} boxSize={9} color={iconColor} />
          <H2 size="2xl" medium color={titleColor}>
            {t("Don't miss a thing")}
          </H2>
        </HStack>
        <Body size="md" color={bodyColor} textAlign="left" w="full">
          {t(
            'Join our newsletter to stay up to date with latest adoption news across education, culture, art, circular economies and a lot more. Your weekly breath of fresh air and hope right in your inbox.',
          )}
        </Body>
      </VStack>

      <SubscribeForm
        w="full"
        maxWidth="full"
        inputProps={{
          placeholder: t('satoshi@gmx.com'),
        }}
        buttonProps={{
          children: t('Join'),
          variant: 'solid',
          colorScheme: 'amber',
          minWidth: '100px',
        }}
      />
    </CardLayout>
  )
}
