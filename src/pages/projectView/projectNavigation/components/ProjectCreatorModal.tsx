import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import {
  EntryEditIcon,
  MilestoneIcon,
  RewardGiftIcon,
} from '../../../../components/icons'
import { CardLayout, CardLayoutProps } from '../../../../components/layouts'
import { Modal } from '../../../../components/layouts/Modal'
import { Body2, H3 } from '../../../../components/typography'
import { getPath, LearnAboutCrowdfundingUrl } from '../../../../constants'
import { useProjectContext } from '../../../../context'
import { UseModalReturn } from '../../../../hooks/useModal'

export const ProjectCreatorModal = (props: UseModalReturn) => {
  const { project, onRewardsModalOpen, onMilestonesModalOpen } =
    useProjectContext()
  return (
    <Modal {...props} title="Create content">
      <VStack spacing={4} alignItems="start">
        <CreationMenuItem
          as={Link}
          to={getPath('projectEntryCreation', project?.name)}
          icon={<EntryEditIcon />}
          title="Write an entry"
          description="Engage your community with articles about your project updates"
        />
        <CreationMenuItem
          icon={<RewardGiftIcon />}
          title="Sell anything"
          description="Sell your work, merch, art, sponsorships, badges, or services"
          onClick={() => {
            props.onClose()
            onRewardsModalOpen()
          }}
        />
        <CreationMenuItem
          icon={<MilestoneIcon fontSize="25px" />}
          title="Add goal"
          description="Setting milestones helps you reach your overall project goal"
          onClick={() => {
            props.onClose()
            onMilestonesModalOpen()
          }}
        />
        <Button
          as={Link}
          to={LearnAboutCrowdfundingUrl}
          variant="ghost"
          leftIcon={<BsBoxArrowUpRight />}
        >
          <Text variant="body1">Learn more about crowdfunding</Text>
        </Button>
      </VStack>
    </Modal>
  )
}

interface CreationMenuItemProps extends CardLayoutProps {
  icon: React.ReactNode
  title: string
  description: string
}

export const CreationMenuItem = ({
  icon,
  title,
  description,
  ...rest
}: CreationMenuItemProps) => {
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
