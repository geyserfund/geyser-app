import { Button, Flex, Icon, Image, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowRight, PiGlobeHemisphereWest } from 'react-icons/pi'
import { Link } from 'react-router'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/config/routerPaths.ts'

const LABIF_MAP_IMAGE_URL = '/images/impact-funds/labif-latin-america-map.png'

/** Landing-page CTA for projects applying to the Latin America Bitcoin Impact Fund. */
export const LatamImpactFundApplication = () => {
  const surfaceBg = useColorModeValue('amber.2', 'neutral1.3')
  const borderColor = useColorModeValue('amber.5', 'neutral1.6')

  return (
    <CardLayout
      bg={surfaceBg}
      borderColor={borderColor}
      borderRadius="3xl"
      p={{ base: 5, md: 7, lg: 8 }}
      overflow="hidden"
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'flex-start', md: 'center' }}
        justify="space-between"
        gap={{ base: 6, md: 8, lg: 10 }}
      >
        <VStack align="flex-start" spacing={4} maxW="720px" flex="1" zIndex={1}>
          <Flex align="center" justify="center" boxSize={11} borderRadius="full" bg="amber.4">
            <Icon as={PiGlobeHemisphereWest} boxSize={6} color="amber.11" aria-hidden />
          </Flex>
          <H2 size={{ base: '2xl', lg: '3xl' }} bold sx={{ textWrap: 'balance' }}>
            {t('Building a Bitcoin project in Latin America?')}
          </H2>
          <Body size={{ base: 'md', lg: 'lg' }} color="neutralAlpha.11" lineHeight="1.6">
            {t(
              'The Latin America Bitcoin Impact Fund is accepting applications from high-impact projects across the region.',
            )}
          </Body>
          <Button
            as={Link}
            to={getPath('discoveryImpactFund', 'latam-impact-fund')}
            size="lg"
            colorScheme="amber"
            rightIcon={<Icon as={PiArrowRight} />}
          >
            {t('Apply to LABIF')}
          </Button>
        </VStack>

        <Image
          src={LABIF_MAP_IMAGE_URL}
          alt={t('Colorful map of Latin America')}
          w={{ base: 'full', md: '320px', lg: '380px' }}
          h={{ base: '220px', md: '240px', lg: '280px' }}
          objectFit="contain"
          flexShrink={0}
          order={{ base: 1, md: 2 }}
        />
      </Flex>
    </CardLayout>
  )
}
