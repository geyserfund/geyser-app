import { Button, ButtonProps, HStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useAuthContext } from '@/context/auth.tsx'
import { UpdateVerifyEmail } from '@/modules/profile/pages/profileSettings/components/UpdateVerifyEmail.tsx'
import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { VerifiedButton } from '@/shared/molecules/VerifiedButton.tsx'

import { VerificationModal } from '../../../projectDashboard/components/VerificationModal.tsx'
import { EnableFiatContributions } from '../../../projectDashboard/views/wallet/components/EnableFiatContributions.tsx'
import { ProjectCreationLayout } from '../../Layouts/ProjectCreationLayout.tsx'
import { LaunchConnectWallet } from './components/LaunchConnectWallet.tsx'

export const LaunchPaymentWallet = () => {
  const { user } = useAuthContext()

  const verifyIntroModal = useModal()

  const continueProps: ButtonProps = {
    onClick() {},
  }

  const backProps: ButtonProps = {
    onClick() {},
  }

  const isIdentityVerified = Boolean(user.complianceDetails.verifiedDetails.identity?.verified)

  return (
    <ProjectCreationLayout title={t('Payment Wallet')} continueButtonProps={continueProps} backButtonProps={backProps}>
      <UpdateVerifyEmail inputWrapperProps={{ marginTop: 2 }} />

      <LaunchConnectWallet />

      <EnableFiatContributions
        paddingX={0}
        dense
        noborder
        isIdentityVerified={isIdentityVerified}
        buttonProps={{
          onClick: verifyIntroModal.onOpen,
        }}
      />
      <FieldContainer
        title={
          <HStack w="full" justifyContent="space-between">
            <Body size="lg" medium>
              {t('Become a verified creator')}
            </Body>
            {isIdentityVerified ? (
              <VerifiedButton />
            ) : (
              <Button variant="outline" colorScheme="primary1" size="lg" onClick={verifyIntroModal.onOpen}>
                {t('Verify')}
              </Button>
            )}
          </HStack>
        }
        subtitle={t(
          'Get verified to earn a trusted creator badge. Verified creators often receive more contributions as backers feel more confident supporting projects with verified identities.',
        )}
        gap={2}
      />
      <VerificationModal {...verifyIntroModal} />
    </ProjectCreationLayout>
  )
}
