import { ButtonProps } from '@chakra-ui/react'
import { t } from 'i18next'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { UpdateVerifyEmail } from '@/modules/profile/pages/profileSettings/components/UpdateVerifyEmail.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep, ProjectFundingStrategy } from '@/types/index.ts'
import { isAllOrNothing, useNotification } from '@/utils/index.ts'

import { EnableFiatContributions } from '../../../../projectDashboard/views/wallet/components/EnableFiatContributions.tsx'
import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'
import { useUpdateProjectWithLastCreationStep } from '../../../hooks/useIsStepAhead.tsx'

export const LaunchPaymentWallet = () => {
  const { user } = useAuthContext()
  const toast = useNotification()
  const { project } = useProjectAtom()
  const navigate = useNavigate()

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

      updateProjectWithLastCreationStep()
    },
  }

  const backProps: ButtonProps = {
    onClick() {
      navigate(getPath('launchAboutYou', project.id))
    },
  }

  return (
    <ProjectCreationPageWrapper
      title={t('Payment Wallet')}
      continueButtonProps={continueProps}
      backButtonProps={backProps}
    >
      <UpdateVerifyEmail inputWrapperProps={{ marginTop: 2 }} />

      {!isAon && (
        <EnableFiatContributions
          isTiaProject={project.fundingStrategy === ProjectFundingStrategy.TakeItAll}
          projectId={project.id}
        />
      )}
    </ProjectCreationPageWrapper>
  )
}
