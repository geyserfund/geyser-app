import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { useAuthContext } from '@/context/auth.tsx'

import { ProjectProvider } from './context'
import { FundingProviderWithProjectContext } from './context/FundingProvider'
import { addProjectHeroAtom, projectHeroAtom } from './pages1/projectView/state/heroAtom'
import { ProjectContainer } from './ProjectContainer'

export const Project = () => {
  const params = useParams<{ projectName: string }>()
  const { projectName } = params

  const { user } = useAuthContext()

  const [searchParams, setSearchParams] = useSearchParams()

  const addHeroId = useSetAtom(addProjectHeroAtom)
  const projectHeroes = useAtomValue(projectHeroAtom)

  const currentProjectHero = projectHeroes.find((r) => r.projectName === projectName)

  const heroId = searchParams.get('hero')

  useEffect(() => {
    if (heroId && projectName && !currentProjectHero) {
      addHeroId({
        projectName,
        heroId,
      })

      setSearchParams(
        (params) => {
          params.delete('hero')
          return params
        },
        { replace: true },
      )
    }

    if (user && user.heroId) {
      setSearchParams(
        (params) => {
          params.set('hero', user.heroId)
          return params
        },
        { replace: true },
      )
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
