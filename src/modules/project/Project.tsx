import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { useAuthContext } from '@/context/auth.tsx'

import { ProjectProvider } from './context'
import { FundingProviderWithProjectContext } from './context/FundingProvider'
import { addProjectAffiliateAtom } from './pages1/projectView/state/affiliateAtom'
import { addProjectHeroAtom, projectHeroAtom } from './pages1/projectView/state/heroAtom'
import { ProjectContainer } from './ProjectContainer'

export const Project = () => {
  const params = useParams<{ projectName: string }>()
  const { projectName } = params

  const { user } = useAuthContext()

  const [searchParams, setSearchParams] = useSearchParams()

  const addRefferal = useSetAtom(addProjectAffiliateAtom)
  const addHeroId = useSetAtom(addProjectHeroAtom)
  const projectHeroes = useAtomValue(projectHeroAtom)

  const currentProjectHero = projectHeroes.find((r) => r.projectName === projectName)

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
    if (heroId && projectName && !currentProjectHero) {
      addHeroId({
        projectName,
        heroId,
      })
    }

    if (user && user.heroId) {
      setSearchParams((params) => {
        params.set('hero', user.heroId)
        return params
      })
    }
  }, [projectName, heroId, addHeroId, currentProjectHero, user, searchParams, setSearchParams])

  return (
    <ProjectProvider projectName={projectName || ''} initializeWallet>
      <FundingProviderWithProjectContext>
        <ProjectContainer />
      </FundingProviderWithProjectContext>
    </ProjectProvider>
  )
}
