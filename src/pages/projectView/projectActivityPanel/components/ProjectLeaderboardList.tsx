import { Divider, VStack } from '@chakra-ui/react'
import { Fragment } from 'react'

import { CardLayout } from '../../../../components/layouts'
import { ProjectFundingLeaderboardFeedItem } from '../../../../components/molecules'
import { ID } from '../../../../constants/components'
import { ScrollInvoke } from '../../../../helpers'
import { PaginationHookReturn } from '../../../../hooks/types'
import { Funder, ProjectFragment } from '../../../../types/generated/graphql'
import { useMobileMode } from '../../../../utils'

interface ProjectLeaderboardListProps {
  project: ProjectFragment
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
      width="100%"
      overflow="auto"
      height={isMobile ? 'calc(100% - 44px)' : '100%'}
      padding="0px"
    >
      <VStack
        marginTop="20px"
        spacing={'15px'}
        width="100%"
        alignItems="start"
        paddingRight="10px"
      >
        {funders.data.map((funder, index) => {
          return (
            <Fragment key={funder.id}>
              <ProjectFundingLeaderboardFeedItem
                w="100%"
                funder={funder}
                leaderboardPosition={index + 1}
                project={project}
              />
              {index < funders.data.length - 1 && (
                <Divider
                  borderBottomWidth="2px"
                  maxWidth="500px"
                  borderColor="neutral.200"
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
      </VStack>
    </CardLayout>
  )
}
