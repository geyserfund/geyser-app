import { ButtonProps } from '@chakra-ui/react'
import { t } from 'i18next'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { UpdateVerifyEmail } from '@/modules/profile/pages/profileSettings/components/UpdateVerifyEmail.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'
import { useUpdateProjectWithLastCreationStep } from '../../../hooks/useIsStepAhead.tsx'

export const LaunchPaymentEmail = () => {
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
