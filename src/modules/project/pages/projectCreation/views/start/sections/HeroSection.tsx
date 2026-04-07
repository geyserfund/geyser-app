import { Box, Button, HStack, Image, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiRocketLaunch } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H1 } from '@/shared/components/typography/Heading.tsx'

import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'
import { useLaunchNow } from '../utils/useLaunchNow.tsx'

/** Hero section for the launch start page with conversion CTA and flow preview. */
export const HeroSection = () => {
  const { handleLauchNowClick, renderModal } = useLaunchNow()

  const heroSurface = useColorModeValue('white', 'neutral1.2')

  const highlightCards = [
    {
      title: t('Bitcoin is not required to start'),
      imageSrc: 'https://storage.googleapis.com/geyser-projects-media/app/creatorPage/launchStartNow.png',
    },
    {
      title: t('5 minutes to launch'),
      imageSrc: 'https://storage.googleapis.com/geyser-projects-media/app/creatorPage/launchTimer.png',
    },
    {
      title: t('Accessible in 120+ countries'),
      imageSrc: 'https://storage.googleapis.com/geyser-projects-media/app/creatorPage/launchWorldWide.png',
    },
  ]

  const onExploreToolsClick = () => {
    const section = document.getElementById('creator-tools')
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <StartPageSectionShell id="crowdfund-hero" sectionBg={heroSurface}>
        <VStack alignItems="flex-start" spacing={{ base: 5, md: 6 }}>
          <VStack alignItems="flex-start" spacing={3}>
            <H1 size={{ base: '2xl', lg: '4xl' }} bold>
              {t('How to fundraise on Geyser')}
            </H1>
            <Body size={{ base: 'md', lg: 'lg' }} light maxWidth="840px">
              {t(
                'Launching successful fundraisers and campaigns is never easy, we provide you the tools, reach and support you need to succeed.',
              )}
            </Body>
          </VStack>

          <HStack spacing={3} flexWrap="wrap" width="100%">
            <Button
              size="lg"
              colorScheme="primary1"
              onClick={handleLauchNowClick}
              rightIcon={<PiRocketLaunch />}
              borderRadius="12px"
              width={{ base: '100%', sm: 'auto' }}
            >
              {t('Start your project')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              colorScheme="neutral1"
              onClick={onExploreToolsClick}
              width={{ base: '100%', sm: 'auto' }}
            >
              {t('Explore tools')}
            </Button>
          </HStack>

          <Box width="100%" borderRadius="16px" background="transparent" padding={0}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 6, md: 5 }}>
              {highlightCards.map((card) => (
                <Box key={card.title}>
                  <VStack alignItems="center" spacing={3} textAlign="center">
                    <Image
                      src={card.imageSrc}
                      alt={card.title}
                      width="100%"
                      maxWidth={{ base: '320px', md: '360px', lg: '400px' }}
                      height={{ base: '190px', md: '220px', lg: '250px' }}
                      objectFit="contain"
                    />
                    <Body size={{ base: 'sm', md: 'md' }} bold lineHeight="1.4" maxWidth="280px">
                      {card.title}
                    </Body>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </StartPageSectionShell>

      {renderModal()}
    </>
  )
}
