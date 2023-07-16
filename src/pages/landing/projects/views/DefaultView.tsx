import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../../components/layouts'
import { getFeaturedProject, getListOfTags } from '../../../../constants'
import { useMobileMode } from '../../../../utils'
import { MobileDivider } from '../../../grants/components'
// import { useGrants } from '../../../grants/hooks/useGrants'
import {
  ProjectsDisplay,
  ProjectsDisplayMostFundedThisWeek,
} from '../components'
// import { FeaturedProjectCard } from '../elements'
import {
  //  FeaturedGrantCard,
  FeaturedProjectCard,
} from '../elements'

export const DefaultView = () => {
  const { t } = useTranslation()
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
      <MobileDivider />
      {/* <FeaturedGrantCard grant={activeGrant} loading={loading} /> */}
      {firstThreeTags.map((tag) => {
        return (
          <>
            <ProjectsDisplayMostFundedThisWeek key={tag.id} tag={tag} />
            <MobileDivider />
          </>
        )
      })}
      <ProjectsDisplay seeAllText={t('See recent')} />
      <MobileDivider />
      {restOfTheTags.map((tag, index) => {
        return (
          <>
            <ProjectsDisplayMostFundedThisWeek key={tag.id} tag={tag} />
            {index < restOfTheTags.length - 1 && <MobileDivider />}
          </>
        )
      })}
    </CardLayout>
  )
}
