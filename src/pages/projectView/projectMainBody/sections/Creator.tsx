import {
  HStack,
  Link as ChakraLink,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'

import { EntryEditIcon, RewardGiftIcon } from '../../../../components/icons'
import { MilestoneIcon } from '../../../../components/icons/svg'
import { CardLayout, CardLayoutProps } from '../../../../components/layouts'
import { Body2, H3 } from '../../../../components/typography'
import { ButtonComponent } from '../../../../components/ui'
import { getPath, LearnAboutCrowdfundingUrl } from '../../../../constants'
import { useProjectContext } from '../../../../context'
import {
  Project,
  ProjectMilestone,
  ProjectRewardForCreateUpdateFragment,
} from '../../../../types'
import {
  defaultMilestone,
  MilestoneAdditionModal,
  RewardAdditionModal,
} from '../components'

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

  if (!project) {
    return null
  }

  const handleRewardAdd = (addReward: ProjectRewardForCreateUpdateFragment) => {
    const newRewards = project.rewards || []
    updateProject({ rewards: [...newRewards, addReward] })
  }

  const handleMilestoneSubmit = (newMilestones: ProjectMilestone[]) => {
    updateProject({ milestones: newMilestones } as Project)
    onMilestoneModalClose()
  }

  return (
    <>
      <CardLayout direction="column" spacing="20px">
        <HStack width="100%" justifyContent="space-between">
          <H3>Create content</H3>
          <ButtonComponent
            isExternal
            as={ChakraLink}
            href={LearnAboutCrowdfundingUrl}
            variant="ghost"
            size={{ base: 'xs', lg: 'sm' }}
            noBorder
            leftIcon={<BsBoxArrowUpRight />}
            paddingX="0px"
          >
            <Text fontSize={{ base: '10px', lg: '12px' }}>
              Learn more about crowdfunding
            </Text>
          </ButtonComponent>
        </HStack>
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
            title="Write an entry"
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
            icon={<MilestoneIcon fontSize="25px" />}
            title="Add project goal"
            description="Setting milestones helps you reach your overall project goal"
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
          projectId={parseInt(project.id, 10)}
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
