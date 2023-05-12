import { Text, useDisclosure, VStack } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { BiPencil } from 'react-icons/bi'

import { CardLayout } from '../../../../components/layouts'
import { ProjectSectionBar } from '../../../../components/molecules'
import { IconButtonComponent } from '../../../../components/ui'
import { useProjectContext } from '../../../../context'
import { Project, ProjectMilestone } from '../../../../types'
import { defaultMilestone, MilestoneAdditionModal } from '../components'
import { MilestoneComponent } from '../components/MilestoneComponent'

export const Milestones = forwardRef<
  HTMLDivElement,
  { milestonesLength: number }
>(({ milestonesLength }, ref) => {
  const { project, isProjectOwner, updateProject } = useProjectContext()

  const {
    isOpen: isMilestoneModalOpen,
    onClose: onMilestoneModalClose,
    onOpen: openMilestoneModal,
  } = useDisclosure()

  if (!project) {
    return null
  }

  const handleMilestoneSubmit = (newMilestones: ProjectMilestone[]) => {
    updateProject({ milestones: newMilestones } as Project)
    onMilestoneModalClose()
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

  if (!milestonesLength) {
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
        <ProjectSectionBar
          name={'Milestones'}
          number={milestonesLength}
          rightSection={
            isProjectOwner && (
              <IconButtonComponent
                aria-label="edit-milestone"
                noBorder
                variant="ghost"
                onClick={openMilestoneModal}
                icon={<BiPencil fontSize="16px" />}
              />
            )
          }
        />
        <VStack alignItems="flex-start" spacing="12px">
          {renderMilestones()}
        </VStack>
      </CardLayout>
      {isMilestoneModalOpen ? (
        <MilestoneAdditionModal
          isOpen={isMilestoneModalOpen}
          onClose={onMilestoneModalClose}
          availableMilestones={
            project?.milestones && project.milestones.length > 0
              ? (project.milestones as ProjectMilestone[])
              : [defaultMilestone]
          }
          onSubmit={handleMilestoneSubmit}
          projectId={parseInt(`${project.id}`, 10)}
        />
      ) : null}
    </>
  )
})
