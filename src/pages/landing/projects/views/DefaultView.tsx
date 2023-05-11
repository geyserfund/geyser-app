import { useMemo } from 'react'

import { CardLayout } from '../../../../components/layouts'
import { getListOfTags } from '../../../../constants'
import { useGrants } from '../../../grants/hooks/useGrants'
import {
  ProjectsDisplay,
  ProjectsDisplayMostFundedThisWeek,
} from '../components'
// import { FeaturedProjectCard } from '../elements'
import { FeaturedGrantCard } from '../elements'

export const DefaultView = () => {
  const { activeGrant, loading } = useGrants()

  const allTags = useMemo(() => getListOfTags(), [])

  const firstThreeTags = allTags.slice(0, 3)
  const restOfTheTags = allTags.slice(3)

  return (
    <CardLayout w="full" spacing="50px" padding="20px">
      {/* <FeaturedProjectCard projectName={getFeaturedProject()} /> */}
      <FeaturedGrantCard grant={activeGrant} loading={loading} />
      {firstThreeTags.map((tag) => {
        return <ProjectsDisplayMostFundedThisWeek key={tag.id} tag={tag} />
      })}
      <ProjectsDisplay seeAllText="See recent" />
      {restOfTheTags.map((tag) => {
        return <ProjectsDisplayMostFundedThisWeek key={tag.id} tag={tag} />
      })}
    </CardLayout>
  )
}
