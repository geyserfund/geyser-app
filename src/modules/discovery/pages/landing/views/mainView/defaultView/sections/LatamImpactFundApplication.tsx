import { Button, Flex, Icon, Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowRight } from 'react-icons/pi'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/config/routerPaths.ts'
import { standardPadding } from '@/shared/styles/index.ts'

import { LANDING_FEATURE_IMAGE_RATIO } from './CircularGrantsMission.tsx'

const LABIF_MAP_IMAGE_URL =
  'https://storage.googleapis.com/geyser-media/impact-funds/wave-halftone-map-of-latam-center-beige-bg.png'

/** Landing-page CTA for projects applying to the Latin America Bitcoin Impact Fund. */
export const LatamImpactFundApplication = () => {
  return (
    <CardLayout
      dense
      hover
      w="full"
      h="full"
      spacing={0}
      to={getPath('discoveryImpactFund', 'latam-impact-fund')}
      _hover={{ textDecoration: 'none', cursor: 'pointer', borderColor: 'neutral1.9' }}
    >
      <Image
        src={LABIF_MAP_IMAGE_URL}
        alt={t('Colorful map of Latin America')}
        w="full"
        aspectRatio={LANDING_FEATURE_IMAGE_RATIO}
        objectFit="cover"
        loading="lazy"
      />
      <VStack align="stretch" spacing={3} flex={1} padding={standardPadding}>
        <H2 size={{ base: 'xl', lg: '2xl' }} bold sx={{ textWrap: 'balance' }}>
          {t('Building a Bitcoin project in Latin America?')}
        </H2>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'flex-start', md: 'flex-end' }}
          justify="space-between"
          gap={{ base: 4, md: 6 }}
        >
          <Body size="md" light>
            {t(
              'The Latin America Bitcoin Impact Fund is accepting applications from high-impact projects across the region.',
            )}
          </Body>
          {/* The whole card is the link, so the button is presentational */}
          <Button
            as="span"
            flexShrink={0}
            alignSelf={{ base: 'flex-end', md: 'auto' }}
            size="lg"
            colorScheme="primary1"
            rightIcon={<Icon as={PiArrowRight} />}
          >
            {t('Apply to LABIF')}
          </Button>
        </Flex>
      </VStack>
    </CardLayout>
  )
}
