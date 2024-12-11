import { VStack } from '@chakra-ui/react'

import { ClosedGrants } from './components/ClosedGrants'
import { GrantsHeader } from './components/GrantsHeader'
import { GrantSubscriptionSection } from './components/GrantSubscriptionSection'
import { OpenGrants } from './components/OpenGrants'
import { UpcomingGrants } from './components/UpcomingGrants'
import { useGrants } from './hooks/useGrants'

export const Grants = () => {
  const { inactiveGrants, fundingOpenGrants, applicationOpenGrants } = useGrants()

  return (
    <VStack align="stretch" spacing={8}>
      <GrantsHeader />
      <GrantSubscriptionSection />
      <OpenGrants openGrants={fundingOpenGrants} />
      <UpcomingGrants upcomingGrants={applicationOpenGrants} />
      <ClosedGrants closedGrants={inactiveGrants} />
    </VStack>
  )
}
