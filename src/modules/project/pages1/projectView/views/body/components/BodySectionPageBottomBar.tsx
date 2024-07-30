import { BottomNavBarContainer } from '@/modules/navigation/bottomNav'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ContributeButton } from '@/modules/project/pages/projectView/views/projectActivityPanel/ContributeButton'

import { CreatorButtons } from './CreatorButtons'

export const BodySectionPageBottomBar = () => {
  const { isProjectOwner } = useProjectAtom()

  return (
    <BottomNavBarContainer>{isProjectOwner ? <CreatorButtons /> : <ContributeButton w="full" />}</BottomNavBarContainer>
  )
}
