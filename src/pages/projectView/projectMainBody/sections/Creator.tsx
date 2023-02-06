import { HStack, Stack, useDisclosure } from '@chakra-ui/react'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { RiFlag2Line } from 'react-icons/ri'
import { Link, useParams } from 'react-router-dom'

import { EntryEditIcon, RewardGiftIcon } from '../../../../components/icons'
import { CardLayout, CardLayoutProps } from '../../../../components/layouts'
import { Body2, H3 } from '../../../../components/typography'
import { getPath } from '../../../../constants'
import { useProjectContext } from '../../../../context'
import { Project, ProjectMilestone, ProjectReward } from '../../../../types'
import {
  defaultMilestone,
  MilestoneAdditionModal,
  RewardAdditionModal,
} from '../../../creation/projectCreate/components'

export const Creator = () => {
  const params = useParams<{ projectId: string }>()

  const { project, updateProject } = useProjectContext()

  const {
    isOpen: isRewardOpen,
    onClose: onRewardClose,
    onOpen: openReward,
  } = useDisclosure()

  const {
    isOpen: isMilestoneModalOpen,
    onClose: onMilestoneModalClose,
    onOpen: openMilestoneModal,
  } = useDisclosure()

  const handleRewardAdd = (addReward: ProjectReward) => {
    const newRewards = project.rewards as ProjectReward[]
    updateProject({ rewards: [...newRewards, addReward] } as Project)
  }

  const handleMilestoneSubmit = (newMilestones: ProjectMilestone[]) => {
    updateProject({ milestones: newMilestones } as Project)
    onMilestoneModalClose()
  }

  return (
    <>
      <CardLayout direction="column" spacing="20px">
        <H3>Create content</H3>
        <Stack
          height="100%"
          direction={{
            base: 'column',
            lg: 'row',
          }}
          spacing="20px"
        >
          <CreationCardItem
            as={Link}
            to={getPath('projectEntryCreation', `${params.projectId}`)}
            icon={<EntryEditIcon />}
            title="Write a blog"
            description="Engage your community with articles about your project updates"
          />
          <CreationCardItem
            icon={<RewardGiftIcon />}
            title="Sell an item or perk"
            description="Make it exciting and worthwhile for contributors to fund your
            project"
            onClick={openReward}
          />
          <CreationCardItem
            icon={<RiFlag2Line fontSize="22px" />}
            title="Edit Milestones"
            description="Clarify your next steps by keeping your milestones up to date"
            onClick={openMilestoneModal}
          />
        </Stack>
      </CardLayout>
      {isRewardOpen && (
        <RewardAdditionModal
          isOpen={isRewardOpen}
          onClose={onRewardClose}
          onSubmit={handleRewardAdd}
          isSatoshi={false}
          projectId={parseInt(`${project.id}`, 10)}
        />
      )}
      {isMilestoneModalOpen && (
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
      )}
    </>
  )
}

interface CreationCardItemProps extends CardLayoutProps {
  icon: React.ReactNode
  title: string
  description: string
}

export const CreationCardItem = ({
  icon,
  title,
  description,
  ...rest
}: CreationCardItemProps) => {
  return (
    <CardLayout hover height="100%" padding="12px" {...rest}>
      <HStack>
        {icon}
        <H3>{title}</H3>
      </HStack>
      <Body2>{description}</Body2>
    </CardLayout>
  )
}
