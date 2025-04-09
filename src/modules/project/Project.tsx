import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'

import { useAuthContext } from '@/context/auth.tsx'
import { FundingResourceType } from '@/types/index.ts'

import { ProjectProvider } from './context'
import { FundingProviderWithProjectContext } from './context/FundingProvider'
import { sourceResourceAtom } from './pages1/projectView/state/sourceActivityAtom.ts'
import { ProjectContainer } from './ProjectContainer'

export const Project = () => {
  const params = useParams<{ projectName: string }>()

  const { projectName } = params
  const setSourceResource = useSetAtom(sourceResourceAtom)
  const [, setSearchParams] = useSearchParams()
  const { user } = useAuthContext()

  const location = useLocation()

  useEffect(() => {
    if (user && user.heroId) {
      setSearchParams(
        (params) => {
          params.set('hero', user.heroId)
          return params
        },
        { replace: true, state: location.state },
      )
    }

    if (location.state?.sourceActivityId) {
      setSourceResource({
        resourceId: location.state.sourceActivityId,
        resourceType: FundingResourceType.Activity,
      })
    }
  }, [user, setSearchParams, location.state, setSourceResource])

  return (
    <ProjectProvider projectName={projectName || ''} initializeWallet>
      <FundingProviderWithProjectContext>
        <ProjectContainer />
      </FundingProviderWithProjectContext>
    </ProjectProvider>
  )
}
