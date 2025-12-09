import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { DashboardLayout } from '../../common/DashboardLayout.tsx'
import { AmbassadorPayoutsSection } from './sections/AmbassadorPayoutSections.tsx'
import { GetFeaturedSection } from './sections/GetFeaturedSection.tsx'
import { GeyserPromotionSection } from './sections/GeyserPromotionSection.tsx'

/** ProjectDashboardPromote: Page component for managing project promotion settings and ambassadors */
export const ProjectDashboardPromote = () => {
  return (
    <DashboardLayout desktopTitle={t('Promote')}>
      <VStack
        width="100%"
        alignItems="flex-start"
        spacing={6}
        flexGrow={1}
        position="relative"
        paddingX={{ base: 0, lg: 6 }}
      >
        <AmbassadorPayoutsSection />

        <GeyserPromotionSection />

        <GetFeaturedSection />
      </VStack>
    </DashboardLayout>
  )
}
