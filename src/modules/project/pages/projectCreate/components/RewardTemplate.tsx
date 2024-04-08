import { Box, Image } from '@chakra-ui/react'

import { Body1 } from '../../../../../components/typography'

interface RewardTemplateProps {
  reward: {
    title: string
    image: string
    type: 'membership' | 'gift' | 'tickets' | 'nostr_badge'
  }
}

export const RewardTemplate = ({ reward }: RewardTemplateProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      borderRadius="8px"
      border="2px solid"
      borderColor="neutral.100"
      padding={2}
    >
      <Body1 fontSize="14px" color="neutral.500">
        {reward.title}
      </Body1>
      <Image width="140px" height="100px" src={reward.image} borderRadius="8px" />
    </Box>
  )
}
