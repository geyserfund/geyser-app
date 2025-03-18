import { Button, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { AlertDialogue } from '@/shared/molecules/AlertDialogue.tsx'

import TitleWithProgressBar from '../../../../../components/molecules/TitleWithProgressBar.tsx'
import { useAuthContext } from '../../../../../context/index.ts'
import { UserVerificationLevelInput } from '../../../../../types/index.ts'
import { VerificationDetails } from '../../projectDashboard/components/VerificationDetails.tsx'
import { SumSubVerification } from '../../projectDashboard/views/wallet/components/SumSubVerification.tsx'
import { useUserVerificationModal } from '../../projectDashboard/views/wallet/hooks/useUserVerificationModal.ts'
import { ProjectCreateLayout } from '../components/ProjectCreateLayout.tsx'
import { goToIdentityVerificationAtom, isReadyForLaunchAtom, whereToGoNextAtom } from '../states/nodeStatusAtom.ts'

export const ProjectCreationIdentityVerificationPage = () => {
  const { isOpen: isAlertDialogOpen, onOpen: onAlertDialogOpen, onClose: onAlertDialogClose } = useDisclosure()

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
    <>
      <ProjectCreateLayout
        onBackClick={handleBackClick}
        continueButton={
          <Button flex={1} size="lg" variant="soft" colorScheme="neutral1" onClick={onAlertDialogOpen}>
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
            onContinue={() => startVerification(UserVerificationLevelInput.Level_2)}
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
      <AlertDialogue
        isOpen={isAlertDialogOpen}
        onClose={onAlertDialogClose}
        title={t('Are you sure?')}
        description={t(
          'Skipping the verification will disable fiat contributions. Contributors will still be able to fund your project with Bitcoin.',
        )}
        hasCancel
        negativeButtonProps={{
          children: t('Skip'),
          onClick: () => setIsReadyForLaunch(true),
        }}
      />
    </>
  )
}
