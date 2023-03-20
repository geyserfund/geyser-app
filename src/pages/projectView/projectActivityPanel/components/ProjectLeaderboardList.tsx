import { Divider } from '@chakra-ui/react'
import { Fragment } from 'react'

import { CardLayout } from '../../../../components/layouts'
import { ProjectFundingLeaderboardFeedItem } from '../../../../components/molecules'
import { ID } from '../../../../constants/components'
import { ScrollInvoke } from '../../../../helpers'
import { PaginationHookReturn } from '../../../../hooks/types'
import { Funder, Project } from '../../../../types/generated/graphql'
import { useMobileMode } from '../../../../utils'

interface ProjectLeaderboardListProps {
  project: Project
  funders: PaginationHookReturn<Funder>
}

export const ProjectLeaderboardList = ({
  project,
  funders,
}: ProjectLeaderboardListProps) => {
  const isMobile = useMobileMode()
  const id = ID.project.activity.leaderboard
  return (
    <CardLayout
      id={id}
      noborder
      spacing={'20px'}
      width="100%"
      overflow="auto"
      height={isMobile ? 'calc(100% - 44px)' : '100%'}
      padding="0px"
      marginBottom={{ base: '20px', lg: '0px' }}
    >
      {funders.data.map((funder, index) => {
        return (
          <Fragment key={funder.id}>
            <ProjectFundingLeaderboardFeedItem
              funder={funder}
              leaderboardPosition={index + 1}
              project={project}
            />
            {index < funders.data.length - 1 && (
              <Divider
                borderBottomWidth="2px"
                maxWidth="500px"
                color="brand.200"
              />
            )}
          </Fragment>
        )
      })}
      <ScrollInvoke
        elementId={!isMobile ? id : undefined}
        onScrollEnd={funders.fetchNext}
        isLoading={funders.isLoadingMore}
        noMoreItems={funders.noMoreItems}
      />
    </CardLayout>
  )
}
