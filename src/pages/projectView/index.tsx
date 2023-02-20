import { Box } from '@chakra-ui/layout'
import { useNavigate, useParams } from 'react-router'

import Loader from '../../components/ui/Loader'
import { getPath } from '../../constants'
import { useNavContext } from '../../context'
import { useFundingFlow } from '../../hooks'
import { useProjectState } from '../../hooks/graphqlState'
import { Owner } from '../../types/generated/graphql'
import { useMobileMode } from '../../utils'
import { ProjectContainer } from './ProjectContainer'

export const ProjectView = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const isMobile = useMobileMode()

  const { setNavData } = useNavContext()

  const fundingFlow = useFundingFlow()

  const { loading, project, updateProject } = useProjectState(projectId || '', {
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

      setNavData({
        projectName: project.name,
        projectTitle: project.title,
        projectPath: getPath('project', project.name),
        projectOwnerIDs:
          project.owners.map((ownerInfo: Owner) => {
            return Number(ownerInfo.user.id || -1)
          }) || [],
      })
    },
  })

  if (loading || !project.id) {
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
        <ProjectContainer {...{ project, fundingFlow, updateProject }} />
      </Box>
    </Box>
  )
}
