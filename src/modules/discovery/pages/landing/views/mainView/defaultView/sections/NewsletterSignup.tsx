import { StackProps, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body, H2 } from '@/shared/components/typography/index.ts'
import { SubscribeForm } from '@/shared/sections/SubscribeForm.tsx'

export const NewsletterSignup = (props: StackProps) => {
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const bgColor = useColorModeValue('white', 'gray.800')

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
        <H2 size="2xl" medium>
          {t("Don't miss a thing")}
        </H2>
        <Body size="md" color="neutral1.11" maxWidth="700px">
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
          colorScheme: 'neutral1',
          minWidth: '100px',
        }}
      />
    </VStack>
  )
}
