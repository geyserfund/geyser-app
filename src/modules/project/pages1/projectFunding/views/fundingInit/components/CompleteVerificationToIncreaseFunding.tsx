import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { UserVerificationModal } from '@/modules/project/pages1/projectDashboard/views/wallet/components/UserVerificationModal.tsx'
import { useUserVerificationModal } from '@/modules/project/pages1/projectDashboard/views/wallet/hooks/useUserVerificationModal.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { Feedback } from '@/shared/molecules/Feedback.tsx'

export const CompleteVerificationToIncreaseFunding = () => {
  const { generateVerificationTokenLoading, startVerification, userVerificationModal, userVerificationToken } =
    useUserVerificationModal()

  return (
    <>
      <Feedback variant={FeedBackVariant.WARNING} noIcon marginTop={4}>
        <VStack w="full" spacing={4}>
          <VStack w="full">
            <Body size="lg" medium>
              {t('Contribution amount exceeds your funding limit')}
            </Body>
            <Body>{t('Please, complete verification to increase funding limit')}</Body>
          </VStack>
          <Button
            variant="outline"
            colorScheme="neutral1"
            onClick={() => startVerification()}
            isLoading={generateVerificationTokenLoading}
            size="lg"
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
