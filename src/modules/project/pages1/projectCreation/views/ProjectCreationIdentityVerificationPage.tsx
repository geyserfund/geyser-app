import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

import TitleWithProgressBar from '../../../../../components/molecules/TitleWithProgressBar.tsx'
import { useAuthContext } from '../../../../../context/index.ts'
import { UserVerificationLevelInput } from '../../../../../types/index.ts'
import { VerificationDetails } from '../../projectDashboard/components/VerificationDetails.tsx'
import { SumSubVerification } from '../../projectDashboard/views/wallet/components/SumSubVerification.tsx'
import { useUserVerificationModal } from '../../projectDashboard/views/wallet/hooks/useUserVerificationModal.ts'
import { ProjectCreateLayout } from '../components/ProjectCreateLayout.tsx'
import { goToIdentityVerificationAtom, isReadyForLaunchAtom, whereToGoNextAtom } from '../states/nodeStatusAtom.ts'

export const ProjectCreationIdentityVerificationPage = () => {
  const { user } = useAuthContext()
  const isIdentityVerified = user.complianceDetails.verifiedDetails.identity?.verified

  const { startVerification, userVerificationModal, userVerificationToken, generateVerificationTokenLoading } =
    useUserVerificationModal()

  const setIsReadyForLaunch = useSetAtom(isReadyForLaunchAtom)
  const setGoToIdentityVerification = useSetAtom(goToIdentityVerificationAtom)
  const whereToGoNext = useSetAtom(whereToGoNextAtom)

  const handleBackClick = () => {
    setGoToIdentityVerification(false)
  }

  useEffect(() => {
    if (isIdentityVerified) {
      whereToGoNext()
    }
  }, [isIdentityVerified, whereToGoNext])

  return (
    <ProjectCreateLayout
      onBackClick={handleBackClick}
      continueButton={
        <Button flex={1} size="lg" variant="soft" colorScheme="neutral1" onClick={() => setIsReadyForLaunch(true)}>
          {t('Skip')}
        </Button>
      }
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
      {!userVerificationModal.isOpen ? (
        <VerificationDetails
          onLoading={generateVerificationTokenLoading}
          onContinue={() => startVerification(UserVerificationLevelInput.Level_3)}
        />
      ) : (
        <VStack w="full" paddingBottom="20px">
          <SumSubVerification
            accessToken={userVerificationToken?.token || ''}
            onComplete={() => setIsReadyForLaunch(true)}
            verificationLevel={userVerificationToken?.verificationLevel}
          />
        </VStack>
      )}
    </ProjectCreateLayout>
  )
}
