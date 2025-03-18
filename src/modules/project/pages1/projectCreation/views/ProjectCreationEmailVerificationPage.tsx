import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import {  useEffect } from 'react'

import { UpdateVerifyEmail } from '@/modules/profile/pages/profileSettings/components/UpdateVerifyEmail.tsx'


import TitleWithProgressBar from '../../../../../components/molecules/TitleWithProgressBar'
import { useAuthContext } from '../../../../../context'

import { FormContinueButton } from '../components/FormContinueButton.tsx'
import { ProjectCreateLayout } from '../components/ProjectCreateLayout.tsx'
import { whereToGoNextAtom } from '../states/nodeStatusAtom.ts'
import { goToEmailVerificationAtom } from '../states/nodeStatusAtom.ts'



export const ProjectCreationEmailVerificationPage = () => {
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
