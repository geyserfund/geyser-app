import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { Dispatch, SetStateAction, useEffect } from 'react'

import { UpdateVerifyEmail } from '@/modules/profile/pages/profileSettings/components/UpdateVerifyEmail.tsx'
import { ProjectState } from '@/modules/project/state/projectAtom.ts'

import TitleWithProgressBar from '../../../../../components/molecules/TitleWithProgressBar'
import { useAuthContext } from '../../../../../context'
import { CreateWalletInput } from '../../../../../types'
import { FormContinueButton } from '../components/FormContinueButton.tsx'
import { ProjectCreateLayout } from '../components/ProjectCreateLayout.tsx'
import { whereToGoNextAtom } from '../states/nodeStatusAtom.ts'
import { goToEmailVerificationAtom } from '../states/nodeStatusAtom.ts'

interface ProjectCreationEmailVerificationPageProps {
  project?: ProjectState
  createWalletInput: CreateWalletInput | null
  isSubmitEnabled: boolean
  setReadyToLaunch: Dispatch<SetStateAction<boolean>>
}

export const ProjectCreationEmailVerificationPage = ({
  setReadyToLaunch,
}: ProjectCreationEmailVerificationPageProps) => {
  const { user } = useAuthContext()

  const setGoToEmailVerification = useSetAtom(goToEmailVerificationAtom)
  const whereToGoNext = useSetAtom(whereToGoNextAtom)

  const handleBackClick = () => {
    setGoToEmailVerification(false)
  }

  useEffect(() => {
    if (user.isEmailVerified) {
      whereToGoNext()
    }
  }, [user, whereToGoNext])

  return (
    <>
      <ProjectCreateLayout
        onBackClick={handleBackClick}
        continueButton={<FormContinueButton onClick={() => {}} isDisabled={true} flexGrow={1} />}
        title={
          <TitleWithProgressBar
            hideSteps
            title={t('Email verification')}
            subtitle={t('You’re almost ready to launch!')}
            index={4}
            length={4}
          />
        }
      >
        <UpdateVerifyEmail />
      </ProjectCreateLayout>
    </>
  )
}
