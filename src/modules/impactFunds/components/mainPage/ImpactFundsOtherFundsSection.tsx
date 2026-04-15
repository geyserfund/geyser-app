import { Box, Image, Link as ChakraLink, LinkBox, LinkOverlay, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

import { ImpactFundLearnMoreButton } from './ImpactFundCtas.tsx'

export type OtherFundCard = {
  title: string
  description: string
  image: string
  href: string
  imageFit: 'contain' | 'cover'
}

type ImpactFundsOtherFundsSectionProps = {
  funds: readonly OtherFundCard[]
  sectionSecondaryTextColor: string
  cardImageBg: string
  cardSurfaceBg: string
  interactiveCardShadow: string
  interactiveCardHoverShadow: string
}

/** External “other funds” directory cards. */
export function ImpactFundsOtherFundsSection({
  funds,
  sectionSecondaryTextColor,
  cardImageBg,
  cardSurfaceBg,
  interactiveCardShadow,
  interactiveCardHoverShadow,
}: ImpactFundsOtherFundsSectionProps): JSX.Element {
  return (
    <VStack align="stretch" spacing={6}>
      <VStack align="stretch" spacing={2}>
        <H2 size="xl" bold>
          {t('Other Funds')}
        </H2>
        <Body color={sectionSecondaryTextColor}>
          {t(
            'Impact Funds are focused on distributing smaller amounts to a large number of projects. However, sometimes, projects require larger funding. Below we list other funds that can provide funding for those projects in the Bitcoin space.',
          )}
        </Body>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {funds.map((fund) => (
          <Box
            key={fund.title}
            bg={cardSurfaceBg}
            borderRadius="xl"
            overflow="hidden"
            transition="all 0.25s"
            boxShadow={interactiveCardShadow}
            _hover={{
              transform: 'translateY(-4px)',
              boxShadow: interactiveCardHoverShadow,
              '.learn-more-arrow': {
                opacity: 1,
                transform: 'translateX(0)',
              },
            }}
          >
            <LinkBox h="full">
              <VStack h="full" align="stretch" spacing={0}>
                <Box h={{ base: '220px', lg: '260px' }} bg={cardImageBg} overflow="hidden" p={6}>
                  <Image
                    src={fund.image}
                    alt={fund.title}
                    w="full"
                    h="full"
                    objectFit={fund.imageFit}
                    objectPosition="center"
                  />
                </Box>
                <VStack align="stretch" spacing={4} p={6} flex={1}>
                  <VStack align="stretch" spacing={2}>
                    <H2 size="lg" bold lineHeight={1.2}>
                      <LinkOverlay as={ChakraLink} href={fund.href} isExternal>
                        {fund.title}
                      </LinkOverlay>
                    </H2>
                    <Body size="sm" color={sectionSecondaryTextColor}>
                      {fund.description}
                    </Body>
                  </VStack>
                  <Box mt="auto" display="flex" justifyContent="flex-end">
                    <ImpactFundLearnMoreButton href={fund.href} isExternal />
                  </Box>
                </VStack>
              </VStack>
            </LinkBox>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  )
}
