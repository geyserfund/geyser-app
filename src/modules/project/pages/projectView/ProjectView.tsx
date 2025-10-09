import { Outlet } from 'react-router'

import { useLiveContributions } from './hooks/useLiveContributions'

export const ProjectView = () => {
  useLiveContributions()
  return <Outlet />
}
