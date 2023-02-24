import { useQuery } from '@apollo/client'
import { GridItem, SimpleGrid, Text } from '@chakra-ui/react'

import { CardLayout } from '../../../components/layouts'
import Loader from '../../../components/ui/Loader'
import { ID } from '../../../constants'
import { useFilterContext } from '../../../context'
import { ScrollInvoke } from '../../../helpers'
import { useQueryWithPagination } from '../../../hooks'
import {
  GetProjectsMostFundedOfTheWeekInput,
  Project,
  ProjectsMostFundedOfTheWeekGet,
} from '../../../types'
import { useMobileMode } from '../../../utils'
import {
  QUERY_PROJECTS_FOR_LANDING_PAGE,
  QUERY_TRENDING_PROJECTS_FOR_LANDING_PAGE,
} from '../projects.graphql'
import { LandingProjectCard } from './components'
import { FilterTopBar } from './FilterTopBar'

const NO_OF_PROJECT_TO_LOAD_FILTER_VIEW = 20

interface FilteredProjectListProps {
  projects: Project[]
  error?: any
}

export const FilteredProjectList = ({
  projects,
  error,
}: FilteredProjectListProps) => {
  return (
    <CardLayout w="full" spacing="30px" padding="20px">
      <FilterTopBar />
      {error ? (
        <Text> Could not find any results</Text>
      ) : (
        <SimpleGrid
          columns={{ base: 1, xl: 3 }}
          spacingX="20px"
          spacingY="20px"
        >
          {projects.map((project) => {
            return (
              <GridItem key={project.id} overflow="hidden">
                <LandingProjectCard project={project} />
              </GridItem>
            )
          })}
        </SimpleGrid>
      )}
    </CardLayout>
  )
}

export const PaginatedView = () => {
  const isMobile = useMobileMode()

  const {
    filters: { recent, ...restFilters },
    sort: restSort,
  } = useFilterContext()

  const {
    isLoading,
    isLoadingMore,
    noMoreItems,
    data: projects,
    error,
    fetchNext,
  } = useQueryWithPagination<Project>({
    itemLimit: 20,
    queryName: ['projects', 'projects'],
    query: QUERY_PROJECTS_FOR_LANDING_PAGE,
    where: { ...restFilters },
    orderBy: restSort,
  })

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <FilteredProjectList {...{ projects, error }} />
      <ScrollInvoke
        elementId={isMobile ? undefined : ID.root}
        onScrollEnd={fetchNext}
        isLoading={isLoadingMore}
        noMoreItems={noMoreItems}
      />
    </>
  )
}

export const TrendingView = () => {
  const {
    filters: { tagIds = [] },
  } = useFilterContext()

  const { data, loading, error } = useQuery<
    { projectsMostFundedOfTheWeekGet: ProjectsMostFundedOfTheWeekGet[] },
    { input: GetProjectsMostFundedOfTheWeekInput }
  >(QUERY_TRENDING_PROJECTS_FOR_LANDING_PAGE, {
    variables: {
      input: {
        tagIds,
        take: NO_OF_PROJECT_TO_LOAD_FILTER_VIEW,
      },
    },
  })
  const projects =
    data?.projectsMostFundedOfTheWeekGet.map(
      (returnvalue) => returnvalue.project,
    ) || []

  if (loading) {
    return <Loader />
  }

  return <FilteredProjectList {...{ projects, error }} />
}
