import { CardLayout } from '../../../components/layouts'
import { FilterState } from '../../../hooks/state'
import { FeaturedProjectCard } from './components'
import { ProjectsDisplay } from './ProjectsDisplay'

const listOfTags = [
  { label: 'education', id: 41 },
  { label: 'culture', id: 42 },
  { label: 'communities', id: 43 },
  { label: 'games', id: 44 },
]

export const LandingProjectList = ({ filters, updateFilter }: FilterState) => {
  return (
    <CardLayout w="full" spacing="50px" padding="20px">
      <FeaturedProjectCard projectName="bitcoinconferenceinlagos" />

      <ProjectsDisplay {...{ filters, updateFilter }} />
      {listOfTags.map((tag) => {
        return (
          <ProjectsDisplay
            key={tag.id}
            tag={tag}
            {...{ filters, updateFilter }}
          />
        )
      })}
    </CardLayout>
  )
}
