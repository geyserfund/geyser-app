import { BottomNavBarContainer } from '@/modules/navigation/components/bottomNav'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'

import { ContributeButton } from '../components/ContributeButton'
import { CreatorButtons } from './creatorTools/components/CreatorButtons'

export const BodySectionPageBottomBar = () => {
  const { isProjectOwner } = useProjectAtom()

  return (
    <BottomNavBarContainer>{isProjectOwner ? <CreatorButtons /> : <ContributeButton w="full" />}</BottomNavBarContainer>
  )
}
