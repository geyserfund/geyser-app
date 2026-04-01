import { BottomNavBarContainer } from '@/modules/navigation/components/bottomNav'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ProjectMatchingPublicBadge } from '@/modules/project/matching/components/ProjectMatchingPublicBadge.tsx'

import { ContributeButton } from '../components/ContributeButton'

export const BodySectionPageBottomBar = () => {
  const { isProjectOwner, project } = useProjectAtom()

  // Don't show bottom bar for project owners - they have ControlPanel
  if (isProjectOwner) {
    return null
  }

  return (
    <BottomNavBarContainer direction="column" spacing={3} pt={0} pb={3}>
      {project.activeMatching && (
        <ProjectMatchingPublicBadge matching={project.activeMatching} showTooltip variant="mobileBottomBanner" />
      )}
      <ContributeButton w="full" />
    </BottomNavBarContainer>
  )
}
