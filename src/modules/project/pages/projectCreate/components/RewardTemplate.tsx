import { Box, Image } from '@chakra-ui/react'

import { Body1, Caption } from '../../../../../components/typography'

interface RewardTemplateProps {
  reward: {
    title: string
    image: string
    category: 'Membership' | 'Gift' | 'Ticket' | 'Nostr Badge'
    description: string
  }
  onClick: () => void
}

export const RewardTemplate = ({ reward, onClick }: RewardTemplateProps) => {
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
      transition="transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
      _hover={{
        transform: 'scale(1.05)',
      }}
      onClick={onClick}
      cursor="pointer"
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
