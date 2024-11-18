import { Box, Center, Image, Text, VStack } from '@chakra-ui/react'

import { HeroCardLayout } from '@/assets'

import { UserHeroStats } from '../../../../../../../types'
import { getShortAmountLabel } from '../../../../../../../utils'

export const HeroCard = ({ user, stats }: { user: any; stats: UserHeroStats }) => {
  return (
    <Box
      w="310px"
      h="398px"
      p={3}
      position="relative"
      backgroundImage={`url(${HeroCardLayout})`}
      backgroundSize="contain"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      color="blackAlpha.800"
    >
      <VStack>
        <Text
          as="span"
          position="absolute"
          left="50%"
          transform="translateX(-50%) translateY(-45%)"
          backgroundColor="transparent"
          color="neutral1.11"
          paddingX="2"
          fontSize="xs"
        >
          Block: 800,345
        </Text>
        <Center flexDirection="column" mb={3} mt={6}>
          {/* User info */}
          <Box w="64px" h="64px" borderRadius="full" overflow="hidden" mb={3}>
            <Image
              src={user?.avatar}
              fallbackSrc="https://via.placeholder.com/80"
              alt="Profile"
              w="100%"
              h="100%"
              objectFit="cover"
            />
          </Box>
          <Text fontSize="2xl" fontWeight="bold">
            {user?.username || 'Anonymous Hero'}
          </Text>
        </Center>
      </VStack>

      {/* Stats */}
      <VStack spacing={4} align="stretch" alignItems="center" alignContent="center">
        <Box>
          <Text fontSize="md">
            Enabled: {getShortAmountLabel(stats.ambassadorStats.contributionsTotal)} sats
            {/* ($
            {getShortAmountLabel(stats.ambassadorStats.contributionsTotalUsd)}) */}
          </Text>
          <Text fontSize="sm" color="blackAlpha.700">
            For {stats.ambassadorStats.projectsCount || 6} projects • Ranked {stats.ambassadorStats.rank}
          </Text>
        </Box>

        <Box>
          <Text fontSize="md">
            Raised: {getShortAmountLabel(stats.creatorStats.contributionsTotal)} sats
            {/* ($
            {getShortAmountLabel(stats.creatorStats.contributionsTotalUsd)}) */}
          </Text>
          <Text fontSize="sm" color="blackAlpha.700">
            On {stats.creatorStats.projectsCount} projects • Ranked {stats.creatorStats.rank}
          </Text>
        </Box>

        <Box>
          <Text fontSize="md">
            Contributed: {getShortAmountLabel(stats.contributorStats.contributionsTotal)} sats
            {/* ($
            {getShortAmountLabel(stats.contributorStats.contributionsTotalUsd)}) */}
          </Text>
          <Text fontSize="sm" color="blackAlpha.700">
            To {stats.contributorStats.projectsCount} projects • Ranked {stats.contributorStats.rank}
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}
