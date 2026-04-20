import { VStack } from '@chakra-ui/react'
import { Link } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getAiSeoPageContent, getPath, GrantsSeoImageUrl } from '@/shared/constants/index.ts'
import { buildCollectionPageJsonLd } from '@/shared/utils/seo.ts'
import { ProjectSubCategory } from '@/types/index.ts'

import { ClosedGrants } from './components/ClosedGrants'
import { GrantsHeader } from './components/GrantsHeader'
import { GrantSubscriptionSection } from './components/GrantSubscriptionSection'
import { OpenGrants } from './components/OpenGrants'
import { UpcomingGrants } from './components/UpcomingGrants'
import { useGrants } from './hooks/useGrants'

export const GrantsMainPage = () => {
  const { inactiveGrants, fundingOpenGrants, applicationOpenGrants } = useGrants()
  const grantsSeoContent = getAiSeoPageContent('grants')

  return (
    <VStack align="stretch" spacing={8}>
      <Head
        title={grantsSeoContent.title}
        description={grantsSeoContent.description}
        image={GrantsSeoImageUrl}
        keywords={grantsSeoContent.keywords}
        url={`https://geyser.fund${getPath('grants')}`}
      >
        <script type="application/ld+json">
          {buildCollectionPageJsonLd({
            name: 'Geyser Grants',
            description: grantsSeoContent.description,
            path: getPath('grants'),
            about: grantsSeoContent.about,
            keywords: grantsSeoContent.keywords,
            items: [
              {
                name: 'Open Grants',
                path: getPath('grants'),
                description: 'Find active grant opportunities funding Bitcoin builders and educators.',
              },
              {
                name: 'Upcoming Grants',
                path: getPath('grants'),
                description: 'Track upcoming grant rounds and prepare applications early.',
              },
              {
                name: 'Humanitarian Fundraisers',
                path: getPath('discoveryFundraisersSubCategory', ProjectSubCategory.Humanitarian),
                description: 'See humanitarian causes where bitcoiners are funding real-world support.',
              },
            ],
          })}
        </script>
      </Head>
      <VStack spacing={2} alignItems="start">
        <Body size="md">
          Grants on Geyser support projects that accelerate Bitcoin adoption and amplify initiatives with social impact.
        </Body>
        <Body as={Link} to={getPath('discoveryFundraisersSubCategory', ProjectSubCategory.Humanitarian)} underline bold>
          Explore humanitarian fundraisers
        </Body>
      </VStack>
      <GrantsHeader />
      <GrantSubscriptionSection />
      <OpenGrants openGrants={fundingOpenGrants} />
      <UpcomingGrants upcomingGrants={applicationOpenGrants} />
      <ClosedGrants closedGrants={inactiveGrants} />
    </VStack>
  )
}
