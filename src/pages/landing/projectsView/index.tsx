import { CardLayout } from '../../../components/layouts'
import { Owner, Project, User } from '../../../types'
import { FeaturedProjectCard, ProjectDiscoveryComponent } from './components'
import { ProjectDisplay } from './ProjectDisplay'

export const ProjectsView = () => {
  return (
    <CardLayout w="full" spacing="50px">
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
      <ProjectDiscoveryComponent title="Featured Project">
        <ProjectDisplay />
      </ProjectDiscoveryComponent>
    </CardLayout>
  )
}
