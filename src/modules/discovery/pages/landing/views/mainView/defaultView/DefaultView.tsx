import { VStack } from '@chakra-ui/react'
import { Fragment, useEffect, useState } from 'react'

import { Head } from '@/config/Head.tsx'
import { GeyserMainSeoImageUrl } from '@/shared/constants/index.ts'
import { ProjectCategoryList } from '@/shared/constants/platform/projectCategory.ts'

import { HeroesMainPage } from '../../../../heroes/index.ts'
import { TopProjects } from './components/TopProjects.tsx'
import { CharityProjects } from './sections/CharityProjects.tsx'
import { CuratedProjects } from './sections/CuratedProjects.tsx'
import { GeyserNewsAndAnnouncements } from './sections/GeyserNewsAndAnnouncements.tsx'
import { NewsletterSignup } from './sections/NewsletterSignup.tsx'
import { ProjectsDisplayMostFundedThisWeek } from './sections/ProjectsDisplayMostFundedThisWeek.tsx'
import { ProjectsInYourRegion } from './sections/ProjectsInYourRegion.tsx'
import { SuccessStories } from './sections/SuccessStories.tsx'

const CATEGORY_SECTION_GROUP_SIZE = 2

export const DefaultView = () => {
  const [showBelowTheFold, setShowBelowTheFold] = useState(false)

  const categoryGroups = ProjectCategoryList.reduce<(typeof ProjectCategoryList)[number][][]>(
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
      <Head image={GeyserMainSeoImageUrl} />
      <VStack w="full" spacing={20} paddingBottom={40}>
        <CuratedProjects />

        <SuccessStories />

        <ProjectsInYourRegion />

        {showBelowTheFold && (
          <>
            {categoryGroups.map((categoryGroup, index) => (
              <Fragment key={`landing-category-group-${index}`}>
                {categoryGroup.map((category) => (
                  <ProjectsDisplayMostFundedThisWeek key={category} category={category} />
                ))}
                {index === 0 && <GeyserNewsAndAnnouncements />}
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
