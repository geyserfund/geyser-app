import { Button, Image, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import { Body, H3 } from '@/shared/components/typography/index.ts'
import { getPath } from '@/shared/constants/index.ts'

import { LandingPageSectionTitle } from '../components/LandingPageSectionTitle.tsx'

const AFRIBIT_CASE_STUDY_HERO_IMAGE_URL =
  'https://storage.googleapis.com/geyser-media/impact-funds/afribit-case-study-hero.png'

/** Landing story showing a Circular Grant pilot in action. */
export const CircularGrantSuccessStory = () => (
  <VStack w="full" spacing={6} align="start">
    <LandingPageSectionTitle>{t('Circular Grant Success Story')}</LandingPageSectionTitle>
    <SimpleGrid w="full" columns={{ base: 1, lg: 2 }} spacing={{ base: 5, lg: 8 }}>
      <Image
        src={AFRIBIT_CASE_STUDY_HERO_IMAGE_URL}
        alt={t('Afribit Kibera Circular Grant case study')}
        w="full"
        h={{ base: '220px', lg: '300px' }}
        objectFit="cover"
        borderRadius="card"
      />
      <VStack align="start" justify="center" spacing={4}>
        <H3 size={{ base: 'xl', lg: '2xl' }} bold>
          {t('Afribit Kibera shows the model in motion')}
        </H3>
        <Body size={{ base: 'md', lg: 'lg' }} color="neutralAlpha.11" lineHeight="1.6">
          {t(
            "In Kibera, Circular Grants are being piloted through Afribit's trusted local network, participant validation, and capital return follow-up.",
          )}
        </Body>
        <Button
          as={Link}
          to={getPath('discoveryCircularGrantsAfribitCaseStudy')}
          variant="outline"
          colorScheme="neutral1"
        >
          {t('Read the case study')}
        </Button>
      </VStack>
    </SimpleGrid>
  </VStack>
)
