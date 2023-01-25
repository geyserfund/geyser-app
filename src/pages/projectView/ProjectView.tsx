import { useQuery } from '@apollo/client'
import { Box } from '@chakra-ui/layout'
import { useNavigate, useParams } from 'react-router'

import Loader from '../../components/ui/Loader'
import { getPath } from '../../constants'
import { useAuthContext } from '../../context'
import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../graphql'
import { useFundingFlow } from '../../hooks'
import {
  Owner,
  Project,
  UniqueProjectQueryInput,
} from '../../types/generated/graphql'
import { useMobileMode } from '../../utils'
import { ProjectDetailsViewContainer } from './containers'

type ResponseData = {
  project: Project
}

type QueryVariables = {
  where: UniqueProjectQueryInput
}

export const ProjectView = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const isMobile = useMobileMode()

  const { setNav } = useAuthContext()

  const fundingFlow = useFundingFlow()

  const { loading, error, data } = useQuery<ResponseData, QueryVariables>(
    QUERY_PROJECT_BY_NAME_OR_ID,
    {
      variables: { where: { name: projectId } },
      fetchPolicy: 'network-only',

      onError() {
        navigate(getPath('notFound'))
      },

      onCompleted(data) {
        if (!data?.project) {
          navigate(getPath('notFound'))
          return
        }

        const { project } = data

        setNav({
          projectName: project.name,
          projectTitle: project.title,
          projectPath: getPath('project', project.name),
          projectOwnerIDs:
            project.owners.map((ownerInfo: Owner) => {
              return Number(ownerInfo.user.id || -1)
            }) || [],
        })
      },
    },
  )

  if (loading || error || !data) {
    return <Loader paddingTop="65px" />
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        overflow="hidden"
        position="relative"
        bg="brand.bgGrey4"
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <ProjectDetailsViewContainer
          {...{ project: data.project, fundingFlow }}
        />
      </Box>
    </Box>
  )
}
