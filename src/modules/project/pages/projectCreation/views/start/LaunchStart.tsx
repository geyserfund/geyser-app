import { VStack } from '@chakra-ui/react'

import { ProjectCreationReferralCapture } from '../../components/ProjectCreationReferralCapture.tsx'
import { CreatorToolsSection } from './sections/CreatorToolsSection.tsx'
import { FAQSection } from './sections/FAQSection.tsx'
import { FinalCTASection } from './sections/FinalCTASection.tsx'
import { FundamentalsSection } from './sections/FundamentalsSection.tsx'
import { FundraiserTypeSection } from './sections/FundraiserTypeSection.tsx'
import { HeroSection } from './sections/HeroSection.tsx'
import { LaunchPlansSection } from './sections/LaunchPlansSection.tsx'
import { MomentumSection } from './sections/MomentumSection.tsx'
import { ResourcesSection } from './sections/ResourcesSection.tsx'
import { TrustPayoutSection } from './sections/TrustPayoutSection.tsx'

/** How to crowdfund playbook page for the project creation start route. */
export const LaunchStart = () => {
  return (
    <>
      <ProjectCreationReferralCapture />
      <VStack spacing={0} width="100%" align="center" paddingBottom={{ base: 10, lg: 20 }}>
        <HeroSection />
        <FundamentalsSection />
        <FundraiserTypeSection />
        <TrustPayoutSection />
        <CreatorToolsSection />
        <MomentumSection />
        <LaunchPlansSection />
        <ResourcesSection />
        <FAQSection />
        <FinalCTASection />
      </VStack>
    </>
  )
}
