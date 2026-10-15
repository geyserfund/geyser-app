import { useQuery } from '@apollo/client'
import { SimpleGrid, VStack } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

import { Head } from '@/config/Head.tsx'
import { useImpactFundsDonateModal } from '@/modules/impactFunds/hooks/useImpactFundsDonateModal.tsx'
import { CIRCULAR_GRANTS_CATEGORY_ID } from '@/modules/impactFunds/utils/impactFundDonatePreferences.ts'
import { InsetSection } from '@/shared/components/layouts/InsetSection.tsx'
import { getAiSeoPageContent, getPath, GeyserMainSeoImageUrl } from '@/shared/constants/index.ts'
import { brandColors } from '@/shared/styles/brandPalette.ts'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'
import { buildCollectionPageJsonLd } from '@/shared/utils/seo.ts'
import {
  OrderByDirection,
  ProjectsGetWhereInputStatus,
  ProjectsOrderByField,
  useLandingAboveFoldQuery,
} from '@/types/index.ts'

import { HeroesMainPage } from '../../../../heroes/index.ts'
import { QUERY_LANDING_ANNOUNCEMENTS } from '../../../graphql/landingPageQueries.ts'
import type { LandingAnnouncementsQueryData } from '../../../graphql/landingPageTypes.ts'
import { CircularGrantProjects } from './sections/CircularGrantProjects.tsx'
import {
  CircularGrantsFocus,
  FieldPartnerCaseStudy,
  FieldPartnersPanel,
  SupportMovementBand,
} from './sections/CircularGrantsMission.tsx'
import { CuratedProjects } from './sections/CuratedProjects.tsx'
import { GeyserNewsAndAnnouncements } from './sections/GeyserNewsAndAnnouncements.tsx'
import { LatamImpactFundApplication } from './sections/LatamImpactFundApplication.tsx'
import { NewsletterSignup } from './sections/NewsletterSignup.tsx'

const CURATED_PROJECTS_COUNT = 3
const FEATURED_PROJECTS_QUERY_TAKE = 20
/** Rounded ochre panel extending beyond the landing page's content column. */
const OchreBand = ({ children }: { children: ReactNode }) => (
  <InsetSection bg={brandColors.burntOchre} paddingX={standardPadding} paddingY={{ base: 10, lg: 16 }}>
    {children}
  </InsetSection>
)

export const DefaultView = () => {
  const [showBelowTheFold, setShowBelowTheFold] = useState(false)
  const defaultSeoContent = getAiSeoPageContent('default')
  const { donateModalElement, openDonateModal } = useImpactFundsDonateModal()

  useEffect(() => {
    /** Wait for initial content to render before showing below-the-fold content */
    const timer = setTimeout(() => {
      setShowBelowTheFold(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const {
    data: featuredProjectsData,
    error: featuredProjectsQueryError,
    loading: featuredProjectsQueryLoading,
    refetch: refetchFeaturedProjects,
  } = useLandingAboveFoldQuery({
    variables: {
      input: {
        where: {
          isCircularGrant: true,
          status: ProjectsGetWhereInputStatus.Active,
          goalReached: false,
        },
        pagination: { take: FEATURED_PROJECTS_QUERY_TAKE },
        orderBy: [
          { direction: OrderByDirection.Desc, field: ProjectsOrderByField.Balance },
          { direction: OrderByDirection.Desc, field: ProjectsOrderByField.LaunchedAt },
        ],
      },
    },
  })

  const featuredProjects =
    featuredProjectsData?.projectsGet.projects
      .filter((project) => (project.fundingSummary.percentageFunded ?? 0) < 100)
      .slice(0, CURATED_PROJECTS_COUNT) ?? []
  const {
    data: announcementsData,
    error: announcementsError,
    loading: announcementsLoading,
    refetch: refetchAnnouncements,
  } = useQuery<LandingAnnouncementsQueryData>(QUERY_LANDING_ANNOUNCEMENTS, {
    skip: !showBelowTheFold,
  })
  return (
    <VStack w="full" spacing={10}>
      {donateModalElement}
      <Head
        title={defaultSeoContent.title}
        description={defaultSeoContent.description}
        image={GeyserMainSeoImageUrl}
        keywords={defaultSeoContent.keywords}
        url="https://geyser.fund/"
      >
        <script type="application/ld+json">
          {buildCollectionPageJsonLd({
            name: 'Geyser Discovery',
            description: defaultSeoContent.description,
            path: '/',
            about: defaultSeoContent.about,
            keywords: defaultSeoContent.keywords,
            items: [
              {
                name: 'Circular Grants',
                path: getPath('discoveryCircularGrants'),
                description: 'Back vetted local projects with reusable, debt-free capital.',
              },
              {
                name: 'Regional Partner Fund',
                path: getPath('discoveryImpactFunds'),
                description: 'Explore regional partner funding programs and outcomes.',
              },
            ],
          })}
        </script>
      </Head>
      <VStack w="full" spacing={{ base: 12, lg: 20 }} paddingBottom={{ base: 16, lg: 20 }}>
        <VStack w="full" spacing={{ base: 10, lg: 12 }} align="stretch">
          <CuratedProjects
            featuredError={Boolean(featuredProjectsQueryError)}
            featuredLoading={featuredProjectsQueryLoading}
            featuredProjects={featuredProjects}
            onRetryFeatured={() => refetchFeaturedProjects()}
          />
          <OchreBand>
            <CircularGrantsFocus />
          </OchreBand>
          <CircularGrantProjects
            title="Recent Circular Grants"
            description=""
            take={3}
            emptyStateText="No recent Circular Grants found"
            showDiscoverMore={false}
          />
        </VStack>

        <VStack w="full" spacing={{ base: 6, lg: 8 }} align="stretch">
          <FieldPartnersPanel />
          <SimpleGrid w="full" columns={{ base: 1, lg: 2 }} spacing={{ base: 6, lg: 8 }}>
            <FieldPartnerCaseStudy />
            <LatamImpactFundApplication />
          </SimpleGrid>
        </VStack>

        <OchreBand>
          <SupportMovementBand
            onSupportImpactFund={() =>
              openDonateModal({
                defaultCategoryIds: [CIRCULAR_GRANTS_CATEGORY_ID],
              })
            }
          />
        </OchreBand>

        {showBelowTheFold && (
          <>
            <HeroesMainPage />
            <GeyserNewsAndAnnouncements
              giveawayEndAt={announcementsData?.acelerandoVipLeaderboard.endAt}
              giveawayError={Boolean(announcementsError)}
              giveawayLoading={announcementsLoading}
              onGiveawayRetry={() => refetchAnnouncements()}
              projectAnnouncements={announcementsData?.geyserAnnouncements ?? []}
            />
          </>
        )}

        <NewsletterSignup />
      </VStack>
    </VStack>
  )
}
