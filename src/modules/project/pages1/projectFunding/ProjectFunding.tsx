import { Outlet } from 'react-router-dom'

import { useProjectAtom } from '../../hooks/useProjectAtom'

export const ProjectFunding = () => {
  const { loading } = useProjectAtom()

  if (loading) {
    return null
  }

  return (
    <>
      <Outlet />
    </>
  )
}
