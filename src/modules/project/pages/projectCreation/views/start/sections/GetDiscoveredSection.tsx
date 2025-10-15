import { SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'

import { CreationIllustrationCard } from '../components/CreationIllustrationCard.tsx'
import { CreationLayoutCard } from '../components/CreationLayoutCard.tsx'
import {
  GetDiscoveredIllutration1URL,
  GetDiscoveredIllutration2URL,
  GetDiscoveredIllutration3URL,
} from '../utils/urls.ts'

type DiscoveryFeature = {
  title: string
  description: string
  image: string
}

const features: DiscoveryFeature[] = [
  {
    title: t('Newsletter & Landing page'),
    description: t('Get seen by thousands of Bitcoiners globally.'),
    image: GetDiscoveredIllutration1URL,
  },
  {
    title: t('Ambassadors'),
    description: t('Spread the word and earn a dynamic share of contributions.'),
    image: GetDiscoveredIllutration2URL,
  },
  {
    title: t('Innovator network'),
    description: t('Access the Geyser network to supercharge your project.'),
    image: GetDiscoveredIllutration3URL,
  },
]

/** Get discovered section with three feature cards */
export const GetDiscoveredSection = () => {
  return (
    <CreationLayoutCard>
      <VStack maxW={dimensions.creation.start.maxWidth} alignItems="flex-start">
        <H2 size="2xl" bold>
          {t('Get discovered')}
        </H2>

        <Body size="md">
          {t(
            'With 50,000+ Bitcoiners on Geyser, your project gets instant visibility in a passionate global community. Boost your reach further through:',
          )}
        </Body>
      </VStack>

      <SimpleGrid columns={[1, 3]} spacing={8} width="100%" maxW={dimensions.creation.start.maxWidth}>
        {features.map((feature) => (
          <CreationIllustrationCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            image={feature.image}
          />
        ))}
      </SimpleGrid>
    </CreationLayoutCard>
  )
}
