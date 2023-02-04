import { HStack, Stack } from '@chakra-ui/react'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'

import { EntryEditIcon, RewardGiftIcon } from '../../../../components/icons'
import { CardLayout, CardLayoutProps } from '../../../../components/layouts'
import { Body2, H3 } from '../../../../components/typography'
import { getPath } from '../../../../constants'

export const Creator = () => {
  const params = useParams<{ projectId: string }>()
  return (
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
        />
        <CreationCardItem
          icon={<BsBoxArrowUpRight />}
          title="Learn tips & tricks"
          description="Read about what makes crowdfunding projects successful"
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
