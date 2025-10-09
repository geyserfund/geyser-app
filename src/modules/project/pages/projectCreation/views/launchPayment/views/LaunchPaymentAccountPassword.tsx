import { ButtonProps, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router'

import { useAccountPasswordForm } from '@/modules/project/forms/accountPassword/useAccountPasswordForm.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep } from '@/types/index.ts'

import { useUpdateProjectWithLastCreationStep } from '../../../hooks/useIsStepAhead.tsx'
import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'

export const LaunchPaymentAccountPassword = () => {
  const { project } = useProjectAtom()
  const navigate = useNavigate()

  const { updateProjectWithLastCreationStep } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.IdentityVerification,
    getPath('launchFinalize', project.id),
  )

  const { renderForm, currentForm, titles } = useAccountPasswordForm({
    onComplete: () => updateProjectWithLastCreationStep(),
    isCreator: true,
  })

  const continueProps: ButtonProps = {
    type: 'submit',
  }

  const backProps: ButtonProps = {
    onClick() {
      navigate(getPath('launchPaymentWallet', project.id))
    },
  }

  return (
    <ProjectCreationPageWrapper
      title={titles}
      continueButtonProps={continueProps}
      backButtonProps={backProps}
      as="form"
      onSubmit={currentForm.onSubmit}
    >
      <VStack w="full" alignItems="start" gap={6}>
        {renderForm()}
      </VStack>
    </ProjectCreationPageWrapper>
  )
}
