import { Box, Button, Icon, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiRocketLaunch } from 'react-icons/pi'

import { useLaunchNow } from '@/modules/project/pages/projectCreation/views/start/utils/useLaunchNow.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

import { creatorPossibilities } from '../constants.ts'
import { CreatorSectionContainer } from './CreatorSectionContainer.tsx'

const getAlphaColor = (hexColor: string, alpha: number) => {
  const color = hexColor.trim().replace('#', '')

  if (color.length !== 6) {
    return `rgba(255, 255, 255, ${alpha})`
  }

  const red = Number.parseInt(color.slice(0, 2), 16)
  const green = Number.parseInt(color.slice(2, 4), 16)
  const blue = Number.parseInt(color.slice(4, 6), 16)
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

/** Possibility section helping visitors imagine what they can build on Geyser. */
export const CreatorPossibilitySection = () => {
  const { handleLauchNowClick, renderModal } = useLaunchNow()

  const sectionBackground = useColorModeValue('utils.pbg', 'utils.pbg')
  const cardBackground = useColorModeValue('white', 'white')
  const cardShadow = useColorModeValue('0 8px 20px rgba(16, 24, 40, 0.08)', '0 10px 24px rgba(0, 0, 0, 0.3)')
  const quoteBackground = useColorModeValue(
    'linear(135deg, rgba(0,245,220,0.06) 0%, rgba(0,245,220,0.02) 100%)',
    'linear(135deg, rgba(0,245,220,0.1) 0%, rgba(0,245,220,0.05) 100%)',
  )
  const quoteBorderColor = useColorModeValue('rgba(0,245,220,0.2)', 'rgba(0,245,220,0.25)')

  return (
    <>
      <Box as="section" w="full" py={{ base: 14, lg: 20 }} backgroundColor={sectionBackground}>
        <CreatorSectionContainer>
          <VStack align="stretch" spacing={{ base: 7, lg: 10 }}>
            <VStack align={{ base: 'start', lg: 'center' }} spacing={3}>
              <Body size="sm" color="primary1.9" fontWeight={700} textTransform="uppercase" letterSpacing="0.09em">
                {t('What you can build here')}
              </Body>
              <H2 size={{ base: '2xl', lg: '4xl' }} bold textAlign={{ base: 'left', lg: 'center' }}>
                {t('What could you bring to life?')}
              </H2>
              <Body size="md" color="neutral1.10" maxW="620px" textAlign={{ base: 'left', lg: 'center' }}>
                {t(
                  "Geyser has room for every scale of ambition. Show up with your idea and find the people who've been waiting for it.",
                )}
              </Body>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {creatorPossibilities.map((possibility) => {
                const iconBadgeBackground = getAlphaColor(possibility.iconColor, 0.2)
                const iconBadgeBorderColor = getAlphaColor(possibility.iconColor, 0.35)

                return (
                  <Box
                    key={possibility.title}
                    p={6}
                    borderWidth="1px"
                    borderColor={possibility.borderColor}
                    borderRadius="xl"
                    backgroundColor={cardBackground}
                    boxShadow={cardShadow}
                    transition="transform 0.2s ease"
                    _hover={{ transform: 'translateY(-3px)' }}
                  >
                    <VStack align="start" spacing={3}>
                      <Box
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="center"
                        w="44px"
                        h="44px"
                        borderRadius="12px"
                        backgroundColor={iconBadgeBackground}
                        borderWidth="1px"
                        borderColor={iconBadgeBorderColor}
                      >
                        <Icon as={possibility.icon} boxSize={5} color={possibility.iconColor} />
                      </Box>
                      <Body size="lg" fontWeight={700}>
                        {t(possibility.title)}
                      </Body>
                      <Body size="sm" color="neutral1.10">
                        {t(possibility.description)}
                      </Body>
                    </VStack>
                  </Box>
                )
              })}
            </SimpleGrid>

            <Box
              borderRadius="2xl"
              borderWidth="1px"
              borderColor={quoteBorderColor}
              background={quoteBackground}
              px={{ base: 5, lg: 8 }}
              py={{ base: 6, lg: 7 }}
            >
              <VStack align={{ base: 'start', lg: 'center' }} spacing={4}>
                <Body
                  size={{ base: 'xl', lg: '2xl' }}
                  fontStyle="italic"
                  color="neutral1.11"
                  textAlign={{ lg: 'center' }}
                >
                  {t('An idea worth sharing deserves a community worth having.')}
                </Body>
                <Button
                  onClick={handleLauchNowClick}
                  size="lg"
                  colorScheme="primary1"
                  rightIcon={<PiRocketLaunch />}
                  px={8}
                >
                  {t('Start your project today')}
                </Button>
              </VStack>
            </Box>
          </VStack>
        </CreatorSectionContainer>
      </Box>
      {renderModal()}
    </>
  )
}
