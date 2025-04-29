import { Box, VStack } from '@chakra-ui/react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useAuthContext } from '@/context/auth.tsx'
import { useProjectWalletAPI } from '@/modules/project/API/useProjectWalletAPI'
import { useProjectAtom, useWalletAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'

import TitleWithProgressBar from '../../../../../components/molecules/TitleWithProgressBar'
import { getPath } from '../../../../../shared/constants'
import { CreateWalletInput } from '../../../../../types'
import { useNotification } from '../../../../../utils'
import { EnableFiatContributions } from '../../projectDashboard/views/wallet/components/EnableFiatContributions.tsx'
import { ProjectCreationWalletConnectionForm } from '..'
import { FormContinueButton } from '../components/FormContinueButton'
import { ProjectCreateLayout } from '../components/ProjectCreateLayout'
import { useCheckPrelaunchSteps } from '../hooks/useCheckPrelaunchSteps.tsx'
import { useLocationMandatoryRedirect } from '../hooks/useLocationMandatoryRedirect'
import { ConnectionOption, useWalletForm } from '../hooks/useWalletForm'
import {
  fiatContributionAtom,
  goToIdentityVerificationAtom,
  isReadyForLaunchAtom,
  whereToGoNextAtom,
} from '../states/nodeStatusAtom.ts'
import { goToEmailVerificationAtom } from '../states/nodeStatusAtom.ts'
import { ProjectCreateCompletionPage } from './ProjectCreateCompletionPage'
import { ProjectCreationEmailVerificationPage } from './ProjectCreationEmailVerificationPage.tsx'
import { ProjectCreationIdentityVerificationPage } from './ProjectCreationIdentityVerificationPage.tsx'

export const ProjectCreationWalletConnectionPage = () => {
  const { t } = useTranslation()
  const toast = useNotification()

  useCheckPrelaunchSteps()

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

  const isSubmitEnabled = useMemo(() => {
    if (createWalletInput === null) {
      return false
    }

    return (
      connectionOption === ConnectionOption.PERSONAL_NODE ||
      (connectionOption === ConnectionOption.LIGHTNING_ADDRESS &&
        Boolean(lightningAddress.value) &&
        !isLightningAddressInValid)
    )
  }, [connectionOption, lightningAddress.value, createWalletInput, isLightningAddressInValid])

  if (isReadyForLaunch) {
    return (
      <ProjectCreateCompletionPage
        project={project}
        createWalletInput={createWalletInput}
        isSubmitEnabled={isSubmitEnabled}
        setReadyToLaunch={setReadyForLaunch}
      />
    )
  }

  if (goToEmailVerification) {
    return <ProjectCreationEmailVerificationPage />
  }

  if (goToIdentityVerification) {
    return <ProjectCreationIdentityVerificationPage />
  }

  const isContinueButtonLoading = lightningAddress.evaluating || loading || createWallet.loading

  const isWalletIncomplete = !createWalletInput

  return (
    <ProjectCreateLayout
      onBackClick={handleBackClick}
      continueButton={
        <FormContinueButton
          onClick={handleConfirm}
          isLoading={isContinueButtonLoading}
          isDisabled={isWalletIncomplete || isLightningAddressInValid}
          flexGrow={1}
        />
      }
      title={
        <TitleWithProgressBar
          hideSteps
          title={t('Configure wallet')}
          subtitle={t('You’re almost ready to launch!')}
          index={5}
          length={5}
        />
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
