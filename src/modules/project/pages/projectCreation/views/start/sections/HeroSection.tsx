import { Button, HStack, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { H1, H2 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'

import { CreationLayoutCard } from '../components/CreationLayoutCard.tsx'
import { useLaunchNow } from '../utils/useLaunchNow.tsx'

/** Hero section with title, subtitle, and navigation links */
export const HeroSection = () => {
  const { handleLauchNowClick, renderModal } = useLaunchNow()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <CreationLayoutCard maxWidth={dimensions.maxWidth} paddingY={4}>
        <VStack spacing={0}>
          <H1 size={{ base: 'xl', lg: '4xl' }} textAlign="center" bold>
            {t('The crowdfunding platform built by Bitcoiners, for Bitcoiners.')}
          </H1>
          <H2 size={{ base: 'md', lg: 'xl' }} textAlign="center">
            {' '}
            {t('Bring your idea to life and tap into a global community ready to back you.')}
          </H2>
        </VStack>

        <Button
          variant="solid"
          colorScheme="primary1"
          paddingY={{ base: 6, lg: 8 }}
          paddingX={{ base: 6, lg: 8 }}
          borderRadius={{ base: '12px', lg: '18px' }}
          _hover={{ backgroundColor: 'primary1.9', color: 'utils.blackContrast', shadow: 'lg' }}
          onClick={handleLauchNowClick}
        >
          <H1 size="2xl" textAlign="center" bold>
            {t('Launch your project')}
          </H1>
        </Button>

        <HStack spacing={6}>
          <Link
            onClick={() => scrollToSection('about-geyser')}
            cursor="pointer"
            fontSize="md"
            fontWeight="medium"
            textDecoration="underline"
          >
            {t('About Geyser')}
          </Link>
          <Link
            onClick={() => scrollToSection('how-it-works')}
            cursor="pointer"
            fontSize="md"
            fontWeight="medium"
            textDecoration="underline"
          >
            {t('How it works')}
          </Link>
          <Link
            onClick={() => scrollToSection('how-to-launch')}
            cursor="pointer"
            fontSize="md"
            fontWeight="medium"
            textDecoration="underline"
          >
            {t('How to launch')}
          </Link>
        </HStack>
      </CreationLayoutCard>
      {renderModal()}
    </>
  )
}
