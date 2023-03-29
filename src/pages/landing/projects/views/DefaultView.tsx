import { CardLayout } from '../../../../components/layouts'
import { getFeaturedProject, getListOfTags } from '../../../../constants'
import {
  ProjectsDisplay,
  ProjectsDisplayMostFundedThisWeek,
} from '../components'
import { FeaturedProjectCard } from '../elements'

export const DefaultView = () => {
  return (
    <CardLayout w="full" spacing="50px" padding="20px">
      <FeaturedProjectCard projectName={getFeaturedProject()} />

      <ProjectsDisplay seeAllText="See all projects" />
      {getListOfTags().map((tag) => {
        return <ProjectsDisplayMostFundedThisWeek key={tag.id} tag={tag} />
      })}
    </CardLayout>
  )
}
