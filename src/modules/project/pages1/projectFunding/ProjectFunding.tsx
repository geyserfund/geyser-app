import { Outlet } from 'react-router-dom'

import { useFundingFormAtom } from '../../funding/hooks/useFundingFormAtom'

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
