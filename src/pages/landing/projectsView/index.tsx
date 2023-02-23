import { CardLayout } from '../../../components/layouts'
import { QUERY_GET_PROJECT_DASHBOARD_CONTRIBUTORS } from '../../../graphql'
import { useQueryWithPagination } from '../../../hooks'
import { FilterState } from '../../../hooks/state'
import { Owner, Project, User } from '../../../types'
import { QUERY_PROJECT_FOR_LANDING_PAGE } from '../projects.graphql'
import { FeaturedProjectCard } from './components'
import { ProjectsDisplay } from './ProjectsDisplay'

const listOfTags = [
  { label: 'education', id: 41 },
  { label: 'culture', id: 42 },
  { label: 'communities', id: 43 },
  { label: 'games', id: 44 },
]

type ProjectsViewProps = FilterState

export const ProjectsView = ({ filters }: ProjectsViewProps) => {
  // const {
  //   isLoading,
  //   isLoadingMore,
  //   noMoreItems,
  //   data: contributions,
  //   error,
  //   fetchNext,
  // } = useQueryWithPagination<>({
  //   itemLimit,
  //   queryName: 'getFundingTxs',
  //   query: QUERY_PROJECT_FOR_LANDING_PAGE,
  // })

  return (
    <CardLayout w="full" spacing="50px" padding="20px">
      <FeaturedProjectCard
        project={
          {
            title: 'The bushido of Bitcoin',
            shortDescription:
              'The best book ever written about Bitcoin is coming out very soon. Get ready for it! Aleks is going to be exploring the power of bitcoin from a new angle that you’ve never expected before',
            fundersCount: 30,
            balance: 3500000,
            owners: [
              {
                user: {
                  username: 'Svetski.info',
                  imageUrl: 'https://picsum.photos/200/300',
                } as User,
              } as Owner,
            ],
          } as Project
        }
      />

      <ProjectsDisplay />
      {listOfTags.map((tag) => {
        return <ProjectsDisplay key={tag.id} tag={tag} />
      })}
    </CardLayout>
  )
}
