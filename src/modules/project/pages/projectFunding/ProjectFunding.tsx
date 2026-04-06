import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

import { useUserAccountKeys } from '@/modules/auth/hooks/useUserAccountKeys.ts'
import { useResetFundingFlow } from '@/modules/project/funding/hooks/useResetFundingFlow.ts'
import { getPath } from '@/shared/constants/index.ts'
import { useProjectToolkit } from '@/shared/utils/hooks/useProjectToolKit.ts'

import { useProjectAtom } from '../../hooks/useProjectAtom.ts'
import { useRecurringContributionRenewalBootstrap } from './hooks/useRecurringContributionRenewalBootstrap.ts'

export const ProjectFunding = () => {
  const { project } = useProjectAtom()
  const { isFundingDisabled } = useProjectToolkit(project)
  const resetFundingFlow = useResetFundingFlow()
  useUserAccountKeys()
  const { isRenewalBootstrapLoading } = useRecurringContributionRenewalBootstrap()

  const navigate = useNavigate()

  useEffect(() => {
    if (project.id && isFundingDisabled()) {
      navigate(getPath('project', project.name))
    }
  }, [isFundingDisabled, project, navigate])

  useEffect(() => {
    return () => {
      resetFundingFlow()
    }
  }, [resetFundingFlow])

  if (!project || !project.name) {
    return null
  }

  if (isRenewalBootstrapLoading) {
    return null
  }

  return (
    <>
      <Outlet />
    </>
  )
}
