import { Box, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Head } from '@/config/Head.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath } from '@/shared/constants/index.ts'

import { CreatorCommunitySection } from './components/CreatorCommunitySection.tsx'
import { CreatorFinalCtaSection } from './components/CreatorFinalCtaSection.tsx'
import { CreatorHeroSection } from './components/CreatorHeroSection.tsx'
import { CreatorPossibilitySection } from './components/CreatorPossibilitySection.tsx'
import { CreatorSuccessStoriesSection } from './components/CreatorSuccessStoriesSection.tsx'
import { CreatorTypesSection } from './components/CreatorTypesSection.tsx'
import { CreatorWelcomeSection } from './components/CreatorWelcomeSection.tsx'

/** Creator landing page focused on community storytelling and launch conversion. */
export const CreatorPage = () => {
  return (
    <Box w="full">
      <Head
        title={t('Creator Page')}
        description={t('Join the Geyser creator community and rally support for your next meaningful project.')}
        url={`https://geyser.fund${getPath('discoveryCreator')}`}
      />

      <VStack
        w="full"
        spacing={0}
        align="stretch"
        mt={{
          base: `-${dimensions.topNavBar.mobile.height}px`,
          lg: `-${dimensions.topNavBar.desktop.height}px`,
        }}
      >
        <CreatorHeroSection />
        <CreatorWelcomeSection />
        <CreatorTypesSection />
        <CreatorCommunitySection />
        <CreatorSuccessStoriesSection />
        <CreatorPossibilitySection />
        <CreatorFinalCtaSection />
      </VStack>
    </Box>
  )
}
