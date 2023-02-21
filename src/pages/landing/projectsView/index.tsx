import { CardLayout } from '../../../components/layouts'
import { Owner, Project, User } from '../../../types'
import { FeaturedProjectCard } from './components'
import { ProjectsDisplay } from './ProjectsDisplay'

const listOfTags = [
  { label: 'education', id: 41 },
  { label: 'culture', id: 42 },
  { label: 'communities', id: 43 },
  { label: 'games', id: 44 },
]

export const ProjectsView = () => {
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
