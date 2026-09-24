import { t } from 'i18next'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { DirectPaymentDetailsForm } from '@/modules/project/components/DirectPaymentDetailsForm.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep } from '@/types/index.ts'

import { ProjectCreationPageWrapper } from '../components/ProjectCreationPageWrapper.tsx'

export const LaunchPaymentDetails = () => {
  const navigate = useNavigate()
  const { project } = useProjectAtom()
  const formId = 'launch-payment-details-form'
  const [saving, setSaving] = useState(false)

  return (
    <ProjectCreationPageWrapper
      title={t('Payment details')}
      continueButtonProps={{
        type: 'submit',
        form: formId,
        isLoading: saving,
      }}
      backButtonProps={{
        onClick: () => navigate(getPath('launchAboutYou', project.id)),
      }}
    >
      <DirectPaymentDetailsForm
        projectId={project.id}
        directPaymentDetails={project.directPaymentDetails}
        formId={formId}
        hideSubmitButton
        lastCreationStep={ProjectCreationStep.Launch}
        showStripeConfiguration
        stripeConfigurationAfterDirectPayments
        onLoadingChange={setSaving}
        onSaved={() => navigate(getPath('launchFinalize', project.id))}
      />
    </ProjectCreationPageWrapper>
  )
}
