import { Button, VStack } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { BiRocket } from 'react-icons/bi'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { Modal } from '../../components/layouts'
import TitleWithProgressBar from '../../components/molecules/TitleWithProgressBar'
import { Body1 } from '../../components/typography'
import Loader from '../../components/ui/Loader'
import { getPath } from '../../constants'
import { useAuthContext } from '../../context'
import { useModal } from '../../hooks'
import {
  CreateWalletInput,
  ProjectFragment,
  useCreateWalletMutation,
  useProjectByNameOrIdQuery,
  useProjectPublishMutation,
} from '../../types'
import { toInt, useNotification } from '../../utils'
import { ProjectCreateCompleted } from './components/ProjectCreateCompleted'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'

interface ProjectCreateCompletionProps {
  project?: ProjectFragment
  createWalletInput: CreateWalletInput | null
  isSubmitEnabled: boolean
  setReadyToLaunch: Dispatch<SetStateAction<boolean>>
}

export const ProjectCreateCompletion = ({
  project,
  createWalletInput,
  isSubmitEnabled,
  setReadyToLaunch,
}: ProjectCreateCompletionProps) => {
  const { t } = useTranslation()
  const { queryCurrentUser } = useAuthContext()

  const navigate = useNavigate()

  const params = useParams<{ projectId: string }>()
  const { toast } = useNotification()

  const confirmModal = useModal()

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

  const [publishProject, { loading: isUpdateStatusLoading }] = useProjectPublishMutation({
    onCompleted() {
      queryCurrentUser()
    },
  })

  const [createWallet, { loading: isCreateWalletLoading }] = useCreateWalletMutation()

  const handleBackClick = () => {
    setReadyToLaunch(false)
  }

  const handleLaunch = async () => {
    if (!createWalletInput) {
      toast({
        title: 'failed to create project wallet',
        description: 'please provide valid wallet details',
        status: 'error',
      })
      return
    }

    await createWallet({ variables: { input: createWalletInput } })
    await publishProject({
      variables: {
        input: { projectId: project?.id },
      },
    })
  }

  const onLaunchClick = async () => {
    try {
      await handleLaunch()
      navigate(getPath('projectLaunch', project?.name))
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `${error}`,
        status: 'error',
      })
    }
  }

  const onSaveDraftClick = async () => {
    if (!project) {
      return
    }

    navigate(getPath('projectLaunch', project.name, 'draft'))
  }

  const isLaunchLoading = isCreateWalletLoading || isUpdateStatusLoading

  if (isGetProjectLoading) {
    return <Loader />
  }

  if (projectLoadingError || !responseData || !responseData.projectGet) {
    return <Navigate to={getPath('notFound')} />
  }

  return (
    <>
      <ProjectCreateLayout
        onBackClick={handleBackClick}
        title={
          <TitleWithProgressBar
            hideSteps
            title={t('Launch project')}
            subtitle={t('You’re ready to launch!')}
            index={4}
            length={4}
          />
        }
      >
        <ProjectCreateCompleted>
          <VStack w="100%">
            {createWalletInput && (
              <Button
                variant="primary"
                w="full"
                leftIcon={<BiRocket />}
                onClick={confirmModal.onOpen}
                disabled={!isSubmitEnabled}
                isLoading={isLaunchLoading}
              >
                {t('Launch Project')}
              </Button>
            )}
            <Button variant="secondary" w="full" onClick={onSaveDraftClick}>
              {t('Save As Draft')}
            </Button>
          </VStack>
        </ProjectCreateCompleted>
      </ProjectCreateLayout>
      <Modal {...confirmModal} title={t('Confirm project launch')}>
        <VStack spacing="20px">
          <Body1 color="neutral.700">
            {t(
              'By launching your project the project will be visible to and searchable by the public. You will be able to disactivate your project but not to hide your project after launching it.',
            )}
          </Body1>
          <Button variant="primary" w="full" onClick={onLaunchClick} isLoading={isLaunchLoading}>
            {t('Confirm launch')}
          </Button>
        </VStack>
      </Modal>
    </>
  )
}
