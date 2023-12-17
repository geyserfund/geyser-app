import { Box, VStack } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import TitleWithProgressBar from '../../components/molecules/TitleWithProgressBar'
import { Body1, Body2 } from '../../components/typography'
import Loader from '../../components/ui/Loader'
import { getPath } from '../../constants'
import { useProjectByNameOrIdQuery } from '../../types'
import { toInt, useNotification } from '../../utils'
import { ProjectCreationWalletConnectionForm } from '.'
import { FormContinueButton } from './components/FormContinueButton'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'
import { ConnectionOption, useWalletForm } from './hooks/useWalletForm'
import { ProjectCreateCompletion } from './ProjectCreateCompletion'

export const ProjectCreationWalletConnectionPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = useParams<{ projectId: string }>()
  const { toast } = useNotification()

  const [isReadyForLaunch, setReadyForLaunch] = useState(false)

  const {
    loading: isGetProjectLoading,
    error: projectLoadingError,
    data: responseData,
  } = useProjectByNameOrIdQuery({
    variables: { where: { id: toInt(params.projectId) } },
    onError() {
      toast({
        title: 'Error fetching project',
        status: 'error',
      })
    },
  })

  const project = responseData?.projectGet || undefined

  const handleNext = async () => {
    setReadyForLaunch(true)
  }

  const {
    handleConfirm,
    isFormDirty,
    connectionOption,
    lightningAddress,
    node,
    setConnectionOption,
    createWalletInput,
    isLightningAddressInValid,
  } = useWalletForm({
    defaultConnectionOption: ConnectionOption.LIGHTNING_ADDRESS,
    project,
    onSubmit: handleNext,
  })

  const handleBackClick = () => {
    if (isReadyForLaunch) {
      setReadyForLaunch(false)
      return
    }

    if (params.projectId) {
      navigate(getPath('launchProjectStory', params.projectId))
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
  }, [
    connectionOption,
    lightningAddress.value,
    createWalletInput,
    isLightningAddressInValid,
  ])

  if (isGetProjectLoading) {
    return <Loader />
  }

  if (projectLoadingError || !responseData || !project) {
    return <Navigate to={getPath('notFound')} />
  }

  if (isReadyForLaunch) {
    return (
      <ProjectCreateCompletion
        project={project}
        createWalletInput={createWalletInput}
        isSubmitEnabled={isSubmitEnabled}
        setReadyToLaunch={setReadyForLaunch}
      />
    )
  }

  return (
    <ProjectCreateLayout
      onBackClick={handleBackClick}
      continueButton={
        <FormContinueButton
          onClick={handleConfirm}
          isLoading={lightningAddress.evaluating}
          isDisabled={!isFormDirty() || isLightningAddressInValid}
          flexGrow={1}
        />
      }
      title={
        <TitleWithProgressBar
          title={t('Connect wallet')}
          subtitle={t('Create a project')}
          index={4}
          length={4}
        />
      }
    >
      <VStack w="full" alignItems="start" pb="20px">
        <Body1 semiBold color="neutral.900">
          {t('Lightning Address')}
        </Body1>
        <Box>
          <Body2 color="neutral.600" semiBold>
            <Trans
              i18nKey={
                'Your Geyser lightning address is <1>{{projectAddress}}</1>. All funds sent to this address will be instantly routed to the wallet you specify below.'
              }
              values={{ projectAddress: `${project.name}@geyser.fund` }}
            >
              {`Your Geyser lightning address is `}
              <Box as="span" color={'primary.600'}>{`{{projectAddress}}`}</Box>
              {`. All funds sent to this address will be instantly routed to the wallet you specify below.`}
            </Trans>
          </Body2>
        </Box>
      </VStack>
      <ProjectCreationWalletConnectionForm
        {...{ connectionOption, lightningAddress, node, setConnectionOption }}
      />
    </ProjectCreateLayout>
  )
}
