import {
  Avatar,
  Box,
  Flex,
  HStack,
  Image,
  Link as ChakraLink,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants'

import { ImpactFundLearnMoreButton } from './ImpactFundCtas.tsx'
import type { FundSponsorLogo } from './ImpactFundsFundSponsorsSection.tsx'

type AmountParts = {
  primary: string
  secondary?: string | null
}

type ImpactFundsFeaturedPartnerFundSectionProps = {
  fundName: string
  title: string
  heroImage?: string | null
  cardImageBg: string
  amountDisplay: AmountParts | null
  sponsors: readonly FundSponsorLogo[]
  sectionPrimaryTextColor: string
  sectionSecondaryTextColor: string
  sectionMutedTextColor: string
  interactiveCardShadow: string
  interactiveCardHoverShadow: string
}

/** Full-width featured partner fund card (image + title + committed amount + live sponsors). */
export function ImpactFundsFeaturedPartnerFundSection({
  fundName,
  title,
  heroImage,
  cardImageBg,
  amountDisplay,
  sponsors,
  sectionPrimaryTextColor,
  sectionSecondaryTextColor,
  sectionMutedTextColor,
  interactiveCardShadow,
  interactiveCardHoverShadow,
}: ImpactFundsFeaturedPartnerFundSectionProps): JSX.Element {
  const sponsorRowBorderColor = useColorModeValue('neutral1.3', 'whiteAlpha.200')
  const fundPath = getPath('impactFunds', encodeURIComponent(fundName))

  return (
    <VStack align="stretch" spacing={4}>
      <VStack align="stretch" spacing={2}>
        <H2 size="2xl" bold color={sectionPrimaryTextColor}>
          {t('Partner Funds')}
        </H2>
        <Body color={sectionSecondaryTextColor} maxW="3xl">
          {t('Partner Funds are joint funding initiatives funded through our Fund Partners.')}
        </Body>
      </VStack>

      <CardLayout
        dense
        noborder
        p={0}
        w="full"
        minH={{ base: '400px', lg: '480px' }}
        overflow="hidden"
        borderRadius="12px"
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
        <VStack spacing={0} align="stretch" h="full">
          <LinkBox as="div" flex={1} display="flex" flexDirection="column" minH={0}>
            <VStack w="full" h="full" spacing={0} align="stretch" flex={1}>
              <Box h={{ base: '220px', lg: '280px' }} bg={cardImageBg} overflow="hidden" flexShrink={0}>
                {heroImage ? (
                  <Image
                    src={heroImage}
                    alt=""
                    w="full"
                    h="full"
                    display="block"
                    objectFit="cover"
                    objectPosition="center"
                  />
                ) : null}
              </Box>
              <Flex
                w="full"
                px={{ base: 5, md: 8 }}
                py={6}
                bg="utils.pbg"
                align={{ base: 'stretch', md: 'center' }}
                justify="space-between"
                gap={4}
                direction={{ base: 'column', md: 'row' }}
                flex={1}
              >
                <H2 size="xl" bold lineHeight={1.2} flex={1}>
                  <LinkOverlay as={Link} to={fundPath}>
                    {title}
                  </LinkOverlay>
                </H2>
                <HStack
                  spacing={6}
                  align="center"
                  flexShrink={0}
                  flexWrap="wrap"
                  justify={{ base: 'flex-start', md: 'flex-end' }}
                >
                  {amountDisplay ? (
                    <VStack align={{ base: 'start', md: 'end' }} spacing={0}>
                      <Body
                        size="lg"
                        bold
                        whiteSpace="nowrap"
                        lineHeight={1.2}
                        textAlign={{ base: 'left', md: 'right' }}
                        color={sectionPrimaryTextColor}
                      >
                        {amountDisplay.primary}
                      </Body>
                      {amountDisplay.secondary ? (
                        <Body
                          size="sm"
                          whiteSpace="nowrap"
                          lineHeight={1.2}
                          textAlign={{ base: 'left', md: 'right' }}
                          color={sectionMutedTextColor}
                        >
                          {amountDisplay.secondary}
                        </Body>
                      ) : null}
                    </VStack>
                  ) : null}
                  {sponsors.length === 0 ? <ImpactFundLearnMoreButton to={fundPath} /> : null}
                </HStack>
              </Flex>
            </VStack>
          </LinkBox>

          {sponsors.length > 0 ? (
            <Box px={{ base: 5, md: 8 }} py={4} bg="utils.pbg" borderTopWidth="1px" borderColor={sponsorRowBorderColor}>
              <Body size="xs" fontWeight="semibold" color={sectionMutedTextColor} textTransform="uppercase" mb={3}>
                {t('Sponsors')}
              </Body>
              <Flex align="center" justify="space-between" gap={4} flexWrap="wrap" w="full">
                <Wrap spacing={3} shouldWrapChildren flex={1} minW={0}>
                  {sponsors.map((sponsor) => {
                    const avatar = (
                      <Avatar
                        size="md"
                        name={sponsor.name}
                        src={sponsor.image ?? undefined}
                        bg="neutral1.3"
                        color={sectionPrimaryTextColor}
                      />
                    )
                    return (
                      <WrapItem key={sponsor.id}>
                        {sponsor.url ? (
                          <ChakraLink
                            href={sponsor.url}
                            isExternal
                            aria-label={sponsor.name}
                            _hover={{ textDecoration: 'none' }}
                          >
                            {avatar}
                          </ChakraLink>
                        ) : (
                          avatar
                        )}
                      </WrapItem>
                    )
                  })}
                </Wrap>
                <Box flexShrink={0}>
                  <ImpactFundLearnMoreButton to={fundPath} />
                </Box>
              </Flex>
            </Box>
          ) : null}
        </VStack>
      </CardLayout>
    </VStack>
  )
}
