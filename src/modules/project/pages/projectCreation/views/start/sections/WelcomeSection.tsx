import { Box, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'

import { CreationLayoutCard } from '../components/CreationLayoutCard.tsx'
import { DefaultCreationImageURL } from '../utils/urls.ts'

/** Welcome to Geyser section with description and illustration */
export const WelcomeSection = () => {
  return (
    <CreationLayoutCard id="about-geyser">
      <VStack maxW={dimensions.creation.start.maxWidth} alignItems="flex-start">
        <Body size="sm" bold muted>
          {t('ABOUT GEYSER')}
        </Body>

        <H2 size="2xl" bold>
          {t('Welcome to Geyser')}
        </H2>

        <Body size="md">
          {t(
            "Geyser connects you with a global community of Bitcoiners who believe in building real-world impact. Whether you're launching a circular economy, a new product, or a creative idea, Geyser is where adoption happens.",
          )}
        </Body>
      </VStack>

      <Box
        width="100%"
        maxW={dimensions.creation.start.maxWidth}
        height="400px"
        borderRadius="lg"
        overflow="hidden"
        bg="neutral.100"
      >
        <Image
          src={DefaultCreationImageURL}
          alt={t('Community illustration')}
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </Box>
    </CreationLayoutCard>
  )
}
