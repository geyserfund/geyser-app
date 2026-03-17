import { VStack } from '@chakra-ui/react'

import { ProjectCreationReferralCapture } from '../../components/ProjectCreationReferralCapture.tsx'

import { FundingStyleSection } from './sections/FundingStyleSection.tsx'
import { GetDiscoveredSection } from './sections/GetDiscoveredSection.tsx'
import { HeroSection } from './sections/HeroSection.tsx'
import { HowToLaunchSection } from './sections/HowToLaunchSection.tsx'
import { LaunchToolsSection } from './sections/LaunchToolsSection.tsx'
import { SocialFooterSection } from './sections/SocialFooterSection.tsx'
import { SuccessStoriesSection } from './sections/SuccessStoriesSection.tsx'
import { TipsStoriesSection } from './sections/TipsStoriesSection.tsx'
import { WelcomeSection } from './sections/WelcomeSection.tsx'

/** Launch your project landing page component */
export const LaunchStart = () => {
  return (
    <>
      <ProjectCreationReferralCapture />
      <VStack spacing={0} paddingBottom={20} width="100%" align="center">
        <HeroSection />
        <WelcomeSection />
        <SuccessStoriesSection />
        <FundingStyleSection />
        <GetDiscoveredSection />
        <HowToLaunchSection />
        <LaunchToolsSection />
        <TipsStoriesSection />
        <SocialFooterSection />
      </VStack>
    </>
  )
}
