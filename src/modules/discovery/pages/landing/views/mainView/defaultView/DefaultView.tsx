import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Fragment, useEffect, useState } from 'react'

import { Head } from '@/config/Head.tsx'
import { getAiSeoPageContent, getPath, GeyserMainSeoImageUrl } from '@/shared/constants/index.ts'
import { buildCollectionPageJsonLd } from '@/shared/utils/seo.ts'
import { ProjectCategory } from '@/types/index.ts'

import { HeroesMainPage } from '../../../../heroes/index.ts'
import { TopProjects } from './components/TopProjects.tsx'
import { CharityProjects } from './sections/CharityProjects.tsx'
import { CuratedProjects } from './sections/CuratedProjects.tsx'
import { GeyserNewsAndAnnouncements } from './sections/GeyserNewsAndAnnouncements.tsx'
import { HowGeyserWorks } from './sections/HowGeyserWorks.tsx'
import { NewsletterSignup } from './sections/NewsletterSignup.tsx'
import { ProjectsDisplayMostFundedThisWeek } from './sections/ProjectsDisplayMostFundedThisWeek.tsx'
import { ProjectsInYourRegion } from './sections/ProjectsInYourRegion.tsx'
import { SuccessStories } from './sections/SuccessStories.tsx'

const CATEGORY_SECTION_GROUP_SIZE = 2
const LANDING_CATEGORY_ORDER = [
  ProjectCategory.Education,
  ProjectCategory.Community,
  ProjectCategory.Culture,
  ProjectCategory.Tool,
  ProjectCategory.Cause,
] as const

export const DefaultView = () => {
  const [showBelowTheFold, setShowBelowTheFold] = useState(false)
  const defaultSeoContent = getAiSeoPageContent('default')

  const categoryGroups = LANDING_CATEGORY_ORDER.reduce<(typeof LANDING_CATEGORY_ORDER)[number][][]>(
    (groups, category, index) => {
      const groupIndex = Math.floor(index / CATEGORY_SECTION_GROUP_SIZE)

      if (!groups[groupIndex]) {
        groups[groupIndex] = []
      }

      groups[groupIndex].push(category)

      return groups
    },
    [],
  )

  useEffect(() => {
    /** Wait for initial content to render before showing below-the-fold content */
    const timer = setTimeout(() => {
      setShowBelowTheFold(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <VStack w="full" spacing={10} paddingTop={{ base: '4px', lg: '6px' }}>
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
                name: 'Bitcoin Campaigns',
                path: getPath('discoveryCampaigns'),
                description: 'Discover new and upcoming all-or-nothing Bitcoin project ideas.',
              },
              {
                name: 'Bitcoin Fundraisers',
                path: getPath('discoveryFundraisers'),
                description: 'Support creator and humanitarian fundraisers worldwide.',
              },
              {
                name: 'Impact Funds',
                path: getPath('discoveryImpactFunds'),
                description: 'Explore impact-focused Bitcoin funding programs and outcomes.',
              },
            ],
          })}
        </script>
      </Head>
      <VStack w="full" spacing={20} paddingBottom={40}>
        <CuratedProjects />

        <ProjectsInYourRegion />

        <SuccessStories />

        <HowGeyserWorks />

        {showBelowTheFold && (
          <>
            {categoryGroups.map((categoryGroup, index) => (
              <Fragment key={`landing-category-group-${index}`}>
                {categoryGroup.map((category) => (
                  <ProjectsDisplayMostFundedThisWeek key={category} category={category} />
                ))}
                {index === categoryGroups.length - 1 && (
                  <ProjectsDisplayMostFundedThisWeek
                    title={t('Other fundraisers')}
                    categories={[ProjectCategory.Advocacy, ProjectCategory.Other]}
                    noRightContent
                  />
                )}
                {index === 0 && (
                  <>
                    <GeyserNewsAndAnnouncements />
                    <NewsletterSignup />
                  </>
                )}
                {index === 1 && <CharityProjects />}
                {index === 2 && <HeroesMainPage />}
                {index === 3 && <TopProjects />}
              </Fragment>
            ))}
            <NewsletterSignup />
          </>
        )}
      </VStack>
    </VStack>
  )
}
