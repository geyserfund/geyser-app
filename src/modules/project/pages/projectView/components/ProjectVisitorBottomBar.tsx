import { BottomNavBarContainer } from '@/modules/navigation/components/bottomNav'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ProjectNavigation } from '@/modules/project/navigation/ProjectNavigation.tsx'
import { ContributeButton } from '@/modules/project/pages/projectView/views/body/components/ContributeButton.tsx'

export const ProjectVisitorBottomBar = () => {
  const { isProjectOwner } = useProjectAtom()

  if (isProjectOwner) {
    return null
  }

  return (
    <BottomNavBarContainer direction="column" paddingBottom={2}>
      <ContributeButton w="full" />
      <ProjectNavigation inBottomBar />
    </BottomNavBarContainer>
  )
}
