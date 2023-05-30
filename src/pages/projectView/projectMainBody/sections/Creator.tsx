import { HStack, Link as ChakraLink, Stack, Text } from '@chakra-ui/react'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'

import { EntryEditIcon, RewardGiftIcon } from '../../../../components/icons'
import { MilestoneIcon } from '../../../../components/icons/svg'
import { CardLayout, CardLayoutProps } from '../../../../components/layouts'
import { Body2, H3 } from '../../../../components/typography'
import { ButtonComponent } from '../../../../components/ui'
import { getPath, LearnAboutCrowdfundingUrl } from '../../../../constants'
import { useProjectContext } from '../../../../context'

export const Creator = () => {
  const params = useParams<{ projectId: string }>()

  const { project, onMilestonesModalOpen, onRewardsModalOpen } =
    useProjectContext()

  if (!project) {
    return null
  }

  return (
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
          onClick={() => onRewardsModalOpen()}
        />
        <CreationCardItem
          icon={<MilestoneIcon fontSize="25px" />}
          title="Add project goal"
          description="Setting milestones helps you reach your overall project goal"
          onClick={onMilestonesModalOpen}
        />
      </Stack>
    </CardLayout>
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
