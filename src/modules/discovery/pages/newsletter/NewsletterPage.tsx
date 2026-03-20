import { Box, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Head } from '@/config/Head'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath } from '@/shared/constants/config/routerPaths.ts'
import { standardPadding } from '@/shared/styles'

import { ContentPillarsGrid } from './components/ContentPillarsGrid.tsx'
import { NewsletterHero } from './components/NewsletterHero.tsx'

const NEWSLETTER_DESCRIPTION = t(
  "There's a huge amount happening across the Bitcoin ecosystem that most people never see. We surface those stories in one place — adoption, community, new projects, and more.",
)

/** Standalone newsletter signup page with hero CTA, content pillars and "why subscribe" section. */
export const NewsletterPage = () => {
  const pageBg = useColorModeValue('white', 'utils.pbg')

  return (
    <>
      <Head
        title={t('Geyser Newsletter')}
        description={NEWSLETTER_DESCRIPTION}
        url={`https://geyser.fund${getPath('newsletter')}`}
      />

      <Box w="full" bg={pageBg}>
        <VStack spacing={{ base: 10, lg: 14 }} pt={{ base: 10, lg: 14 }} pb={{ base: 16, lg: 20 }}>
          <Box w="full" px={standardPadding} maxW={dimensions.guardians.textMaxWidth} mx="auto">
            <NewsletterHero />
          </Box>

          <Box w="full" px={standardPadding} maxW={dimensions.guardians.textMaxWidth} mx="auto">
            <ContentPillarsGrid />
          </Box>
        </VStack>
      </Box>
    </>
  )
}
