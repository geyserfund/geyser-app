import { Box, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { standardPadding } from '@/shared/styles/index.ts'

import { type ImpactFundsHowStep } from '../../utils/mainPageContent.ts'

type ImpactFundsHowItWorksSectionProps = {
  steps: readonly ImpactFundsHowStep[]
  sectionPrimaryTextColor: string
  sectionSecondaryTextColor: string
}

/** Grey-band section with three process steps. */
export function ImpactFundsHowItWorksSection({
  steps,
  sectionPrimaryTextColor,
  sectionSecondaryTextColor,
}: ImpactFundsHowItWorksSectionProps): JSX.Element {
  const bandBg = useColorModeValue('neutral1.2', 'neutral1.4')
  const cardBg = useColorModeValue('white', 'neutral1.3')

  return (
    <Box
      id="impact-fund-how-it-works"
      scrollMarginTop={{ base: '72px', md: '88px' }}
      w="100vw"
      maxW="100vw"
      ml="calc(50% - 50vw)"
      bg={bandBg}
      py={{ base: '2.4rem', md: '3rem' }}
    >
      <Box w="100%" maxW={`${dimensions.maxWidth + 24 * 2}px`} mx="auto" px={standardPadding}>
        <VStack align="stretch" spacing={7} textAlign="center">
          <H2 size="2xl" bold>
            {t('How it works')}
          </H2>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={7}>
            {steps.map((step, index) => (
              <Box key={step.title} bg={cardBg} borderRadius="xl" p={7} boxShadow="0 4px 14px rgba(15, 23, 42, 0.05)">
                <VStack align="center" spacing={4}>
                  <Body
                    size="xs"
                    fontWeight="bold"
                    color={sectionSecondaryTextColor}
                    textTransform="uppercase"
                    textAlign="center"
                  >
                    {t('Step {{step}}', { step: index + 1 })}
                  </Body>
                  <Body bold color={sectionPrimaryTextColor} fontSize="lg" textAlign="center">
                    {step.title}
                  </Body>
                  <Body size="sm" color={sectionSecondaryTextColor} lineHeight={1.6} textAlign="center">
                    {step.description}
                  </Body>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </Box>
  )
}
