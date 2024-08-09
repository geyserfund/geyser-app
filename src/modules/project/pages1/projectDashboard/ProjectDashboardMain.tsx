import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getPath } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import { useProjectAtom } from '../../hooks/useProjectAtom'
import { DashboardMenuMobile } from './navigation'

export const ProjectDashboardMain = () => {
  const isMobile = useMobileMode()

  const { project } = useProjectAtom()

  const navigate = useNavigate()

  useEffect(() => {
    if (!isMobile && project) {
      navigate(getPath('dashboardAnalytics', project.name))
    }
  }, [isMobile, navigate, project])

  if (isMobile) {
    return <DashboardMenuMobile />
  }

  return null
}
