import { useEffect } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'

import { useAuthContext } from '@/context/auth.tsx'
import { FundingResourceType } from '@/types/index.ts'

import { ProjectProvider } from './context'
import { FundingProviderWithProjectContext } from './context/FundingProvider'
import { ProjectContainer } from './ProjectContainer'

export const Project = () => {
  const params = useParams<{ projectName: string }>()

  const { projectName } = params

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
  }, [user, setSearchParams, location.state])

  return (
    <ProjectProvider projectName={projectName || ''} initializeWallet>
      <FundingProviderWithProjectContext>
        <ProjectContainer />
      </FundingProviderWithProjectContext>
    </ProjectProvider>
  )
}
