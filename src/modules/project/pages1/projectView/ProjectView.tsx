import { useParams } from 'react-router-dom'

// import { FundingProviderWithProjectContext } from '../../context/FundingProvider'
import { ProjectProvider } from '../../context/ProjectProvider'
import { ProjectContainer } from './ProjectContainer'

export const ProjectView = () => {
  const params = useParams<{ projectName: string }>()
  const { projectName } = params
  return (
    <ProjectProvider projectName={projectName || ''}>
      {/* <FundingProviderWithProjectContext> */}
      <ProjectContainer />
      {/* </FundingProviderWithProjectContext> */}
    </ProjectProvider>
  )
}

export default ProjectView
