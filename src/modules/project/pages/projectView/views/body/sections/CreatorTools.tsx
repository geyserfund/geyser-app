import { useLocation } from 'react-router'

import { CardLayout } from '@/shared/components/layouts/CardLayout'

import { ProjectStatus } from '../../../../../../../types'
import { useProjectAtom } from '../../../../../hooks/useProjectAtom'
import { CreatorButtons } from '../components/CreatorButtons'

export const CreatorTools = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const location = useLocation()
  const isDraftUrl = location.pathname.includes('/draft')

  if (
    !isProjectOwner ||
    isDraftUrl ||
    (project.status && [ProjectStatus.Closed, ProjectStatus.Deleted].includes(project.status))
  )
    return null

  return (
    <CardLayout
      display={{ base: 'none', lg: 'flex' }}
      w="full"
      direction="row"
      flexWrap="wrap"
      backgroundColor="neutral.1"
      spacing={4}
    >
      <CreatorButtons />
    </CardLayout>
  )
}
