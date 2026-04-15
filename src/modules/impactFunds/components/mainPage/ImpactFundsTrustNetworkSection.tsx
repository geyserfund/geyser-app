import { Box, Button, Flex, Link as ChakraLink, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { ImpactFundsFieldPartnerApplicationUrl } from '@/shared/constants/platform/url.ts'
import { standardPadding } from '@/shared/styles/index.ts'

import { type ImpactFundsCommunityLeader } from '../../utils/mainPageContent.ts'

type ImpactFundsTrustNetworkSectionProps = {
  leaders: readonly ImpactFundsCommunityLeader[]
  sectionPrimaryTextColor: string
  sectionSecondaryTextColor: string
  cardSurfaceBg: string
  sectionCardShadow: string
}

/** Trust network & field partners (grey band, leader cards, closing summary card). */
export function ImpactFundsTrustNetworkSection({
  leaders,
  sectionPrimaryTextColor,
  sectionSecondaryTextColor,
  cardSurfaceBg,
  sectionCardShadow,
}: ImpactFundsTrustNetworkSectionProps): JSX.Element {
  const bandBg = useColorModeValue('neutral1.2', 'neutral1.4')
  const buttonBg = useColorModeValue('neutral1.3', 'neutral1.5')
  const buttonHoverBg = useColorModeValue('neutral1.4', 'neutral1.6')

  return (
    <Box w="100vw" maxW="100vw" ml="calc(50% - 50vw)" bg={bandBg} py={{ base: '2.4rem', md: '3rem' }}>
      <Box w="100%" maxW={`${dimensions.maxWidth + 24 * 2}px`} mx="auto" px={standardPadding}>
        <VStack align="stretch" spacing={6}>
          <VStack align="center" spacing={3} textAlign="center">
            <H2 size="2xl" bold color={sectionPrimaryTextColor}>
              {t('Trust Network & Field Partners')}
            </H2>
            <Body color={sectionSecondaryTextColor} maxW="3xl" mx="auto">
              {t(
                'The fund relies on a distributed network of community leaders and partners who help source projects, review applications, and keep funding aligned with local needs.',
              )}
            </Body>
          </VStack>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 5 }} spacing={5}>
            {leaders.map((leader) => (
              <Box key={leader.name} p={6} bg={cardSurfaceBg} borderRadius="xl" boxShadow={sectionCardShadow}>
                <VStack align="center" spacing={3}>
                  <Flex
                    w="88px"
                    h="88px"
                    borderRadius="full"
                    bg="neutral1.4"
                    align="center"
                    justify="center"
                    overflow="hidden"
                    flexShrink={0}
                  >
                    {leader.imageUrl ? (
                      <Box as="img" src={leader.imageUrl} alt={leader.name} w="full" h="full" objectFit="cover" />
                    ) : (
                      <Body size="lg" bold color={sectionSecondaryTextColor}>
                        {leader.name.slice(0, 1)}
                      </Body>
                    )}
                  </Flex>
                  <Body bold color={sectionPrimaryTextColor} textAlign="center">
                    {leader.name}
                  </Body>
                  <Body size="sm" color={sectionSecondaryTextColor} textAlign="center">
                    {leader.role}
                  </Body>
                </VStack>
              </Box>
            ))}
            <Box p={6} bg={cardSurfaceBg} borderRadius="xl" boxShadow={sectionCardShadow}>
              <VStack align="stretch" justify="center" spacing={0} py={{ base: 2, sm: 4 }} w="full">
                <Body color={sectionPrimaryTextColor} textAlign="center" lineHeight={1.5} w="full" display="block">
                  {t('A growing trust network of ')}
                  <Body as="span" bold display="inline" color={sectionPrimaryTextColor}>
                    {t('50+ community leaders')}
                  </Body>
                </Body>
              </VStack>
            </Box>
          </SimpleGrid>
          <Flex justify="center">
            <Button
              as={ChakraLink}
              href={ImpactFundsFieldPartnerApplicationUrl}
              isExternal
              size="lg"
              variant="solid"
              bg={buttonBg}
              borderRadius="8px"
              color={sectionPrimaryTextColor}
              _hover={{ bg: buttonHoverBg }}
            >
              {t('Become a Field Partner')}
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  )
}
