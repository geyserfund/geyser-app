import { VStack } from '@chakra-ui/react'

import { Head } from '@/config/Head.tsx'
import { GrantsSeoImageUrl } from '@/shared/constants/index.ts'

import { ClosedGrants } from './components/ClosedGrants'
import { GrantsHeader } from './components/GrantsHeader'
import { GrantSubscriptionSection } from './components/GrantSubscriptionSection'
import { OpenGrants } from './components/OpenGrants'
import { UpcomingGrants } from './components/UpcomingGrants'
import { useGrants } from './hooks/useGrants'

export const GrantsMainPage = () => {
  const { inactiveGrants, fundingOpenGrants, applicationOpenGrants } = useGrants()

  console.log(inactiveGrants, fundingOpenGrants, applicationOpenGrants)

  return (
    <VStack align="stretch" spacing={8}>
      <Head
        title="Grants"
        description="Geyser Grants fund Bitcoin creators, educators, and builders. Apply for support and help grow Bitcoin through content, culture, and community."
        image={GrantsSeoImageUrl}
      />
      <GrantsHeader />
      <GrantSubscriptionSection />
      <OpenGrants openGrants={fundingOpenGrants} />
      <UpcomingGrants upcomingGrants={applicationOpenGrants} />
      <ClosedGrants closedGrants={inactiveGrants} />
    </VStack>
  )
}
