import { Divider, VStack } from '@chakra-ui/react'
import { Fragment } from 'react'

import { CardLayout, CardLayoutProps, SkeletonLayout } from '../../../../../../../../../components/layouts'
import { ProjectFundingContributorsItem } from '../../../../../../../../../components/molecules/projectActivity/ProjectFundingContributorsItem'
import { ID } from '../../../../../../../../../constants'
import { QUERY_PROJECT_FUNDERS } from '../../../../../../../../../graphql'
import { ScrollInvoke } from '../../../../../../../../../helpers'
import { useQueryWithPagination } from '../../../../../../../../../hooks'
import { FunderWithUserFragment, ProjectFragment } from '../../../../../../../../../types'
import { useMobileMode, useNotification } from '../../../../../../../../../utils'

interface ProjectContributorsListProps extends CardLayoutProps {
  id?: string
  isBounded?: boolean
  project: ProjectFragment
}

const CONTRIBUTORS_ITEM_LIMIT = 50

export const ProjectContributorsList = ({
  id = ID.project.activity.contributors,
  isBounded,
  project,
  ...props
}: ProjectContributorsListProps) => {
  const { toast } = useNotification()
  const isMobile = useMobileMode()

  const contributors = useQueryWithPagination<FunderWithUserFragment>({
    queryName: 'fundersGet',
    itemLimit: CONTRIBUTORS_ITEM_LIMIT,
    query: QUERY_PROJECT_FUNDERS,
    where: { projectId: Number(project.id), anonymous: false },
    orderBy: {
      amountFunded: 'desc',
    },
    options: {
      skip: !project.id,
      onError() {
        toast({
          status: 'error',
          title: 'Failed to fetch contributors',
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
        paddingBottom={'20px'}
        gap={2}
      >
        {contributors.isLoading ? (
          <ContributorsListSkeleton />
        ) : (
          contributors.data.map((contributor) => {
            return (
              <Fragment key={contributor.id}>
                <ProjectFundingContributorsItem w="100%" contributor={contributor} project={project} />
              </Fragment>
            )
          })
        )}
        <ScrollInvoke
          elementId={!isMobile || isBounded ? id : undefined}
          onScrollEnd={contributors.fetchNext}
          isLoading={contributors.isLoadingMore}
          noMoreItems={contributors.noMoreItems}
        />
      </VStack>
    </CardLayout>
  )
}

export const ContributorsListSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((value, index) => {
        return (
          <Fragment key={value}>
            <SkeletonLayout width="100%" height="40px" />
            {index < 4 && <Divider borderBottomWidth="2px" maxWidth="500px" borderColor="neutral.200" />}
          </Fragment>
        )
      })}
    </>
  )
}
