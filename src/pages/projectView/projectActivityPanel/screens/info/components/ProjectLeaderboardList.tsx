import { Divider, VStack } from '@chakra-ui/react'
import { Fragment } from 'react'

import {
  CardLayout,
  CardLayoutProps,
  SkeletonLayout,
} from '../../../../../../components/layouts'
import { ProjectFundingLeaderboardFeedItem } from '../../../../../../components/molecules'
import { ID } from '../../../../../../constants/components'
import { useProjectContext } from '../../../../../../context'
import { QUERY_PROJECT_FUNDERS } from '../../../../../../graphql'
import { ScrollInvoke } from '../../../../../../helpers'
import { useQueryWithPagination } from '../../../../../../hooks'
import { FunderWithUserFragment } from '../../../../../../types/generated/graphql'
import { useMobileMode, useNotification } from '../../../../../../utils'

const LEADERBOARD_ITEM_LIMIT = 50

export const ProjectLeaderboardList = ({ ...props }: CardLayoutProps) => {
  const isMobile = useMobileMode()
  const { toast } = useNotification()
  const { project } = useProjectContext()

  const id = ID.project.activity.leaderboard

  const funders = useQueryWithPagination<FunderWithUserFragment>({
    queryName: 'getFunders',
    itemLimit: LEADERBOARD_ITEM_LIMIT,
    query: QUERY_PROJECT_FUNDERS,
    where: { projectId: Number(project.id) },
    orderBy: {
      amountFunded: 'desc',
    },
    options: {
      skip: !project.id,
      onError() {
        toast({
          status: 'error',
          title: 'Failed to fetch contributors leaderboard',
        })
      },
    },
  })

  return (
    <CardLayout
      id={id}
      noborder
      width="100%"
      overflow="auto"
      height={isMobile ? 'calc(100% - 44px)' : '100%'}
      py="0px"
      px={{ base: '10px', lg: '20px' }}
      {...props}
    >
      <VStack
        marginTop="20px"
        spacing={'15px'}
        width="100%"
        alignItems="start"
        paddingRight="10px"
      >
        {funders.isLoading ? (
          <LeaderboardListSkeleton />
        ) : (
          funders.data.map((funder, index) => {
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
          })
        )}
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

export const LeaderboardListSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((value, index) => {
        return (
          <Fragment key={value}>
            <SkeletonLayout width="100%" height="40px" />
            {index < 4 && (
              <Divider
                borderBottomWidth="2px"
                maxWidth="500px"
                borderColor="neutral.200"
              />
            )}
          </Fragment>
        )
      })}
    </>
  )
}
