import { HStack, Icon, StackProps, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiEnvelopeSimple } from 'react-icons/pi'

import { Body, H2 } from '@/shared/components/typography/index.ts'
import { SubscribeForm } from '@/shared/sections/SubscribeForm.tsx'

/** Newsletter subscription section for the landing page with a signup form and supporting copy. */
export const NewsletterSignup = (props: StackProps) => {
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const bgColor = useColorModeValue('white', 'neutral1.3')
  const iconColor = useColorModeValue('black', 'white')
  const titleColor = useColorModeValue('neutral1.11', 'white')
  const bodyColor = useColorModeValue('neutral1.11', 'neutral1.10')

  return (
    <VStack
      w="full"
      alignSelf="center"
      spacing={6}
      padding={8}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="12px"
      bg={bgColor}
      {...props}
    >
      <VStack spacing={3} textAlign="center">
        <HStack spacing={3} align="center" justify="center">
          <Icon as={PiEnvelopeSimple} boxSize={9} color={iconColor} />
          <H2 size="2xl" medium color={titleColor}>
            {t("Don't miss a thing")}
          </H2>
        </HStack>
        <Body size="md" color={bodyColor} maxWidth="700px">
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
          colorScheme: 'primary1',
          minWidth: '100px',
        }}
      />
    </VStack>
  )
}
