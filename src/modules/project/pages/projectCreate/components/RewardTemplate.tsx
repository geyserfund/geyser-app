import { Box, Image } from '@chakra-ui/react'

import { Body1, Caption } from '../../../../../components/typography'

interface RewardTemplateProps {
  reward: {
    title: string
    image: string
    type: 'membership' | 'gift' | 'tickets' | 'nostr_badge'
    description: string
  }
}

export const RewardTemplate = ({ reward }: RewardTemplateProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      gap={2}
      borderRadius="8px"
      border="2px solid"
      borderColor="neutral.100"
      padding={2}
      width="100%"
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        width="100%"
        height="100%"
        alignItems={'center'}
        justifyContent={'flex-start'}
      >
        <Body1 fontSize="14px" color="neutral.500">
          {reward.title}
        </Body1>
        <Caption fontSize="10px" color="neutral.600" fontWeight="400">
          {reward.description}
        </Caption>
      </Box>

      <Image width="140px" height="100px" src={reward.image} borderRadius="8px" />
    </Box>
  )
}
