import { BottomNavBarContainer } from '@/modules/navigation/components/bottomNav'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'

import { ContributeButton } from './ContributeButton'
import { CreatorButtons } from './CreatorButtons'

export const BodySectionPageBottomBar = () => {
  const { isProjectOwner } = useProjectAtom()

  return (
    <BottomNavBarContainer>{isProjectOwner ? <CreatorButtons /> : <ContributeButton w="full" />}</BottomNavBarContainer>
  )
}
