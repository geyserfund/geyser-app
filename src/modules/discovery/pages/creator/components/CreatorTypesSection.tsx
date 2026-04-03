import { Box, Grid, Icon, Image, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

import { creatorCategories } from '../constants.ts'
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

/** Creator category grid that highlights who the page is built for. */
export const CreatorTypesSection = () => {
  const sectionBackground = useColorModeValue('neutral1.2', 'neutral1.2')
  const cardBorderColor = useColorModeValue('neutral1.6', 'neutral1.6')
  const cardOverlay = useColorModeValue(
    'linear(to-t, rgba(14, 20, 18, 0.88), rgba(14, 20, 18, 0.08))',
    'linear(to-t, rgba(8, 12, 11, 0.9), rgba(8, 12, 11, 0.2))',
  )
  const captionBackground = useColorModeValue('primary1.1', 'primary1.2')
  const captionBorderColor = useColorModeValue('primary1.5', 'primary1.6')

  return (
    <Box as="section" w="full" py={{ base: 14, lg: 20 }} backgroundColor={sectionBackground}>
      <CreatorSectionContainer>
        <VStack align="stretch" spacing={{ base: 8, lg: 10 }}>
          <VStack align="start" spacing={3} maxW={{ base: 'full', lg: '640px' }}>
            <Body size="sm" color="primary1.9" fontWeight={700} textTransform="uppercase" letterSpacing="0.09em">
              {t('Who Geyser is for')}
            </Body>
            <H2 size={{ base: '2xl', lg: '4xl' }} bold>
              {t('Every kind of creator')}
              <br />
              {t('is welcome here')}
            </H2>
            <Body size="md" color="neutral1.10">
              {t(
                'From a filmmaker with a story to tell, to a developer building open-source Bitcoin tools, this is for anyone with a vision and a community to serve.',
              )}
            </Body>
          </VStack>

          <Grid
            templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, minmax(0, 1fr))' }}
            gap={{ base: 4, lg: 5 }}
            alignItems="stretch"
          >
            {creatorCategories.map((category) => {
              const iconBadgeBackground = getAlphaColor(category.iconColor, 0.2)
              const iconBadgeBorderColor = getAlphaColor(category.iconColor, 0.45)
              const colorOverlay = getAlphaColor(category.iconColor, 0.12)
              const hoverBorderColor = getAlphaColor(category.iconColor, 0.45)

              return (
                <Box
                  key={category.title}
                  role="group"
                  position="relative"
                  overflow="hidden"
                  borderRadius="2xl"
                  minH={{ base: '230px', lg: '260px' }}
                  borderWidth="1px"
                  borderColor={cardBorderColor}
                  transition="all 0.25s ease"
                  _hover={{ transform: 'translateY(-4px)', borderColor: hoverBorderColor }}
                >
                  <Image
                    src={category.imageUrl}
                    alt={t('{{name}} creators', { name: category.title })}
                    w="full"
                    h="full"
                    objectFit="cover"
                    position="absolute"
                    inset={0}
                    transition="transform 0.35s ease"
                    _groupHover={{ transform: 'scale(1.06)' }}
                  />
                  <Box position="absolute" inset={0} bgGradient={cardOverlay} />
                  <Box
                    position="absolute"
                    inset={0}
                    backgroundColor={colorOverlay}
                    opacity={0}
                    transition="opacity 0.25s ease"
                    _groupHover={{ opacity: 1 }}
                  />
                  <VStack position="absolute" bottom={0} left={0} right={0} align="start" spacing={1.5} px={5} py={4}>
                    <Box
                      w="40px"
                      h="40px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="10px"
                      backgroundColor={iconBadgeBackground}
                      borderWidth="1px"
                      borderColor={iconBadgeBorderColor}
                    >
                      <Icon as={category.icon} boxSize={5} color={category.iconColor} />
                    </Box>
                    <Body color="white" size="lg" fontWeight={700}>
                      {t(category.title)}
                    </Body>
                    <Body color="whiteAlpha.900" size="sm">
                      {t(category.description)}
                    </Body>
                  </VStack>
                </Box>
              )
            })}
          </Grid>

          <Box
            borderRadius="xl"
            borderWidth="1px"
            borderColor={captionBorderColor}
            backgroundColor={captionBackground}
            px={{ base: 5, lg: 8 }}
            py={{ base: 4, lg: 5 }}
            textAlign="center"
          >
            <Body size={{ base: 'lg', lg: 'xl' }} fontStyle="italic" color="neutral1.11">
              {t('You do not need to fit one mold to belong here.')}
            </Body>
          </Box>
        </VStack>
      </CreatorSectionContainer>
    </Box>
  )
}
