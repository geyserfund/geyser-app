import { CardLayout } from '../../../../components/layouts'
import { getFeaturedProject, getListOfTags } from '../../../../constants'
import { useGrants } from '../../../grants/hooks/useGrants'
import {
  ProjectsDisplay,
  ProjectsDisplayMostFundedThisWeek,
} from '../components'
import { FeaturedProjectCard } from '../elements'
import { FeaturedGrantCard } from '../elements'

export const DefaultView = () => {
  const { activeGrant, loading } = useGrants()
  return (
    <CardLayout w="full" spacing="50px" padding="20px">
      {activeGrant ? (
        <FeaturedGrantCard grant={activeGrant} loading={loading} />
      ) : (
        <FeaturedProjectCard projectName={getFeaturedProject()} />
      )}

      <ProjectsDisplay seeAllText="See all projects" />
      {getListOfTags().map((tag) => {
        return <ProjectsDisplayMostFundedThisWeek key={tag.id} tag={tag} />
      })}
    </CardLayout>
  )
}
