import { Box, Button, Flex, HStack, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Fragment, useMemo } from 'react'
import { PiRocket } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H1 } from '@/shared/components/typography/Heading.tsx'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'
import { getHeroSteps } from '../utils/startPageContent.ts'
import { useLaunchNow } from '../utils/useLaunchNow.tsx'

/** Hero section for the launch start page with conversion CTA and flow preview. */
export const HeroSection = () => {
  const { handleLauchNowClick, renderModal } = useLaunchNow()

  const heroSurface = useColorModeValue('white', 'neutral1.2')
  const stepNumberBg = useColorModeValue('primary1.9', 'primary1.8')
  const stepConnectorColor = useColorModeValue('neutral1.5', 'neutral1.6')
  const heroStripCardBg = useColorModeValue('white', 'neutral1.2')

  const stepItems = useMemo(() => getHeroSteps(t), [])

  const onExploreToolsClick = () => {
    const section = document.getElementById('creator-tools')
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <StartPageSectionShell id="crowdfund-hero" sectionBg={heroSurface}>
        <VStack alignItems="flex-start" spacing={6}>
          <VStack alignItems="flex-start" spacing={3}>
            <H1 size={{ base: '2xl', lg: '4xl' }} bold>
              {t('How to fundraise on Geyser')}
            </H1>
            <Body size={{ base: 'md', lg: 'lg' }} maxWidth="840px">
              {t('Start with your idea, build a clear page, then launch with momentum using tools made for creators.')}
            </Body>
          </VStack>

          <HStack spacing={3} flexWrap="wrap">
            <Button size="lg" colorScheme="primary1" onClick={handleLauchNowClick} leftIcon={<PiRocket />}>
              {t('Launch your project')}
            </Button>
            <Button size="lg" variant="outline" colorScheme="neutral1" onClick={onExploreToolsClick}>
              {t('Explore tools')}
            </Button>
          </HStack>

          <PlaybookCard width="100%" backgroundColor={heroStripCardBg}>
            <Body size="xs" bold muted textTransform="uppercase" marginBottom={3}>
              {t('How it works')}
            </Body>

            <VStack display={{ base: 'flex', md: 'none' }} alignItems="stretch" spacing={0}>
              {stepItems.map((label, index) => (
                <Fragment key={label}>
                  <HStack alignItems="center" spacing={3} paddingY={2}>
                    <Flex
                      width="28px"
                      height="28px"
                      borderRadius="full"
                      alignItems="center"
                      justifyContent="center"
                      backgroundColor={stepNumberBg}
                      color="utils.blackContrast"
                      fontWeight={700}
                      fontSize="xs"
                    >
                      {index + 1}
                    </Flex>
                    <Body size="sm" lineHeight="1.3">
                      {label}
                    </Body>
                  </HStack>
                  {index < stepItems.length - 1 ? (
                    <Box height="1px" marginY={1} marginLeft="14px" backgroundColor={stepConnectorColor} />
                  ) : null}
                </Fragment>
              ))}
            </VStack>

            <HStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing={0} width="100%">
              {stepItems.map((label, index) => (
                <Fragment key={label}>
                  <VStack alignItems="center" spacing={2} minWidth={0}>
                    <Flex
                      width="28px"
                      height="28px"
                      borderRadius="full"
                      alignItems="center"
                      justifyContent="center"
                      backgroundColor={stepNumberBg}
                      color="utils.blackContrast"
                      fontWeight={700}
                      fontSize="xs"
                    >
                      {index + 1}
                    </Flex>
                    <Body size="xs" lineHeight="1.3" textAlign="center">
                      {label}
                    </Body>
                  </VStack>
                  {index < stepItems.length - 1 ? (
                    <Box flex={1} height="1px" marginTop="14px" marginX={3} backgroundColor={stepConnectorColor} />
                  ) : null}
                </Fragment>
              ))}
            </HStack>
          </PlaybookCard>
        </VStack>
      </StartPageSectionShell>

      {renderModal()}
    </>
  )
}
