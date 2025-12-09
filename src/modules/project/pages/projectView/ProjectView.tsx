import { Outlet, useLocation, useNavigate } from 'react-router'

import { getPath } from '@/shared/constants/index.ts'

import { useProjectAtom } from '../../hooks/useProjectAtom.ts'
import { GoalModal } from './components/GoalModal.tsx'
import { useLiveContributions } from './hooks/useLiveContributions'

export const ProjectView = () => {
  useLiveContributions()

  const { project } = useProjectAtom()
  const navigate = useNavigate()
  const location = useLocation()

  const onGoalCreated = () => {
    if (!location.pathname.includes('/dashboard/')) {
      navigate(getPath('projectGoals', project.name))
    }
  }

  return (
    <>
      <Outlet />
      <GoalModal onGoalCreated={onGoalCreated} />
    </>
  )
}
