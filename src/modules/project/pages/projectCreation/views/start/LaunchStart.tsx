import { VStack } from '@chakra-ui/react'

import { ProjectCreationReferralCapture } from '../../components/ProjectCreationReferralCapture.tsx'
import { BuildPageSection } from './sections/BuildPageSection.tsx'
import { CreatorToolsSection } from './sections/CreatorToolsSection.tsx'
import { FAQSection } from './sections/FAQSection.tsx'
import { FinalCTASection } from './sections/FinalCTASection.tsx'
import { FundraiserTypeSection } from './sections/FundraiserTypeSection.tsx'
import { HeroSection } from './sections/HeroSection.tsx'
import { LaunchChecklistSection } from './sections/LaunchChecklistSection.tsx'
import { LaunchStrongSection } from './sections/LaunchStrongSection.tsx'
import { MomentumSection } from './sections/MomentumSection.tsx'
import { OverviewSection } from './sections/OverviewSection.tsx'
import { PaymentSetupSection } from './sections/PaymentSetupSection.tsx'

/** How to crowdfund playbook page for the project creation start route. */
export const LaunchStart = () => {
  return (
    <>
      <ProjectCreationReferralCapture />
      <VStack spacing={0} width="100%" align="center" paddingBottom={{ base: 10, lg: 20 }}>
        <HeroSection />
        <OverviewSection />
        <BuildPageSection />
        <FundraiserTypeSection />
        <PaymentSetupSection />
        <CreatorToolsSection />
        <LaunchChecklistSection />
        <LaunchStrongSection />
        <MomentumSection />
        <FAQSection />
        <FinalCTASection />
      </VStack>
    </>
  )
}
