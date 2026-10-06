import { HStack, Icon, StackProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiEnvelopeSimple } from 'react-icons/pi'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body, H2 } from '@/shared/components/typography/index.ts'
import { SubscribeForm } from '@/shared/sections/SubscribeForm.tsx'

/** Newsletter subscription section for the landing page with a signup form and supporting copy. */
export const NewsletterSignup = (props: StackProps) => {
  return (
    <CardLayout w="full" alignSelf="center" spacing={6} {...props}>
      <VStack spacing={3} textAlign="left" align="flex-start" w="full">
        <HStack spacing={3} align="center" justify="flex-start" w="full">
          <Icon as={PiEnvelopeSimple} boxSize={8} color="utils.text" aria-hidden />
          <H2 size={{ base: 'xl', lg: '2xl' }} bold>
            {t('Circular Grant updates, in your inbox')}
          </H2>
        </HStack>
        <Body size="md" light textAlign="left" w="full">
          {t(
            'Follow Field Partner stories, campaign progress, and what Circular Grants make possible in local communities.',
          )}
        </Body>
      </VStack>

      <SubscribeForm
        w="full"
        maxWidth="full"
        inputProps={{
          placeholder: 'satoshi@gmx.com',
        }}
        buttonProps={{
          children: t('Join'),
          variant: 'solid',
          colorScheme: 'primary1',
          minWidth: '100px',
        }}
      />
    </CardLayout>
  )
}
