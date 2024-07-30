import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { getPath } from '../../../../constants'
import { ProjectProvider } from '../../context'
import { FundingProviderWithProjectContext } from '../../context/FundingProvider'
import { ProjectContainer } from './ProjectContainer'
import { addProjectAffiliateAtom } from './state/affiliateAtom'
import { ProjectSideNavigation } from './views/projectNavigation/sideNav'

const ProjectIdsRedirects = [
  {
    from: 'wecollectdonationsforsacrificesofeidaladhapalestine',
    to: 'bitcoinforpalestine',
  },
]

export const ProjectView = () => {
  const params = useParams<{ projectId: string }>()
  const [searchParams] = useSearchParams()
  const { projectId } = params
  const navigate = useNavigate()

  const addRefferal = useSetAtom(addProjectAffiliateAtom)

  const affiliateId = searchParams.get('refId')

  useEffect(() => {
    const redirect = ProjectIdsRedirects.find((item) => item.from === projectId)
    if (redirect) {
      navigate(getPath('project', redirect.to))
    }
  }, [projectId, navigate])

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
