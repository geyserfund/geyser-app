import { ButtonProps } from '@chakra-ui/react'
import { t } from 'i18next'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { UpdateVerifyEmail } from '@/modules/profile/pages/profileSettings/components/UpdateVerifyEmail.tsx'
import { useProjectAtom, useWalletAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { ProjectCreationStep } from '@/types/index.ts'
import { isAllOrNothing, useNotification } from '@/utils/index.ts'

import { VerificationModal } from '../../../../projectDashboard/components/VerificationModal.tsx'
import { EnableFiatContributions } from '../../../../projectDashboard/views/wallet/components/EnableFiatContributions.tsx'
import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'
import { useUpdateProjectWithLastCreationStep } from '../../../hooks/useIsStepAhead.tsx'
import { ConnectWallet } from '../components/ConnectWallet.tsx'

export const LaunchPaymentWallet = () => {
  const { user } = useAuthContext()
  const toast = useNotification()
  const { project } = useProjectAtom()
  const navigate = useNavigate()

  const { wallet } = useWalletAtom()
  const verifyIntroModal = useModal()

  const { updateProjectWithLastCreationStep } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.Wallet,
    getPath('launchPaymentTaxId', project.id),
  )

  const isAon = isAllOrNothing(project)

  const continueProps: ButtonProps = {
    onClick() {
      if (!user.isEmailVerified) {
        toast.error({ title: t('Creator email must be verified to continue') })
        return
      }

      if (!isAon && !wallet?.id) {
        toast.error({ title: t('Please connect a wallet to continue') })
        return
      }

      updateProjectWithLastCreationStep()
    },
  }

  const backProps: ButtonProps = {
    onClick() {
      navigate(getPath('launchAboutYou', project.id))
    },
  }

  const isIdentityVerified = Boolean(user.complianceDetails.verifiedDetails.identity?.verified)

  return (
    <ProjectCreationPageWrapper
      title={t('Payment Wallet')}
      continueButtonProps={continueProps}
      backButtonProps={backProps}
    >
      <UpdateVerifyEmail inputWrapperProps={{ marginTop: 2 }} />
      <ConnectWallet />

      {!isAon && (
        <>
          <EnableFiatContributions
            paddingX={0}
            dense
            noborder
            isIdentityVerified={isIdentityVerified}
            buttonProps={{
              onClick: verifyIntroModal.onOpen,
            }}
          />
        </>
      )}

      <VerificationModal {...verifyIntroModal} />
    </ProjectCreationPageWrapper>
  )
}
