import { Box, Flex, HStack, Image, LinkBox, LinkOverlay, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants'

import { ImpactFundLearnMoreButton } from './ImpactFundCtas.tsx'

type AmountParts = {
  primary: string
  secondary?: string | null
}

export type SecondaryFundCardModel = {
  id: string
  name: string
  title: string
  heroImage?: string | null
  projectsFundedCount: number
  amountDisplay: AmountParts | null
}

type ImpactFundsSecondaryFundsGridProps = {
  funds: readonly SecondaryFundCardModel[]
  sectionPrimaryTextColor: string
  sectionMutedTextColor: string
  cardImageBg: string
  interactiveCardShadow: string
  interactiveCardHoverShadow: string
  numberFormatter: Intl.NumberFormat
}

/** Additional live impact funds (compact cards, no subtitle). */
export function ImpactFundsSecondaryFundsGrid({
  funds,
  sectionPrimaryTextColor,
  sectionMutedTextColor,
  cardImageBg,
  interactiveCardShadow,
  interactiveCardHoverShadow,
  numberFormatter,
}: ImpactFundsSecondaryFundsGridProps): JSX.Element {
  if (funds.length === 0) {
    return <></>
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
      {funds.map((fund) => {
        const fundPath = getPath('impactFunds', encodeURIComponent(fund.name))
        return (
          <CardLayout
            key={fund.id}
            dense
            noborder
            p={0}
            h="full"
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
            <LinkBox w="full" h="full">
              <VStack w="full" h="full" spacing={0} align="stretch">
                <Box h={{ base: '200px', lg: '280px' }} bg={cardImageBg} overflow="hidden">
                  {fund.heroImage ? (
                    <Image
                      src={fund.heroImage}
                      alt=""
                      w="full"
                      h="full"
                      display="block"
                      objectFit="contain"
                      objectPosition="center"
                      transform={{ base: 'scale(1.08)', md: 'scale(1.02)' }}
                    />
                  ) : null}
                </Box>
                <VStack w="full" bg="utils.pbg" pt={5} pb={5} align="start" spacing={3} flex={1}>
                  <HStack w="full" justifyContent="space-between" alignItems="baseline" spacing={3} px={5}>
                    <H2 size="xl" bold lineHeight={1.2} flex={1}>
                      <LinkOverlay as={Link} to={fundPath}>
                        {fund.title}
                      </LinkOverlay>
                    </H2>
                    {fund.amountDisplay ? (
                      <VStack align="end" spacing={0} flexShrink={0}>
                        <Body size="md" bold whiteSpace="nowrap" lineHeight={1.2} textAlign="right">
                          {fund.amountDisplay.primary}
                        </Body>
                        {fund.amountDisplay.secondary ? (
                          <Body
                            size="xs"
                            whiteSpace="nowrap"
                            lineHeight={1.2}
                            textAlign="right"
                            color={sectionMutedTextColor}
                          >
                            {fund.amountDisplay.secondary}
                          </Body>
                        ) : null}
                      </VStack>
                    ) : null}
                  </HStack>
                  <Flex
                    w="full"
                    px={5}
                    pt={2}
                    justifyContent="space-between"
                    alignItems="center"
                    gap={4}
                    flexWrap="wrap"
                  >
                    {fund.projectsFundedCount > 0 ? (
                      <Body size="sm" color={sectionMutedTextColor}>
                        {t('{{projectCount}} projects supported', {
                          projectCount: numberFormatter.format(fund.projectsFundedCount),
                        })}
                      </Body>
                    ) : (
                      <Box flex={1} />
                    )}
                    <Box ml="auto" flexShrink={0}>
                      <ImpactFundLearnMoreButton to={fundPath} />
                    </Box>
                  </Flex>
                </VStack>
              </VStack>
            </LinkBox>
          </CardLayout>
        )
      })}
    </SimpleGrid>
  )
}
