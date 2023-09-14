import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate, useParams } from 'react-router'

import TitleWithProgressBar from '../../components/molecules/TitleWithProgressBar'
import Loader from '../../components/ui/Loader'
import { getPath } from '../../constants'
import { useProjectByNameOrIdQuery } from '../../types'
import { toInt, useNotification } from '../../utils'
import { ProjectCreationWalletConnectionForm } from '.'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'

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

  if (isGetProjectLoading) {
    return <Loader />
  }

  if (projectLoadingError || !responseData || !responseData.projectGet) {
    return <Navigate to={getPath('notFound')} />
  }

  return (
    <ProjectCreateLayout
      onBackClick={handleBackClick}
      title={
        <TitleWithProgressBar
          hideSteps={isReadyForLaunch}
          title={isReadyForLaunch ? t('Launch project') : t('Connect wallet')}
          subtitle={
            isReadyForLaunch
              ? t('You’re ready to launch!')
              : t('Create a project')
          }
          index={4}
          length={4}
        />
      }
    >
      <ProjectCreationWalletConnectionForm
        isReadyForLaunch={isReadyForLaunch}
        setReadyForLaunch={setReadyForLaunch}
        project={responseData.projectGet}
      />
    </ProjectCreateLayout>
  )
}
