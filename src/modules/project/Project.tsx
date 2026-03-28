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
  const [searchParams, setSearchParams] = useSearchParams()
  const { user } = useAuthContext()

  const location = useLocation()

  useEffect(() => {
    if (user && user.heroId && !searchParams.get('hero')) {
      const nextSearchParams = new URLSearchParams(searchParams)
      nextSearchParams.set('hero', user.heroId)
      setSearchParams(nextSearchParams, { replace: true, state: location.state })
    }

    if (location.state?.sourceActivityId) {
      setSourceResource({
        resourceId: location.state.sourceActivityId,
        resourceType: FundingResourceType.Activity,
      })
    }
  }, [user, searchParams, setSearchParams, location.state, setSourceResource])

  return (
    <ProjectProvider projectName={projectName || ''} initializeWallet>
      <FundingProviderWithProjectContext>
        <ProjectLayout />
      </FundingProviderWithProjectContext>
    </ProjectProvider>
  )
}
