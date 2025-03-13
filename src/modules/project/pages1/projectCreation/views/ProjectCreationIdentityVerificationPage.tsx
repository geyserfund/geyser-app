import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { Dispatch, SetStateAction, useEffect } from 'react'

import { ProjectState } from '@/modules/project/state/projectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'

import TitleWithProgressBar from '../../../../../components/molecules/TitleWithProgressBar.tsx'
import { useAuthContext } from '../../../../../context/index.ts'
import { CreateWalletInput } from '../../../../../types/index.ts'
import { ProjectCreateLayout } from '../components/ProjectCreateLayout.tsx'
import { whereToGoNextAtom } from '../states/nodeStatusAtom.ts'
import { goToEmailVerificationAtom } from '../states/nodeStatusAtom.ts'

interface ProjectCreationIdentityVerificationPageProps {
  project?: ProjectState
  createWalletInput: CreateWalletInput | null
  isSubmitEnabled: boolean
  setReadyToLaunch: Dispatch<SetStateAction<boolean>>
}

export const ProjectCreationIdentityVerificationPage = ({
  setReadyToLaunch,
}: ProjectCreationIdentityVerificationPageProps) => {
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
        title={
          <TitleWithProgressBar
            hideSteps
            title={t('Identity verification')}
            subtitle={t('You’re almost ready to launch!')}
            index={4}
            length={4}
          />
        }
      >
        <Body>{t('Please verify your identity to continue')}</Body>
      </ProjectCreateLayout>
    </>
  )
}
