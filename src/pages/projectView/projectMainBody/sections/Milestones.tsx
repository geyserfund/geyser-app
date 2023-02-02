import { Text, VStack } from '@chakra-ui/react'

import { CardLayout } from '../../../../components/layouts'
import { ProjectSectionBar } from '../../../../components/molecules'
import { ID } from '../../../../constants'
import { useProjectContext } from '../../../../context'
import { MilestoneComponent } from '../components/MilestoneComponent'

export const Milestones = () => {
  const { project } = useProjectContext()

  const hasMilestones = project.milestones && project.milestones.length > 0
  const milestoneLength = project.milestones ? project.milestones.length : 0

  const renderMilestones = () => {
    if (project.milestones && project.milestones.length > 0) {
      return project.milestones.map((milestone) => {
        if (milestone) {
          return (
            <MilestoneComponent
              key={milestone.id}
              name={milestone.name}
              description={milestone.description}
              isReached={milestone.amount <= project.balance}
              amountRemaining={milestone.amount - project.balance}
            />
          )
        }
      })
    }

    return <Text>There are no milestones available.</Text>
  }

  if (!hasMilestones) {
    return null
  }

  return (
    <CardLayout
      id={ID.project.view.milestones}
      flexDirection="column"
      width="100%"
      alignItems="flex-start"
      spacing="25px"
    >
      <ProjectSectionBar name={'Milestones'} number={milestoneLength} />
      <VStack alignItems="flex-start">{renderMilestones()}</VStack>
    </CardLayout>
  )
}
