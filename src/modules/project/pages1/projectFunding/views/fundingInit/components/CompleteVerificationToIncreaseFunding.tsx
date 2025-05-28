import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useAuthContext } from '@/context/auth.tsx'
import { useAuthModal } from '@/modules/auth/hooks/useAuthModal.ts'
import { UserVerificationModal } from '@/modules/project/pages1/projectDashboard/views/wallet/components/UserVerificationModal.tsx'
import { useUserVerificationModal } from '@/modules/project/pages1/projectDashboard/views/wallet/hooks/useUserVerificationModal.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { Feedback } from '@/shared/molecules/Feedback.tsx'

export const CompleteVerificationToIncreaseFunding = () => {
  const { isLoggedIn } = useAuthContext()
  const { loginOnOpen } = useAuthModal()

  const { generateVerificationTokenLoading, startVerification, userVerificationModal, userVerificationToken } =
    useUserVerificationModal()

  return (
    <>
      <Feedback variant={FeedBackVariant.WARNING} noIcon padding={{ base: 3, lg: 4 }}>
        <VStack w="full" spacing={{ base: 2, lg: 4 }}>
          <VStack w="full" alignItems="flex-start" spacing={{ base: 0, lg: 2 }}>
            <Body size={{ base: 'md', lg: 'lg' }} medium>
              {t('Contribution amount above $10k')}
            </Body>
            <Body size={{ base: 'sm', lg: 'md' }}>
              {isLoggedIn
                ? t('To contribute more than $10k, please complete a one-time identity verification.')
                : t('To contribute more than $10k, please log in and complete a one-time verification.')}
            </Body>
          </VStack>
          <Button
            variant="outline"
            colorScheme="warning"
            onClick={isLoggedIn ? () => startVerification() : () => loginOnOpen()}
            isLoading={generateVerificationTokenLoading}
            width={{ base: '100%', lg: 'auto' }}
            size={{ base: 'md', lg: 'lg' }}
          >
            {t('Complete verification')}
          </Button>
        </VStack>
      </Feedback>
      <UserVerificationModal
        userVerificationModal={userVerificationModal}
        accessToken={userVerificationToken?.token || ''}
        verificationLevel={userVerificationToken?.verificationLevel}
      />
    </>
  )
}
