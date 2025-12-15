import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { useUserAccountKeys } from '@/modules/auth/hooks/useUserAccountKeys.ts'
import { getPath } from '@/shared/constants/index.ts'
import { useProjectToolkit } from '@/shared/utils/hooks/useProjectToolKit.ts'

import { useProjectAtom } from '../../hooks/useProjectAtom.ts'
import { isFundingPaymentStartedRouteAtom } from './state/routesAtom.tsx'

export const ProjectFunding = () => {
  const { project } = useProjectAtom()
  const { isFundingDisabled } = useProjectToolkit(project)
  useUserAccountKeys()

  const isFundingPaymentStartedRoute = useAtomValue(isFundingPaymentStartedRouteAtom)

  const { user } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (isFundingPaymentStartedRoute) {
      navigate(getPath('fundingStart', project.name))
    }
  }, [user.id])

  useEffect(() => {
    if (project.id && isFundingDisabled()) {
      navigate(getPath('project', project.name))
    }
  }, [isFundingDisabled, project, navigate])

  if (!project || !project.name) {
    return null
  }

  return (
    <>
      <Outlet />
    </>
  )
}
