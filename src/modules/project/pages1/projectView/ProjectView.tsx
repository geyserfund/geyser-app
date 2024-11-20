import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { getPath } from '@/shared/constants'

import { FundingProviderWithProjectContext } from '../../context/FundingProvider'
import { ProjectProvider } from '../../context/ProjectProvider'
import { ProjectContainer } from './ProjectContainer'
import { addProjectAffiliateAtom } from './state/affiliateAtom'
import { addProjectHeroAtom } from './state/heroAtom'

const ProjectIdsRedirects = [
  {
    from: 'wecollectdonationsforsacrificesofeidaladhapalestine',
    to: 'bitcoinforpalestine',
  },
]

export const ProjectView = () => {
  const params = useParams<{ projectName: string }>()
  const { projectName } = params

  const [searchParams] = useSearchParams()

  const navigate = useNavigate()

  const addRefferal = useSetAtom(addProjectAffiliateAtom)
  const addHeroId = useSetAtom(addProjectHeroAtom)

  const affiliateId = searchParams.get('refId')
  const heroId = searchParams.get('hero')

  useEffect(() => {
    const redirect = ProjectIdsRedirects.find((item) => item.from === projectName)
    if (redirect) {
      navigate(getPath('project', redirect.to))
    }
  }, [projectName, navigate])

  useEffect(() => {
    if (affiliateId && projectName) {
      addRefferal({
        projectName,
        refId: affiliateId,
      })
    }
  }, [projectName, affiliateId, addRefferal])

  useEffect(() => {
    if (heroId && projectName) {
      addHeroId({
        projectName,
        heroId,
      })
    }
  }, [projectName, heroId, addHeroId])

  return (
    <ProjectProvider projectName={projectName || ''} initializeWallet>
      <FundingProviderWithProjectContext>
        <ProjectContainer />
      </FundingProviderWithProjectContext>
    </ProjectProvider>
  )
}
