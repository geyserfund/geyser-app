import { Box, StackProps } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import { Body1, Body2 } from '../../../../components/typography'
import { ImageWithReload } from '../../../../components/ui'
import { getPath } from '../../../../constants'
import { Project } from '../../../../types'
import { AvatarElement } from '../../../projectView/projectMainBody/components'
import { LeaderboardFundingStats } from '.'

interface LeaderboardFeatureProjectProps extends StackProps {
  project: Project
}

export const LeaderboardFeatureProject = ({
  project,
  ...rest
}: LeaderboardFeatureProjectProps) => {
  return (
    <CardLayout
      as={Link}
      to={getPath('project', project.name)}
      noborder
      padding="0px"
      direction="column"
      w="100%"
      overflow="hidden"
      _hover={{ backgroundColor: 'neutral.100' }}
      {...rest}
    >
      <Box height="200px" borderRadius="8px" overflow="hidden">
        <ImageWithReload
          grey
          h="full"
          w="full"
          src={`${project.thumbnailImage}`}
          alt="leaderboard-featured-project-image"
        />
      </Box>
      <LeaderboardFundingStats
        funders={project.fundersCount}
        funded={project.balance}
      />
      <Body1 bold color="brand.neutral9000" width="100%" isTruncated>
        {project.title}
      </Body1>
      <AvatarElement noLink borderRadius="50%" user={project.owners[0]?.user} />
      <Body2
        color="neutral.800"
        noOfLines={3}
        isTruncated
        whiteSpace="pre-wrap"
      >
        {project.shortDescription}
      </Body2>
    </CardLayout>
  )
}
