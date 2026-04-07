import { HStack, Link as ChakraLink, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { ComponentType } from 'react'
import { useMemo } from 'react'
import { PiArrowUpRight, PiChartLine, PiMegaphone, PiNotePencil, PiUsersThree } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { GuideStepByStepUrl } from '@/shared/constants/index.ts'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'
import { getMomentumSteps } from '../utils/startPageContent.ts'

/** Momentum section for first-launch actions after the page is published. */
export const MomentumSection = () => {
  const iconBackground = 'primary1Alpha.2'
  const iconBorder = 'primary1Alpha.5'
  const iconColor = useColorModeValue('primary1.11', 'primary1.8')
  const stepSurface = useColorModeValue('white', 'neutral1.3')

  const steps = useMemo(() => getMomentumSteps(t), [])
  const icons = useMemo<ComponentType<{ size?: string | number }>[]>(() => {
    return [PiMegaphone, PiUsersThree, PiChartLine, PiNotePencil]
  }, [])

  return (
    <StartPageSectionShell id="momentum" sectionBg={useColorModeValue('neutral1.1', 'neutral1.2')}>
      <VStack alignItems="flex-start" spacing={3}>
        <H2 bold>{t('Launch momentum without overcomplicating it')}</H2>
        <Body size="lg" maxWidth="820px" light>
          {t('Your first week should focus on clear asks, direct outreach, and visible progress.')}
        </Body>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={5}>
        {steps.map((step, index) => {
          const Icon = icons[index] ?? PiMegaphone
          return (
            <PlaybookCard key={step.title} backgroundColor={stepSurface} height="100%">
              <VStack alignItems="flex-start" spacing={3}>
                <HStack
                  width="44px"
                  height="44px"
                  borderRadius="12px"
                  justifyContent="center"
                  alignItems="center"
                  backgroundColor={iconBackground}
                  color={iconColor}
                  borderWidth="1px"
                  borderColor={iconBorder}
                >
                  <Icon size={24} />
                </HStack>
                <H3 size="md" bold>
                  {step.title}
                </H3>
                <Body size="sm" light>
                  {step.description}
                </Body>
              </VStack>
            </PlaybookCard>
          )
        })}
      </SimpleGrid>

      <HStack spacing={2}>
        <ChakraLink href={GuideStepByStepUrl} isExternal>
          <Body size="sm" bold underline>
            {t('Open launch checklist')}
          </Body>
        </ChakraLink>
        <PiArrowUpRight size={14} />
      </HStack>
    </StartPageSectionShell>
  )
}
