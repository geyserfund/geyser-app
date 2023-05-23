import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'

import TitleWithProgressBar from '../../components/molecules/TitleWithProgressBar'
import Loader from '../../components/ui/Loader'
import { getPath } from '../../constants'
import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../graphql'
import { Project, UniqueProjectQueryInput } from '../../types/generated/graphql'
import { toInt, useNotification } from '../../utils'
import { ProjectCreationWalletConnectionForm } from '.'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'

type ResponseDataForGetProject = {
  project: Project
}

type QueryVariablesForGetProject = {
  where: UniqueProjectQueryInput
}

export const ProjectCreationWalletConnectionPage = () => {
  const navigate = useNavigate()

  const params = useParams<{ projectId: string }>()
  const { toast } = useNotification()

  const [isReadyForLaunch, setReadyForLaunch] = useState(false)

  const {
    loading: isGetProjectLoading,
    error: projectLoadingError,
    data: responseData,
  } = useQuery<ResponseDataForGetProject, QueryVariablesForGetProject>(
    QUERY_PROJECT_BY_NAME_OR_ID,
    {
      variables: { where: { id: toInt(params.projectId) } },
      onError() {
        toast({
          title: 'Error fetching project',
          status: 'error',
        })
      },
    },
  )

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

  if (projectLoadingError || !responseData || !responseData.project) {
    return <Navigate to={getPath('notFound')} />
  }

  return (
    <ProjectCreateLayout
      onBackClick={handleBackClick}
      title={
        <TitleWithProgressBar
          hideSteps={isReadyForLaunch}
          title={isReadyForLaunch ? 'Launch project' : 'Connect wallet'}
          subtitle={
            isReadyForLaunch ? 'You’re ready to launch!' : 'Create a project'
          }
          index={4}
          length={4}
        />
      }
    >
      <ProjectCreationWalletConnectionForm
        isReadyForLaunch={isReadyForLaunch}
        setReadyForLaunch={setReadyForLaunch}
        project={responseData.project}
      />
    </ProjectCreateLayout>
  )
}
