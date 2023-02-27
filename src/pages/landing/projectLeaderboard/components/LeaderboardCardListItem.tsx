import { Box, HStack, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { Body1 } from '../../../../components/typography'
import { ImageWithReload } from '../../../../components/ui'
import { getPath } from '../../../../constants'
import { Project } from '../../../../types'
import { toSmallImageUrl } from '../../../../utils'
import { LeaderboardFundingStats } from '.'

export const LeaderboardCardListItem = ({ project }: { project: Project }) => {
  return (
    <HStack
      as={Link}
      to={getPath('project', project.name)}
      backgroundColor="white"
      borderRadius="8px"
      _hover={{ backgroundColor: 'neutral.100' }}
      width="100%"
    >
      <Box height="60px" width="60px" borderRadius="8px" overflow="hidden">
        <ImageWithReload
          h="full"
          w="full"
          grey
          alt={`${project.name}-thumbnail-image`}
          src={toSmallImageUrl(`${project.thumbnailImage}`)}
        />
      </Box>

      <VStack flex={1} overflow="hidden">
        <Body1 color="brand.neutral900" isTruncated bold width="100%">
          {project.title}
        </Body1>
        <LeaderboardFundingStats
          funders={project.fundersCount}
          funded={project.balance}
        />
      </VStack>
    </HStack>
  )
}
