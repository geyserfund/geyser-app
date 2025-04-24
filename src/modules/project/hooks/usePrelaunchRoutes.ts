import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { isProjectRoutesNotAllowedForPrelaunchProjectsAtom } from '@/modules/navigation/platformNavBar/platformNavBarAtom.ts'
import { getPath } from '@/shared/constants/config/routerPaths.ts'
import { ProjectStatus } from '@/types/index.ts'

import { useProjectAtom } from './useProjectAtom.ts'

export const usePrelaunchRoutes = () => {
  const { project } = useProjectAtom()
  const navigate = useNavigate()

  const isPrelaunch = project?.status === ProjectStatus.PreLaunch

  const isNotAllowedForPrelaunch = useAtomValue(isProjectRoutesNotAllowedForPrelaunchProjectsAtom)

  useEffect(() => {
    if (isNotAllowedForPrelaunch && isPrelaunch) {
      navigate(getPath('projectPreLaunch', project?.name))
    }
  }, [isNotAllowedForPrelaunch, isPrelaunch, navigate, project?.name])
}
