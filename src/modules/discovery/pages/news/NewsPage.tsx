import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Head } from '@/config/Head.tsx'

import { CommunityUpdatesSection } from './sections/CommunityUpdatesSection.tsx'
import { GeyserNewsSection } from './sections/GeyserNewsSection.tsx'

/** Top-level page at /news showing Geyser announcements and community posts. */
export const NewsPage = () => {
  return (
    <VStack w="full" maxWidth="1200px" alignSelf="center" spacing={16} paddingX={{ base: 4, lg: 8 }} paddingY={10}>
      <Head title={t('News')} />
      <GeyserNewsSection />
      <CommunityUpdatesSection />
    </VStack>
  )
}
