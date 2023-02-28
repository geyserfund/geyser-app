import { CardLayout } from '../../../../components/layouts'
import {
  ProjectsDisplay,
  ProjectsDisplayMostFundedThisWeek,
} from '../components'
import { FeaturedProjectCard } from '../elements'

const listOfTags = [
  { label: 'development', id: 1 },
  { label: 'education', id: 2 },
  { label: 'culture', id: 3 },
  { label: 'testing', id: 4 },
  { label: 'crowdfunding', id: 13 },
]

export const DefaultView = () => {
  return (
    <CardLayout w="full" spacing="50px" padding="20px">
      <FeaturedProjectCard projectName="geyser" />

      <ProjectsDisplay />
      {listOfTags.map((tag) => {
        return <ProjectsDisplayMostFundedThisWeek key={tag.id} tag={tag} />
      })}
    </CardLayout>
  )
}
