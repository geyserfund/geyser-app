import { HStack, Stack } from '@chakra-ui/react'
import { BsBoxArrowUpRight } from 'react-icons/bs'

import { EntryEditIcon, RewardGiftIcon } from '../../../../components/icons'
import { CardLayout } from '../../../../components/layouts'
import { Body2, H3 } from '../../../../components/typography'

export const Creator = () => {
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

export const CreationCardItem = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) => {
  return (
    <CardLayout click hover height="100%" padding="12px">
      <HStack>
        {icon}
        <H3>{title}</H3>
      </HStack>
      <Body2>{description}</Body2>
    </CardLayout>
  )
}
