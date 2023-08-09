import { Fragment, useMemo } from 'react'

import { CardLayout } from '../../../../components/layouts'
import { getFeaturedProject, getListOfTags } from '../../../../constants'
import { useMobileMode } from '../../../../utils'
import { MobileDivider } from '../../../grants/components'
// import { useGrants } from '../../../grants/hooks/useGrants'
import { ProjectsDisplayMostFundedThisWeek } from '../components'
// import { FeaturedProjectCard } from '../elements'
import {
  //  FeaturedGrantCard,
  FeaturedProjectCard,
} from '../elements'

export const DefaultView = () => {
  const isMobile = useMobileMode()

  // const { activeGrant, loading } = useGrants()

  const allTags = useMemo(() => getListOfTags(), [])

  const firstThreeTags = allTags.slice(0, 3)
  const restOfTheTags = allTags.slice(3)

  return (
    <CardLayout
      noborder={isMobile}
      w="full"
      spacing={{ base: '15px', lg: '50px' }}
      padding={{ base: 0, lg: '20px' }}
    >
      <FeaturedProjectCard projectName={getFeaturedProject()} />
      <MobileDivider mt={2} />
      {/* <FeaturedGrantCard grant={activeGrant} loading={loading} /> */}
      {firstThreeTags.map((tag) => (
        <ProjectsDisplayMostFundedThisWeek
          key={tag.id}
          tag={tag}
          hasMobileDivider
        />
      ))}
      {restOfTheTags.map((tag, index) => (
        <ProjectsDisplayMostFundedThisWeek
          key={tag.id}
          tag={tag}
          hasMobileDivider={index < restOfTheTags.length - 1}
        />
      ))}
    </CardLayout>
  )
}
