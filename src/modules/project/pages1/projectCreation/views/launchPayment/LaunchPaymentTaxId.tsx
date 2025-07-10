import { ButtonProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { LegalEntitySelection } from '@/modules/profile/pages/profileSettings/views/ProfileSettingsVerification/components/LegalEntitySelection.tsx'
import { useTaxProfileForm } from '@/modules/profile/pages/profileSettings/views/ProfileSettingsVerification/useTaxProfileForm.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep } from '@/types/index.ts'

import { useUpdateProjectWithLastCreationStep } from '../../hooks/useIsStepAhead.tsx'
import { ProjectCreationLayout } from '../../Layouts/ProjectCreationLayout.tsx'

export const LaunchPaymentTaxId = () => {
  const { user } = useAuthContext()
  const { project } = useProjectAtom()
  const navigate = useNavigate()

  const { updateProjectWithLastCreationStep } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.Wallet,
    getPath('launchPaymentAccountPassword', project.id),
  )

  const { form, handleSubmit } = useTaxProfileForm({ userId: user.id, onUpdate: updateProjectWithLastCreationStep })

  const continueProps: ButtonProps = {
    onClick() {
      console.log(form.formState.isDirty)
      if (form.formState.isDirty) {
        handleSubmit()
      } else {
        updateProjectWithLastCreationStep()
      }
    },
  }

  const backProps: ButtonProps = {
    onClick() {
      navigate(getPath('launchPaymentWallet', project.id))
    },
  }

  return (
    <ProjectCreationLayout title={t('Payment Tax ID')} continueButtonProps={continueProps} backButtonProps={backProps}>
      <VStack w="full" alignItems="start" gap={2}>
        <Body>{t('Add Tax information to all contribution invoices made to your project.')}</Body>
        <LegalEntitySelection form={form} />
      </VStack>
    </ProjectCreationLayout>
  )
}
