import { Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom } from 'jotai'

import { useAuthContext } from '@/context/auth.tsx'
import { UserVerificationModal } from '@/modules/project/pages1/projectDashboard/views/wallet/components/UserVerificationModal.tsx'
import { useUserVerificationModal } from '@/modules/project/pages1/projectDashboard/views/wallet/hooks/useUserVerificationModal.ts'
import { Body, H3 } from '@/shared/components/typography'
import { UserVerificationLevelInput } from '@/types/index.ts'

import { UserVerifiedBadge } from '../../../../profilePage/views/account/views/badges/VerifiedBadge.tsx'
import { userTaxProfileAtom } from '../state/taxProfileAtom.ts'

export const IdentityVerification = () => {
  const { generateVerificationTokenLoading, startVerification, userVerificationModal, userVerificationToken } =
    useUserVerificationModal()

  const [taxProfile] = useAtom(userTaxProfileAtom)

  const { user } = useAuthContext()

  const isVerified = user?.complianceDetails?.verifiedDetails?.identity?.verified

  const hasIdentity = taxProfile

  return (
    <VStack w="full" spacing={4}>
      <HStack w="full" justifyContent="space-between">
        <VStack w="full" alignItems="start">
          <H3 size="lg">{t('Identity')}</H3>
          <Body size="sm">
            {hasIdentity
              ? t('Verify your identity to get access to higher limits and tax-deducting features.')
              : t('Please select an identity below, to enable verification.')}
          </Body>
        </VStack>
        {isVerified ? (
          <HStack height="40px" border="1px solid" borderColor="neutral1.6" px={4} py={1} borderRadius="8px">
            <UserVerifiedBadge user={user} fontSize="20px" />
            <Body>{t('Verified')}</Body>
          </HStack>
        ) : (
          <Button
            size="lg"
            variant="outline"
            colorScheme="neutral1"
            isLoading={generateVerificationTokenLoading}
            onClick={() => startVerification(UserVerificationLevelInput.Level_3)}
            isDisabled={!taxProfile}
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
    </VStack>
  )
}
