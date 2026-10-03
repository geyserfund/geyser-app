import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import Loader from '@/components/ui/Loader.tsx'
import { DirectPaymentDetailsForm } from '@/modules/project/components/DirectPaymentDetailsForm.tsx'
import { isLabifOpenFundingProject } from '@/modules/project/domain/labifOpenFunding.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep } from '@/types/index.ts'

import { ProjectCreationPageWrapper } from '../components/ProjectCreationPageWrapper.tsx'

const PAYMENT_FORM_ID = 'project-creation-payment-form'

export const LaunchPayment = () => {
  const navigate = useNavigate()
  const { project, loading } = useProjectAtom()

  useEffect(() => {
    if (!loading && project.id && !isLabifOpenFundingProject(project)) {
      navigate(getPath('launchFinalize', project.id), { replace: true })
    }
  }, [loading, navigate, project])

  if (loading || !project.id || !isLabifOpenFundingProject(project)) {
    return <Loader />
  }

  return (
    <ProjectCreationPageWrapper
      title="Payment Settings"
      backButtonProps={{ onClick: () => navigate(getPath('launchAboutYou', project.id)) }}
      continueButtonProps={{ type: 'submit', form: PAYMENT_FORM_ID, label: 'Continue' }}
    >
      <DirectPaymentDetailsForm
        projectId={project.id}
        directPaymentDetails={project.directPaymentDetails}
        formId={PAYMENT_FORM_ID}
        hideSubmitButton
        requireDirectPaymentDetails
        showStripeConfiguration
        stripeConfigurationAfterDirectPayments
        lastCreationStep={ProjectCreationStep.Launch}
        submitLabel="Continue"
        onSaved={() => navigate(getPath('launchFinalize', project.id))}
      />
    </ProjectCreationPageWrapper>
  )
}
