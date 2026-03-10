import { Box, Flex, HStack, Icon, SimpleGrid, VStack } from '@chakra-ui/react'
import type { IconType } from 'react-icons'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

import type { ImpactFundFundingModelItem } from '../utils/informationContent.ts'

type FundingModelsShowcaseProps = {
  items: readonly ImpactFundFundingModelItem[]
  surfaceBg: string
  primaryTextColor: string
  secondaryTextColor: string
  mutedTextColor: string
  highlightedSurfaceBg: string
  highlightedSurfaceBorderColor: string
  noiseOpacity?: number
}

type VisualAccentChipProps = {
  icon: IconType
  label: string
}

function VisualAccentChip({ icon, label }: VisualAccentChipProps): JSX.Element {
  return (
    <HStack
      spacing={2}
      px={3}
      py={1.5}
      borderRadius="full"
      bg="whiteAlpha.850"
      backdropFilter="blur(10px)"
      boxShadow="0 8px 20px rgba(15, 23, 42, 0.12)"
    >
      <Icon as={icon} boxSize={3.5} color="neutral1.11" />
      <Body size="xs" bold color="neutral1.11">
        {label}
      </Body>
    </HStack>
  )
}

function FundingModelIllustration({ item }: { item: ImpactFundFundingModelItem }): JSX.Element {
  switch (item.illustration) {
    case 'direct-grants':
      return (
        <>
          <Box position="absolute" top={4} left={4}>
            <VisualAccentChip icon={item.icon} label={item.eyebrow} />
          </Box>
          <Flex position="absolute" left={6} bottom={5} align="center" gap={3}>
            <Flex
              w="58px"
              h="58px"
              borderRadius="20px"
              bg="whiteAlpha.900"
              align="center"
              justify="center"
              boxShadow="0 12px 24px rgba(15, 23, 42, 0.14)"
            >
              <Icon as={item.icon} boxSize={8} color="neutral1.11" />
            </Flex>
            <VStack align="start" spacing={2}>
              <Box w="78px" h="10px" borderRadius="full" bg="whiteAlpha.850" />
            </VStack>
          </Flex>
        </>
      )
    case 'matching-fund':
      return (
        <>
          <Box position="absolute" top={4} left={4}>
            <VisualAccentChip icon={item.icon} label={item.eyebrow} />
          </Box>
          <Flex position="absolute" left={6} bottom={5} align="center" gap={3}>
            <Flex
              w="52px"
              h="52px"
              borderRadius="18px"
              bg="whiteAlpha.900"
              align="center"
              justify="center"
              boxShadow="0 12px 24px rgba(15, 23, 42, 0.14)"
            >
              <Body bold color="neutral1.11">
                2x
              </Body>
            </Flex>
          </Flex>
        </>
      )
    case 'all-or-nothing':
      return (
        <>
          <Box position="absolute" top={4} left={4}>
            <VisualAccentChip icon={item.icon} label={item.eyebrow} />
          </Box>
          <Flex position="absolute" left={6} right={6} bottom={5} direction="column" gap={3}>
            <Flex
              w="56px"
              h="56px"
              borderRadius="18px"
              bg="whiteAlpha.900"
              align="center"
              justify="center"
              boxShadow="0 12px 24px rgba(15, 23, 42, 0.14)"
            >
              <Icon as={item.icon} boxSize={8} color="neutral1.11" />
            </Flex>
          </Flex>
        </>
      )
    case 'hackathons-eduthons':
      return (
        <>
          <Box position="absolute" top={4} left={4}>
            <VisualAccentChip icon={item.icon} label={item.eyebrow} />
          </Box>
          <Box position="absolute" left={6} right={6} bottom={5}>
            <HStack spacing={2}>
              <Box px={2.5} py={1} borderRadius="full" bg="whiteAlpha.900">
                <Body size="xs" bold color="neutral1.11">
                  Learn
                </Body>
              </Box>
              <Box px={2.5} py={1} borderRadius="full" bg="whiteAlpha.900">
                <Body size="xs" bold color="neutral1.11">
                  Build
                </Body>
              </Box>
              <Box px={2.5} py={1} borderRadius="full" bg="whiteAlpha.900">
                <Body size="xs" bold color="neutral1.11">
                  Reward
                </Body>
              </Box>
            </HStack>
          </Box>
        </>
      )
  }
}

function FundingModelCard({
  item,
  surfaceBg,
  primaryTextColor,
  secondaryTextColor,
  mutedTextColor,
  highlightedSurfaceBg,
  highlightedSurfaceBorderColor,
  noiseOpacity,
}: Omit<FundingModelsShowcaseProps, 'items'> & { item: ImpactFundFundingModelItem }): JSX.Element {
  return (
    <Box h="full" bg={surfaceBg} borderRadius="xl" overflow="hidden" boxShadow="0 4px 14px rgba(15, 23, 42, 0.05)">
      <Box
        position="relative"
        minH="168px"
        px={5}
        pt={5}
        pb={4}
        bgGradient={`linear(to-br, ${item.gradientFrom}, ${item.gradientTo})`}
        overflow="hidden"
      >
        <Box position="absolute" inset={0} pointerEvents="none" opacity={noiseOpacity ?? 0.15} overflow="hidden">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id={`cardNoise-${item.illustration}`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter={`url(#cardNoise-${item.illustration})`} />
          </svg>
        </Box>
        <Box
          position="absolute"
          right={-2}
          bottom={-4}
          color="whiteAlpha.400"
          transform="rotate(-10deg)"
          pointerEvents="none"
        >
          <Icon as={item.icon} boxSize={24} />
        </Box>
        <FundingModelIllustration item={item} />
      </Box>

      <VStack align="stretch" spacing={3} p={5}>
        <Body size="xs" color={mutedTextColor} textTransform="uppercase" letterSpacing="wide" fontWeight="semibold">
          {item.eyebrow}
        </Body>
        <H2 size="md" bold color={primaryTextColor}>
          {item.title}
        </H2>
        <Body size="sm" color={secondaryTextColor}>
          {item.description}
        </Body>
        <Box h="4px" borderRadius="full" bg={highlightedSurfaceBg} opacity={0.8} />
      </VStack>
    </Box>
  )
}

/** Visual card grid for the Impact Fund funding model explanations used across overview pages. */
export function FundingModelsShowcase(props: FundingModelsShowcaseProps): JSX.Element {
  const { items } = props

  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={5} alignItems="stretch">
      {items.map((item) => (
        <FundingModelCard key={item.title} item={item} {...props} />
      ))}
    </SimpleGrid>
  )
}
