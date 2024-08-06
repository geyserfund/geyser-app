import { Outlet } from 'react-router-dom'

import { useFundingFormAtom } from '../../funding/hooks/useFundingFormAtom'
import { useProjectAtom } from '../../hooks/useProjectAtom'

export const ProjectFunding = () => {
  const { project } = useFundingFormAtom()

  if (!project || !project.name) {
    return null
  }

  return (
    <>
      <Outlet />
    </>
  )
}
