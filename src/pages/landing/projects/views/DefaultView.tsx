import { VStack } from '@chakra-ui/react'
import { useMemo } from 'react'

import { CardLayout } from '../../../../components/layouts'
import { getListOfTags } from '../../../../constants'
import { useMobileMode } from '../../../../utils'
import { MobileDivider } from '../../../grants/components'
import { useGrants } from '../../../grants/hooks/useGrants'
import { ProjectsDisplayMostFundedThisWeek } from '../components'
import {
  FeaturedGrantCard,
  // FeaturedProjectCard,
} from '../elements'

export const DefaultView = () => {
  const isMobile = useMobileMode()

  const { activeGrant, loading } = useGrants()

  const allTags = useMemo(() => getListOfTags(), [])

  const firstThreeTags = allTags.slice(0, 3)
  const restOfTheTags = allTags.slice(3)

  return (
    <VStack w="full" spacing="20px" pt="20px">
      {/* Subscribe to projects block is commented out */}
      {/* <CardLayout noborder={isMobile} w="full" spacing={{ base: '15px', lg: '50px' }} padding={{ base: 0, lg: '20px' }}>
        <SubscribeToProjects />
        <MobileDivider mt={2} />
      </CardLayout> */}

      <CardLayout noborder={isMobile} w="full" spacing={{ base: '15px', lg: '50px' }} padding={{ base: 0, lg: '20px' }}>
        {/* <FeaturedProjectCard projectName={getFeaturedProject()} /> */}
        <FeaturedGrantCard grant={activeGrant} loading={loading} />
        <MobileDivider mt={2} />
        {firstThreeTags.map((tag) => (
          <ProjectsDisplayMostFundedThisWeek key={tag.id} tag={tag} hasMobileDivider />
        ))}
        {restOfTheTags.map((tag, index) => (
          <ProjectsDisplayMostFundedThisWeek
            key={tag.id}
            tag={tag}
            hasMobileDivider={index < restOfTheTags.length - 1}
          />
        ))}
      </CardLayout>
    </VStack>
  )
}
