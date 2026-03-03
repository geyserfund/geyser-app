import { BottomNavBarContainer } from '@/modules/navigation/components/bottomNav'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'

import { ContributeButton } from '../components/ContributeButton'

export const BodySectionPageBottomBar = () => {
  const { isProjectOwner } = useProjectAtom()

  // Don't show bottom bar for project owners - they have ControlPanel
  if (isProjectOwner) {
    return null
  }

  return (
    <BottomNavBarContainer>
      <ContributeButton w="full" />
    </BottomNavBarContainer>
  )
}
