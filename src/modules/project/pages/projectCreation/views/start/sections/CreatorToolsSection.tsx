import { HStack, Icon, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { ComponentType, useMemo } from 'react'
import {
  PiChartLine,
  PiCreditCard,
  PiNotePencil,
  PiPackage,
  PiShoppingBag,
  PiTarget,
  PiUsersThree,
} from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'

import { PlaybookCard } from '../components/PlaybookCard.tsx'
import { StartPageSectionShell } from '../components/StartPageSectionShell.tsx'

type ToolSize = 'large' | 'medium' | 'small'
type Tool = {
  icon: ComponentType<{ size?: string | number }>
  title: string
  description: string
  benefit: string
  accentColor: string
  size: ToolSize
}
const getColorFamily = (colorToken: string) => colorToken.split('.')[0]
const getAlphaToken = (colorToken: string, alphaStep: number) => `${getColorFamily(colorToken)}Alpha.${alphaStep}`

/** Step 4 section showcasing tooling that drives conversion and momentum. */
export const CreatorToolsSection = () => {
  const cardBorderColor = useColorModeValue('neutral1.4', 'neutral1.5')
  const benefitBackground = useColorModeValue('neutral1.1', 'neutral1.2')
  const benefitBorder = useColorModeValue('neutral1.5', 'neutral1.6')

  const tools = useMemo<Tool[]>(
    () => [
      {
        icon: PiTarget,
        title: t('Goals'),
        description: t('Set visible milestones that show what each funding threshold unlocks'),
        benefit: t('Create momentum with clear targets'),
        accentColor: 'geyser.8',
        size: 'large' as ToolSize,
      },
      {
        icon: PiShoppingBag,
        title: t('Products and Rewards'),
        description: t('Offer pre-orders, merch, memberships, recognition, and other perks'),
        benefit: t('Turn contributions into tangible value'),
        accentColor: 'grass.8',
        size: 'large' as ToolSize,
      },
      {
        icon: PiNotePencil,
        title: t('Posts and Updates'),
        description: t('Share progress updates and milestones to keep supporters engaged'),
        benefit: t('Build trust through consistency'),
        accentColor: 'blue.8',
        size: 'medium' as ToolSize,
      },
      {
        icon: PiUsersThree,
        title: t('Affiliates'),
        description: t('Incentivize others to share your project through distribution loops'),
        benefit: t('Expand reach through community advocates'),
        accentColor: 'amber.9',
        size: 'small' as ToolSize,
      },
      {
        icon: PiCreditCard,
        title: t('Fiat contribution support'),
        description: t('Accept card and Apple Pay so anyone can back your project.'),
        benefit: t('Increase conversion from mixed audiences'),
        accentColor: 'pink.8',
        size: 'medium' as ToolSize,
      },
      {
        icon: PiChartLine,
        title: t('Insights'),
        description: t('Measure what is working and optimize conversion decisions'),
        benefit: t('Make data-driven launch decisions'),
        accentColor: 'violet.8',
        size: 'small' as ToolSize,
      },
      {
        icon: PiPackage,
        title: t('Delivery and Accounting'),
        description: t('Manage order fulfillment, payouts, and exports in one flow'),
        benefit: t('Stay organized as support grows'),
        accentColor: 'orange.8',
        size: 'small' as ToolSize,
      },
    ],
    [],
  )

  const featuredTools = useMemo(() => tools.filter((tool) => tool.size === 'large'), [tools])
  const mediumTools = useMemo(() => tools.filter((tool) => tool.size === 'medium'), [tools])
  const smallTools = useMemo(() => tools.filter((tool) => tool.size === 'small'), [tools])

  const renderToolCard = (tool: Tool) => (
    <PlaybookCard key={tool.title} height="100%" borderColor={cardBorderColor}>
      <VStack alignItems="flex-start" spacing={{ base: 3, md: 4 }} height="100%">
        <HStack alignItems="flex-start" spacing={3} width="100%">
          <VStack
            width="52px"
            height="52px"
            borderRadius="14px"
            justifyContent="center"
            alignItems="center"
            backgroundColor={getAlphaToken(tool.accentColor, 2)}
            borderWidth="1px"
            borderColor={getAlphaToken(tool.accentColor, 4)}
            color={tool.accentColor}
            flexShrink={0}
          >
            <Icon as={tool.icon} boxSize={6} />
          </VStack>
          <VStack alignItems="flex-start" spacing={1}>
            <H3 size="md" bold>
              {tool.title}
            </H3>
            <Body size="sm" light>
              {tool.description}
            </Body>
          </VStack>
        </HStack>

        <VStack
          borderRadius="999px"
          backgroundColor={benefitBackground}
          borderWidth="1px"
          borderColor={benefitBorder}
          paddingX={3}
          paddingY={1}
          alignSelf="flex-start"
        >
          <Body size="xs" bold>
            {tool.benefit}
          </Body>
        </VStack>
      </VStack>
    </PlaybookCard>
  )

  return (
    <StartPageSectionShell id="creator-tools">
      <VStack alignItems="flex-start" spacing={3}>
        <H2 bold>{t('Use the tools that turn interest into funding')}</H2>
        <Body size="lg" maxWidth="850px" light>
          {t('Geyser gives creators a complete fundraising toolkit, not just a project page builder.')}
        </Body>
      </VStack>

      <VStack alignItems="stretch" spacing={{ base: 4, md: 5 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 5 }}>
          {featuredTools.map(renderToolCard)}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 5 }}>
          {mediumTools.map(renderToolCard)}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={{ base: 4, md: 5 }}>
          {smallTools.map(renderToolCard)}
        </SimpleGrid>
      </VStack>
    </StartPageSectionShell>
  )
}
