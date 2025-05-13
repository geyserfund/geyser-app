import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getPath } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import { useProjectAtom } from '../../hooks/useProjectAtom'
import { DashboardMenuMobile } from './navigation'

export const ProjectDashboardMain = () => {
  const isMobile = useMobileMode()

  const { project, loading } = useProjectAtom()

  const navigate = useNavigate()

  useEffect(() => {
    if (!isMobile && project && !loading) {
      navigate(getPath('dashboardAnalytics', project.name))
    }
  }, [isMobile, navigate, project, loading])

  if (isMobile) {
    return <DashboardMenuMobile />
  }

  return null
}
