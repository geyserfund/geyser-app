import { Box, Flex, Image, Link as ChakraLink, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

import { ImpactFundsBecomeFundSponsorSection } from './ImpactFundsBecomeFundSponsorSection.tsx'

export type FundSponsorLogo = {
  id: string
  name: string
  image?: string | null
  url?: string | null
}

type ImpactFundsFundSponsorsSectionProps = {
  sponsors: readonly FundSponsorLogo[]
  sectionPrimaryTextColor: string
  sectionSecondaryTextColor: string
  sectionMutedTextColor: string
  cardSurfaceBg: string
}

/** Aggregated sponsor logos from live funds (deduped by id), plus Become a Fund Sponsor CTA in the same section. */
export function ImpactFundsFundSponsorsSection({
  sponsors,
  sectionPrimaryTextColor,
  sectionSecondaryTextColor,
  sectionMutedTextColor,
  cardSurfaceBg,
}: ImpactFundsFundSponsorsSectionProps): JSX.Element {
  return (
    <VStack align="stretch" spacing={{ base: 6, md: 8 }}>
      <H2 size="2xl" bold color={sectionPrimaryTextColor}>
        {t('Fund Sponsors')}
      </H2>
      {sponsors.length === 0 ? (
        <Body color={sectionSecondaryTextColor}>{t('Sponsor logos will appear here as funds add partners.')}</Body>
      ) : (
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 6, md: 8 }} w="full">
          {sponsors.map((sponsor) => {
            const logo = sponsor.image ? (
              <Image
                src={sponsor.image}
                alt={sponsor.name}
                maxH={{ base: '64px', sm: '72px', md: '88px' }}
                w="auto"
                maxW="full"
                objectFit="contain"
              />
            ) : (
              <Body size="sm" bold color={sectionPrimaryTextColor} textAlign="center">
                {sponsor.name}
              </Body>
            )
            const inner = (
              <Flex w="full" align="center" justify="center" py={2}>
                {logo}
              </Flex>
            )
            return (
              <Box key={sponsor.id}>
                {sponsor.url ? (
                  <ChakraLink href={sponsor.url} isExternal _hover={{ textDecoration: 'none' }}>
                    {inner}
                  </ChakraLink>
                ) : (
                  inner
                )}
              </Box>
            )
          })}
        </SimpleGrid>
      )}

      <ImpactFundsBecomeFundSponsorSection
        sectionPrimaryTextColor={sectionPrimaryTextColor}
        sectionSecondaryTextColor={sectionSecondaryTextColor}
        sectionMutedTextColor={sectionMutedTextColor}
        cardSurfaceBg={cardSurfaceBg}
      />
    </VStack>
  )
}
