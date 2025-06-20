import { Button, VStack } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { PiRocketLaunch } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

import Loader from '@/components/ui/Loader'
import { useProjectAPI } from '@/modules/project/API/useProjectAPI'
import { ProjectPreLaunchConfirmModal } from '@/modules/project/components/ProjectPreLaunchConfirmModal.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { useProjectPreLaunchMutation } from '@/types/index.ts'

import TitleWithProgressBar from '../../../../../../components/molecules/TitleWithProgressBar.tsx'
import { useAuthContext } from '../../../../../../context/index.ts'
import { getPath } from '../../../../../../shared/constants/index.ts'
import { useModal } from '../../../../../../shared/hooks/index.ts'
import { isDraft, useNotification } from '../../../../../../utils/index.ts'
import { ProjectLaunchConfirmModal } from '../../../../components/ProjectLaunchConfirmModal.tsx'
import { ProjectCreateCompleted } from '../../components/ProjectCreateCompleted.tsx'
import { ProjectCreateLayout } from '../../components/ProjectCreateLayout.tsx'
import { ProjectCreationStrategy } from './ProjectCreationStrategy.tsx'

interface ProjectCreateCompletionPageProps {
  strategy: ProjectCreationStrategy
  setStrategySelected: Dispatch<SetStateAction<boolean>>
}

export const ProjectCreateCompletionPage = ({ strategy, setStrategySelected }: ProjectCreateCompletionPageProps) => {
  const { t } = useTranslation()
  const { queryCurrentUser } = useAuthContext()

  const navigate = useNavigate()

  const toast = useNotification()

  const confirmModal = useModal()
  const prelaunchConfirmModal = useModal()
  const { project, loading } = useProjectAtom()

  const { publishProject } = useProjectAPI()

  const [projectPreLaunch, { loading: prelaunchProjectLoading }] = useProjectPreLaunchMutation({
    variables: {
      input: {
        projectId: project?.id,
      },
    },
    onCompleted() {
      queryCurrentUser()
      navigate(getPath('projectLaunchPreLaunch', project?.name))
    },
    onError(error) {
      toast.error({
        title: t('Failed to pre-launch project'),
        description: error.message,
      })
    },
  })

  const handleBackClick = () => {
    if (project.paidLaunch) {
      navigate(-1)
      return
    }

    setStrategySelected(false)
  }

  const onLaunchClick = async () => {
    if (!project) {
      return
    }

    publishProject.execute({
      variables: {
        input: { projectId: project?.id },
      },
      onCompleted() {
        toast.success({
          title: 'Project launched',
        })
        queryCurrentUser()
        navigate(getPath('projectLaunch', project?.name))
      },
      onError(error) {
        toast.error({
          title: 'Error launching project',
          description: `${error}`,
        })
      },
    })
  }

  const onPreLaunchClick = async () => {
    if (!project) {
      return
    }

    projectPreLaunch()
  }

  const handleLaunchButtonClick = () => {
    if (project.paidLaunch) {
      confirmModal.onOpen()
    } else {
      prelaunchConfirmModal.onOpen()
    }
  }

  const onSaveDraftClick = async () => {
    if (!project) {
      return
    }

    navigate(`${getPath('projectLaunchDraft', project.name)}`)
  }

  if (loading) {
    return <Loader />
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
            <Button
              variant="solid"
              colorScheme="primary1"
              w="full"
              leftIcon={<PiRocketLaunch />}
              onClick={handleLaunchButtonClick}
              isLoading={publishProject.loading || prelaunchProjectLoading}
            >
              {t('Launch Project')}
            </Button>

            {isDraft(project?.status) && (
              <Button variant="outline" colorScheme="neutral1" w="full" onClick={onSaveDraftClick}>
                {t('Save As Draft')}
              </Button>
            )}
          </VStack>
        </ProjectCreateCompleted>
      </ProjectCreateLayout>
      <ProjectLaunchConfirmModal isLoading={publishProject.loading} onLaunchClick={onLaunchClick} {...confirmModal} />
      <ProjectPreLaunchConfirmModal
        isLoading={prelaunchProjectLoading}
        onLaunchClick={onPreLaunchClick}
        {...prelaunchConfirmModal}
      />
    </>
  )
}
