import { Button, HStack, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useAuthContext } from '@/context/auth.tsx'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { Body, H2 } from '@/shared/components/typography'
import { MailIllustrationUrl, SuccessfullySubscribedIllustrationUrl } from '@/shared/constants/index.ts'
import { useEmailForm } from '@/shared/hooks/forms/useEmailForm.tsx'
import { standardPadding } from '@/shared/styles'
import { SuccessImageBackgroundGradient } from '@/shared/styles/custom'

export const SubscribeToGeyser = () => {
  const { isLoggedIn } = useAuthContext()
  const { control, handleSubmit, subscribed } = useEmailForm()

  if (isLoggedIn) {
    return null
  }

  return (
    <VStack
      padding={standardPadding}
      w="full"
      spacing={4}
      justifyContent="center"
      borderRadius={8}
      border="1px solid"
      borderColor="neutral1.3"
      background={SuccessImageBackgroundGradient}
      alignItems="start"
    >
      {subscribed ? (
        <VStack w="full">
          <Image height="100px" src={SuccessfullySubscribedIllustrationUrl} alt="Mail" />
          <Body color="black" size="lg">
            {t('You’re successfully signed up to Geyser Newsletter!')}
          </Body>
        </VStack>
      ) : (
        <>
          <HStack w="full" justifyContent="start">
            <Image height="40px" src={MailIllustrationUrl} alt="Mail" />
            <H2 bold color="black">
              {t('The Bitcoin projects newsletter')}
            </H2>
          </HStack>
          <Body color="black">
            {t('Get early access to new projects, updates, and progress from around the world.')}
          </Body>
          <HStack as="form" onSubmit={handleSubmit} w="full" justifyContent="start" alignItems="start">
            <ControlledTextInput
              containerProps={{ flex: 1 }}
              control={control}
              name="email"
              placeholder="bitcoiner@xmail.com"
              borderColor="lightModeColors.neutral1[6]"
              backgroundColor="white"
              color="black"
            />
            <Button type="submit" flex={1} size="lg" variant="solid" colorScheme="neutral1" backgroundColor="black">
              {t('Sign up')}
            </Button>
          </HStack>
        </>
      )}
    </VStack>
  )
}
