import { Box, useColorModeValue, VStack } from '@chakra-ui/react'

import { Head } from '@/config/Head.tsx'
import { MicroLendingHero } from '@/modules/microLending/components/mainPage/MicroLendingHero.tsx'
import { MicroLendingTrustPillarsSection } from '@/modules/microLending/components/mainPage/MicroLendingTrustPillarsSection.tsx'
import { MicroLendingSustainableForAllSection } from '@/modules/microLending/components/mainPage/MicroLendingSustainableForAllSection.tsx'
import { MicroLendingWinWinHighlight } from '@/modules/microLending/components/mainPage/MicroLendingWinWinHighlight.tsx'
import { MicroLendingWaitlistSection } from '@/modules/microLending/components/mainPage/MicroLendingWaitlistSection.tsx'
import { MicroLendingFaqSection } from '@/modules/microLending/components/mainPage/MicroLendingFaqSection.tsx'
import { MicroLendingWhatIsSection } from '@/modules/microLending/components/mainPage/MicroLendingWhatIsSection.tsx'
import { MicroLendingWhyGeyserSection } from '@/modules/microLending/components/mainPage/MicroLendingWhyGeyserSection.tsx'
import { MICRO_LENDING_HERO_IMAGE_URL } from '@/modules/microLending/utils/constants.ts'
import {
  microLendingFaqItems,
  microLendingSustainableForAllParties,
  microLendingTrustPillars,
} from '@/modules/microLending/utils/mainPageContent.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { getAiSeoPageContent, getPath } from '@/shared/constants'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { standardPadding } from '@/shared/styles/index.ts'

/** Landing page for micro-loans program overview and waitlist signup (layout mirrors Impact Funds main page). */
export const MicroLendingMainPage = () => {
  const seo = getAiSeoPageContent('microLending')
  /** Between major sections; keep ≥ title→body gap inside waitlist / what-is (`spacing={6}` there). */
  const pageSpacing = { base: 10, lg: 12 } as const
  const sectionPrimaryTextColor = useColorModeValue('neutral1.11', 'neutral1.12')
  const sectionSecondaryTextColor = useColorModeValue('neutral1.9', 'neutral1.11')

  const contentContainerProps = {
    w: '100%' as const,
    maxWidth: `${dimensions.maxWidth + 24 * 2}px`,
    mx: 'auto' as const,
    px: standardPadding,
    paddingBottom: { base: 28, lg: 10 } as const,
  }

  return (
    <>
      <Head
        title={seo.title}
        description={seo.description}
        image={MICRO_LENDING_HERO_IMAGE_URL}
        keywords={seo.keywords}
        url={`https://geyser.fund${getPath('discoveryMicroLending')}`}
      />

      <MicroLendingHero />

      <Box {...contentContainerProps}>
        <VStack align="stretch" spacing={pageSpacing} pt={{ base: 6, lg: 8 }}>
          <MicroLendingTrustPillarsSection
            pillars={microLendingTrustPillars}
            sectionPrimaryTextColor={sectionPrimaryTextColor}
            sectionSecondaryTextColor={sectionSecondaryTextColor}
          />

          <MicroLendingWinWinHighlight />

          <MicroLendingSustainableForAllSection
            parties={microLendingSustainableForAllParties}
            sectionPrimaryTextColor={sectionPrimaryTextColor}
            sectionSecondaryTextColor={sectionSecondaryTextColor}
          />

          <MicroLendingWhyGeyserSection
            sectionPrimaryTextColor={sectionPrimaryTextColor}
            sectionSecondaryTextColor={sectionSecondaryTextColor}
          />

          <MicroLendingWaitlistSection />

          <MicroLendingWhatIsSection
            sectionPrimaryTextColor={sectionPrimaryTextColor}
            sectionSecondaryTextColor={sectionSecondaryTextColor}
          />

          <MicroLendingFaqSection
            items={microLendingFaqItems}
            sectionPrimaryTextColor={sectionPrimaryTextColor}
            sectionSecondaryTextColor={sectionSecondaryTextColor}
          />
        </VStack>
        <UserExternalLinksComponent />
      </Box>
    </>
  )
}
