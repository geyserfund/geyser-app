import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { ProjectProvider } from '../../context'
import { FundingProviderWithProjectContext } from '../../context/FundingProvider'
import { ProjectContainer } from './ProjectContainer'
import { addRefferalAtom } from './state/affiliateAtom'
import { ProjectSideNavigation } from './views/projectNavigation/sideNav'

export const ProjectView = () => {
  const params = useParams<{ projectId: string }>()
  const [searchParams] = useSearchParams()
  const { projectId } = params

  const addRefferal = useSetAtom(addRefferalAtom)

  const affiliateId = searchParams.get('refId')

  useEffect(() => {
    if (affiliateId && projectId) {
      addRefferal({
        projectName: projectId,
        refId: affiliateId,
      })
    }
  }, [projectId, affiliateId, addRefferal])

  return (
    <ProjectProvider projectId={projectId || ''}>
      <FundingProviderWithProjectContext>
        <ProjectSideNavigation />
        <ProjectContainer />
      </FundingProviderWithProjectContext>
    </ProjectProvider>
  )
}

export default ProjectView
