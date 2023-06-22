import { Text, VStack } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { BiPencil } from 'react-icons/bi'

import { CardLayout } from '../../../../components/layouts'
import { IconButtonComponent } from '../../../../components/ui'
import { TitleDivider } from '../../../../components/ui/TitleDivider'
import { useProjectContext } from '../../../../context'
import { MilestoneComponent } from '../components/MilestoneComponent'

export const Milestones = forwardRef<HTMLDivElement>((_, ref) => {
  const { project, isProjectOwner, onMilestonesModalOpen } = useProjectContext()

  if (!project) {
    return null
  }

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

  if (!project.milestones.length) {
    return null
  }

  return (
    <>
      <CardLayout
        ref={ref}
        flexDirection="column"
        width="100%"
        alignItems="flex-start"
        spacing="25px"
      >
        <TitleDivider
          badge={project.milestones.length}
          rightAction={
            isProjectOwner && (
              <IconButtonComponent
                aria-label="edit-milestone"
                noBorder
                variant="ghost"
                onClick={onMilestonesModalOpen}
                icon={<BiPencil fontSize="16px" />}
              />
            )
          }
        >
          Milestones
        </TitleDivider>
        <VStack alignItems="flex-start" spacing="12px">
          {renderMilestones()}
        </VStack>
      </CardLayout>
    </>
  )
})
