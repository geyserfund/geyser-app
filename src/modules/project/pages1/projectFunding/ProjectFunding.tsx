import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useAuthContext } from '@/context/auth.tsx'
import { getPath } from '@/shared/constants/index.ts'

import { useFundingFormAtom } from '../../funding/hooks/useFundingFormAtom'
import { isFundingPaymentStartedRouteAtom } from './state/routesAtom.tsx'

export const ProjectFunding = () => {
  const { project } = useFundingFormAtom()

  const isFundingPaymentStartedRoute = useAtomValue(isFundingPaymentStartedRouteAtom)

  const { user } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (isFundingPaymentStartedRoute) {
      navigate(getPath('fundingStart', project.name))
    }
  }, [user.id])

  if (!project || !project.name) {
    return null
  }

  return (
    <>
      <Outlet />
    </>
  )
}
