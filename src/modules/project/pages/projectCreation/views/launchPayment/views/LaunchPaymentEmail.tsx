import type { ButtonProps } from '@chakra-ui/react'
import { t } from 'i18next'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { UpdateVerifyEmail } from '@/modules/profile/pages/profileSettings/components/UpdateVerifyEmail.tsx'
import { DirectPaymentDetailsForm } from '@/modules/project/components/DirectPaymentDetailsForm.tsx'
import { ManagedRecoverableGrantPaymentStatus } from '@/modules/project/components/ManagedRecoverableGrantPaymentStatus.tsx'
import { isManagedRecoverableGrantProject } from '@/modules/project/domain/managedRecoverableGrant.ts'
import { TEMPORARY_BOLTZ_CONTINGENCY_ENABLED } from '@/modules/project/constants/temporaryBoltzContingency.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { isStripeConnectSupportedForProject } from '@/modules/project/utils/stripeConnect.ts'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'
import { useUpdateProjectWithLastCreationStep } from '../../../hooks/useIsStepAhead.tsx'

export const LaunchPaymentEmail = () => {
  const { project } = useProjectAtom()

  if (isManagedRecoverableGrantProject(project)) return <ManagedRecoverableGrantPaymentReadiness />
  return TEMPORARY_BOLTZ_CONTINGENCY_ENABLED ? <TemporaryLaunchPaymentEmail /> : <LegacyLaunchPaymentEmail />
}

const ManagedRecoverableGrantPaymentReadiness = () => {
  const { project } = useProjectAtom()
  const navigate = useNavigate()
  const readiness = project.paymentMethods?.managedRecoverableGrant
  const stripeReady = Boolean(readiness?.stripe)
  const strikeReady = Boolean(readiness?.strikeLightning || readiness?.strikeOnChain)
  const hasReadyProvider = stripeReady || strikeReady
  const { updateProjectWithLastCreationStep, loading } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.Wallet,
    getPath('launchFinalize', project.id),
  )

  return (
    <ProjectCreationPageWrapper
      title={t('Managed payment methods')}
      continueButtonProps={{
        label: t('Continue'),
        onClick: () => updateProjectWithLastCreationStep(),
        isDisabled: !hasReadyProvider,
        isLoading: loading,
      }}
      backButtonProps={{ onClick: () => navigate(getPath('launchAboutYou', project.id)) }}
    >
      <ManagedRecoverableGrantPaymentStatus readiness={readiness} />
    </ProjectCreationPageWrapper>
  )
}

const TemporaryLaunchPaymentEmail = () => {
  const { project } = useProjectAtom()
  const navigate = useNavigate()
  const formId = 'direct-payment-details-creation-form'

  const backProps: ButtonProps = {
    onClick() {
      navigate(getPath('launchAboutYou', project.id))
    },
  }

  return (
    <ProjectCreationPageWrapper
      title={t('Payment settings')}
      continueButtonProps={{ label: t('Save and continue'), type: 'submit', form: formId }}
      backButtonProps={backProps}
    >
      <DirectPaymentDetailsForm
        projectId={project.id}
        directPaymentDetails={project.directPaymentDetails}
        lastCreationStep={ProjectCreationStep.Launch}
        showStripeConfiguration={isStripeConnectSupportedForProject(project)}
        allowStripeOnly={Boolean(project.paymentMethods?.fiat?.stripe)}
        formId={formId}
        hideSubmitButton
        onSaved={() => navigate(getPath('launchFinalize', project.id))}
      />
    </ProjectCreationPageWrapper>
  )
}

const LegacyLaunchPaymentEmail = () => {
  const { user } = useAuthContext()
  const toast = useNotification()
  const { project } = useProjectAtom()
  const navigate = useNavigate()

  const { updateProjectWithLastCreationStep } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.Wallet,
    getPath('launchPaymentTaxId', project.id),
  )

  const hasEmail = Boolean(user.email)
  const stepTitle = hasEmail ? t('Confirm your email') : t('Configure your email')
  const continueProps: ButtonProps = {
    onClick() {
      if (!user.isEmailVerified) {
        toast.error({ title: t('Creator email must be verified to continue') })
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

  return (
    <ProjectCreationPageWrapper title={stepTitle} continueButtonProps={continueProps} backButtonProps={backProps}>
      <UpdateVerifyEmail inputWrapperProps={{ marginTop: 2 }} />
    </ProjectCreationPageWrapper>
  )
}
