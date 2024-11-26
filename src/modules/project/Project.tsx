import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { ProjectProvider } from './context'
import { FundingProviderWithProjectContext } from './context/FundingProvider'
import { addProjectAffiliateAtom } from './pages1/projectView/state/affiliateAtom'
import { addProjectHeroAtom } from './pages1/projectView/state/heroAtom'
import { ProjectContainer } from './ProjectContainer'

export const Project = () => {
  const params = useParams<{ projectName: string }>()
  const { projectName } = params

  const [searchParams] = useSearchParams()

  const addRefferal = useSetAtom(addProjectAffiliateAtom)
  const addHeroId = useSetAtom(addProjectHeroAtom)

  const affiliateId = searchParams.get('refId')
  const heroId = searchParams.get('hero')

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
