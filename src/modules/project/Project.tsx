import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { FundingResourceType } from '@/types/index.ts'

import { FundingProviderWithProjectContext } from './context/FundingProvider.tsx'
import { ProjectProvider } from './context/ProjectProvider.tsx'
import { ProjectLayout } from './layouts/ProjectLayout.tsx'
import { sourceResourceAtom } from './pages/projectView/state/sourceActivityAtom.ts'

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
        <ProjectLayout />
      </FundingProviderWithProjectContext>
    </ProjectProvider>
  )
}
