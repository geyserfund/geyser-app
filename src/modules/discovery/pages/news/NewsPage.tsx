import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Head } from '@/config/Head.tsx'
import { PageSectionHeader } from '@/shared/components/layouts/PageSectionHeader.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { standardPadding } from '@/shared/styles'

import { CommunityUpdatesSection } from './sections/CommunityUpdatesSection.tsx'
import { GeyserNewsSection } from './sections/GeyserNewsSection.tsx'
import { NewsNewsletterSection } from './sections/NewsNewsletterSection.tsx'

/** Top-level page at /news showing Geyser announcements and community posts. */
export const NewsPage = () => {
  return (
    <VStack
      w="full"
      maxWidth={`${dimensions.maxWidth + 24 * 2}px`}
      alignSelf="center"
      spacing={{ base: 8, lg: 10 }}
      paddingX={standardPadding}
      paddingBottom={10}
    >
      <Head
        title={t('News')}
        description={t('Read updates from Geyser and discover recent community posts across the platform.')}
      />
      <PageSectionHeader
        title={t('News')}
        subtitle={t('Read updates from Geyser and discover recent community posts across the platform.')}
      />
      <NewsNewsletterSection />
      <GeyserNewsSection />
      <CommunityUpdatesSection />
    </VStack>
  )
}
