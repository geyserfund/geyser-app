import { Box, Button, VStack } from '@chakra-ui/react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useAuthContext } from '@/context/auth.tsx'
import { useProjectWalletAPI } from '@/modules/project/API/useProjectWalletAPI'
import { useProjectAtom, useWalletAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

import TitleWithProgressBar from '../../../../../../components/molecules/TitleWithProgressBar.tsx'
import { getPath } from '../../../../../../shared/constants/index.ts'
import { CreateWalletInput } from '../../../../../../types/index.ts'
import { useNotification } from '../../../../../../utils/index.ts'
import { EnableFiatContributions } from '../../../projectDashboard/views/wallet/components/EnableFiatContributions.tsx'
import { ProjectCreationWalletConnectionForm } from '../../index.ts'
import { FormContinueButton } from '../../components/FormContinueButton.tsx'
import { ProjectCreateLayout } from '../../components/ProjectCreateLayout.tsx'
import { useLocationMandatoryRedirect } from '../../hooks/useLocationMandatoryRedirect.tsx'
import { useWalletForm } from '../../hooks/useWalletForm.tsx'
import {
  fiatContributionAtom,
  goToIdentityVerificationAtom,
  isReadyForLaunchAtom,
  whereToGoNextAtom,
} from '../../states/nodeStatusAtom.ts'
import { goToEmailVerificationAtom } from '../../states/nodeStatusAtom.ts'
import { ProjectCreationEmailVerificationPage } from './ProjectCreationEmailVerificationPage.tsx'
import { ProjectCreationIdentityVerificationPage } from './ProjectCreationIdentityVerificationPage.tsx'

export const ProjectCreationWalletConnectionPage = () => {
  const { t } = useTranslation()
  const toast = useNotification()

  const navigate = useNavigate()
  const params = useParams<{ projectId: string }>()

  const { user } = useAuthContext()

  const { project, loading } = useProjectAtom()
  const { wallet } = useWalletAtom()
  const { createWallet, updateWallet } = useProjectWalletAPI()

  useLocationMandatoryRedirect()

  const [fiatContributionEnabled, setFiatContributionEnabled] = useAtom(fiatContributionAtom)

  const [isReadyForLaunch, setReadyForLaunch] = useAtom(isReadyForLaunchAtom)
  const goToEmailVerification = useAtomValue(goToEmailVerificationAtom)
  const goToIdentityVerification = useAtomValue(goToIdentityVerificationAtom)

  const setWhereToGoNext = useSetAtom(whereToGoNextAtom)

  useEffect(() => {
    if (isReadyForLaunch) {
      navigate(getPath('launchProjectStrategy', project?.id))
    }
  }, [isReadyForLaunch, project?.id, navigate])

  const handleNext = (createWalletInput: CreateWalletInput | null) => {
    if (wallet?.id) {
      if (isFormDirty()) {
        updateWallet.execute({
          variables: { input: { ...createWalletInput, id: wallet.id } },
        })
      } else {
        setWhereToGoNext()
      }

      return
    }

    if (createWalletInput) {
      createWallet.execute({
        variables: { input: createWalletInput },
        onCompleted() {
          setWhereToGoNext()
        },
        onError() {
          toast.error({
            title: 'Error creating wallet',
          })
        },
      })
    }
  }

  const {
    handleConfirm,
    isFormDirty,
    connectionOption,
    lightningAddress,
    node,
    nwc,
    setConnectionOption,
    fee,
    limits,
    createWalletInput,
    isLightningAddressInValid,
  } = useWalletForm({
    onSubmit: handleNext,
  })

  const handleBackClick = () => {
    if (isReadyForLaunch) {
      setReadyForLaunch(false)
      return
    }

    if (params.projectId) {
      navigate(getPath('launchProjectRewards', params.projectId))
      return
    }

    navigate(-1)
  }

  if (goToEmailVerification) {
    return <ProjectCreationEmailVerificationPage />
  }

  if (goToIdentityVerification) {
    return <ProjectCreationIdentityVerificationPage />
  }

  const isContinueButtonLoading = lightningAddress.evaluating || loading || createWallet.loading

  const isWalletIncomplete = !createWalletInput

  const isContinueButtonDisabled = isWalletIncomplete || isLightningAddressInValid

  return (
    <ProjectCreateLayout
      onBackClick={handleBackClick}
      continueButton={
        isContinueButtonDisabled ? (
          <Button
            size="lg"
            variant="solid"
            colorScheme="neutral1"
            flexGrow={1}
            onClick={() => navigate(getPath('projectLaunchDraft', project?.name))}
          >
            {t('Save as Draft')}
          </Button>
        ) : (
          <FormContinueButton
            onClick={handleConfirm}
            isLoading={isContinueButtonLoading}
            isDisabled={isContinueButtonDisabled}
            flexGrow={1}
          />
        )
      }
      title={
        <TitleWithProgressBar title={t('Configure wallet')} subtitle={t('Create a project')} index={5} length={5} />
      }
    >
      <VStack w="full" alignItems="start" pb="20px">
        <Body size="lg" medium>
          {t('Lightning Address & Wallet')}
        </Body>
        <Box>
          <Body size="sm" medium light>
            <Trans
              i18nKey={
                'Your Geyser lightning address is <1>{{projectAddress}}</1>. All funds sent to this address will be instantly routed to the wallet you specify below.'
              }
              values={{ projectAddress: `${project?.name || ''}@geyser.fund` }}
            >
              {`Your Geyser lightning address is `}
              <Box as="span" color={'primary.600'}>{`{{projectAddress}}`}</Box>
              {`. All funds sent to this address will be instantly routed to the wallet you specify below.`}
            </Trans>
          </Body>
        </Box>
      </VStack>
      <ProjectCreationWalletConnectionForm
        {...{ connectionOption, lightningAddress, node, setConnectionOption, fee, limits, nwc }}
      />

      <VStack w="full" paddingTop="20px">
        <EnableFiatContributions
          paddingX={0}
          dense
          noborder
          disableImage
          isIdentityVerified={Boolean(user.complianceDetails.verifiedDetails.identity?.verified)}
          switchProps={{
            isChecked: fiatContributionEnabled,
            onChange: () => setFiatContributionEnabled(!fiatContributionEnabled),
          }}
        />
        <Feedback
          variant={FeedBackVariant.INFO}
          title={t('Identity verification')}
          text={t(
            'You will need to verify your identity with a government ID to enable fiat contributions. Toggle that functionality off if you do not wish to complete the verification.',
          )}
        />
      </VStack>
    </ProjectCreateLayout>
  )
}
