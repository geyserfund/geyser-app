import { Button, VStack } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { BiRocket } from 'react-icons/bi'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import TitleWithProgressBar from '../../../../../components/molecules/TitleWithProgressBar'
import Loader from '../../../../../components/ui/Loader'
import { getPath } from '../../../../../constants'
import { useAuthContext } from '../../../../../context'
import { useModal } from '../../../../../hooks'
import {
  CreateWalletInput,
  ProjectFragment,
  useProjectByNameOrIdQuery,
  useProjectPublishMutation,
} from '../../../../../types'
import { toInt, useNotification } from '../../../../../utils'
import { ProjectLaunchConfirmModal } from '../../../components/ProjectLaunchConfirmModal'
import { ProjectCreateCompleted } from '../components/ProjectCreateCompleted'
import { ProjectCreateLayout } from '../components/ProjectCreateLayout'

interface ProjectCreateCompletionPageProps {
  project?: ProjectFragment
  createWalletInput: CreateWalletInput | null
  isSubmitEnabled: boolean
  setReadyToLaunch: Dispatch<SetStateAction<boolean>>
}

export const ProjectCreateCompletionPage = ({
  project,
  createWalletInput,
  isSubmitEnabled,
  setReadyToLaunch,
}: ProjectCreateCompletionPageProps) => {
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

  const handleBackClick = () => {
    setReadyToLaunch(false)
  }

  const handleLaunch = async () => {
    await publishProject({
      variables: {
        input: { projectId: project?.id },
      },
    })
  }

  const onLaunchClick = async () => {
    if (!project) {
      return
    }

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

    navigate(`${getPath('projectDraft', project.name)}/?draft`)
  }

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
                isLoading={isUpdateStatusLoading}
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
      <ProjectLaunchConfirmModal isLoading={isUpdateStatusLoading} onLaunchClick={onLaunchClick} {...confirmModal} />
    </>
  )
}
