import { Box, Button, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowRight } from 'react-icons/pi'
import { Link } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'

import { creatorPossibilities } from '../constants.ts'
import { CreatorSectionContainer } from './CreatorSectionContainer.tsx'

/** Possibility section helping visitors imagine what they can build on Geyser. */
export const CreatorPossibilitySection = () => {
  const sectionBackground = useColorModeValue('utils.pbg', 'utils.pbg')
  const cardBackground = useColorModeValue('neutral1.2', 'neutral1.2')
  const cardBorderColor = useColorModeValue('neutral1.6', 'neutral1.6')
  const quoteBackground = useColorModeValue('primary1.2', 'primary1.3')
  const quoteBorderColor = useColorModeValue('primary1.5', 'primary1.6')

  return (
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
                'Big vision or small beginning, Geyser has room for every scale of ambition. Show up with your idea and find the people waiting for it.',
              )}
            </Body>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {creatorPossibilities.map((possibility) => (
              <Box
                key={possibility.title}
                p={5}
                borderWidth="1px"
                borderColor={cardBorderColor}
                borderRadius="xl"
                backgroundColor={cardBackground}
              >
                <VStack align="start" spacing={2}>
                  <Body size="lg" fontWeight={700}>
                    {t(possibility.title)}
                  </Body>
                  <Body size="sm" color="neutral1.10">
                    {t(possibility.description)}
                  </Body>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>

          <Box
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={quoteBorderColor}
            backgroundColor={quoteBackground}
            px={{ base: 5, lg: 8 }}
            py={{ base: 6, lg: 7 }}
          >
            <VStack align={{ base: 'start', lg: 'center' }} spacing={4}>
              <Body size={{ base: 'xl', lg: '2xl' }} fontStyle="italic" color="neutral1.11">
                {t('An idea worth sharing deserves a community worth having.')}
              </Body>
              <Button
                as={Link}
                to={getPath('launchProjectDetails')}
                size="lg"
                colorScheme="primary1"
                rightIcon={<PiArrowRight />}
              >
                {t('Start your project')}
              </Button>
            </VStack>
          </Box>
        </VStack>
      </CreatorSectionContainer>
    </Box>
  )
}
