import { Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useAuthContext } from '@/context/auth.tsx'
import { UserVerificationModal } from '@/modules/project/pages1/projectDashboard/views/wallet/components/UserVerificationModal.tsx'
import { useUserVerificationModal } from '@/modules/project/pages1/projectDashboard/views/wallet/hooks/useUserVerificationModal.ts'
import { Body, H3 } from '@/shared/components/typography'
import { UserVerificationLevelInput } from '@/types/index.ts'

import { VerifiedBadge } from '../../profilePage/views/account/views/badges/VerifiedBadge.tsx'
import { ProfileSettingsLayout } from '../common/ProfileSettingsLayout'
import { UpdateVerifyEmail } from '../components/UpdateVerifyEmail.tsx'

export const ProfileSettingsVerifications = () => {
  return (
    <ProfileSettingsLayout desktopTitle={t('Verifications')}>
      <VStack w="100%" spacing={6} flexGrow={1} px={{ base: 0, lg: 6 }}>
        <UpdateVerifyEmail />
        <IdentityVerification />
      </VStack>
    </ProfileSettingsLayout>
  )
}

const IdentityVerification = () => {
  const { generateVerificationTokenLoading, startVerification, userVerificationModal, userVerificationToken } =
    useUserVerificationModal()

  const { user } = useAuthContext()

  const isVerified = user?.complianceDetails?.verifiedDetails?.identity?.verified
  return (
    <>
      <HStack w="full" justifyContent="space-between">
        <VStack w="full" alignItems="start">
          <H3 size="lg">{t('Identity')}</H3>
          <Body size="sm">
            {t(
              'Verify your identity to contribute larger than $10k. This also removes any daily or monthly restrictions on fiat contributions',
            )}
          </Body>
        </VStack>
        {isVerified ? (
          <HStack border="1px solid" borderColor="neutral1.6" px={4} py={1} borderRadius="8px">
            <VerifiedBadge user={user} fontSize="20px" />
            <Body>{t('Verified')}</Body>
          </HStack>
        ) : (
          <Button
            size="lg"
            variant="outline"
            colorScheme="neutral1"
            isLoading={generateVerificationTokenLoading}
            onClick={() => startVerification(UserVerificationLevelInput.Level_3)}
          >
            {t('Verify now')}
          </Button>
        )}
      </HStack>
      <UserVerificationModal
        userVerificationModal={userVerificationModal}
        accessToken={userVerificationToken?.token || ''}
        verificationLevel={userVerificationToken?.verificationLevel}
      />
    </>
  )
}
