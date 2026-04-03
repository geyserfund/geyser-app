import { HStack, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
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
  size: ToolSize
}

/** Step 4 section showcasing tooling that drives conversion and momentum. */
export const CreatorToolsSection = () => {
  const iconBackground = useColorModeValue('primary1.100', 'primary1.900')
  const benefitBackground = useColorModeValue('primary1.50', 'primary1.900')

  const tools = useMemo<Tool[]>(
    () => [
      {
        icon: PiTarget,
        title: t('Goals'),
        description: t('Set visible milestones that show what each funding threshold unlocks'),
        benefit: t('Create momentum with clear targets'),
        size: 'large' as ToolSize,
      },
      {
        icon: PiShoppingBag,
        title: t('Products and Rewards'),
        description: t('Offer pre-orders, merch, memberships, recognition, and other supporter perks'),
        benefit: t('Turn contributions into tangible value'),
        size: 'large' as ToolSize,
      },
      {
        icon: PiNotePencil,
        title: t('Posts and Updates'),
        description: t('Share progress updates and milestones to keep supporters engaged'),
        benefit: t('Build trust through consistency'),
        size: 'medium' as ToolSize,
      },
      {
        icon: PiUsersThree,
        title: t('Affiliates'),
        description: t('Incentivize others to share your project through distribution loops'),
        benefit: t('Expand reach through community advocates'),
        size: 'medium' as ToolSize,
      },
      {
        icon: PiChartLine,
        title: t('Insights'),
        description: t('Measure what is working and optimize conversion decisions'),
        benefit: t('Make data-driven launch decisions'),
        size: 'small' as ToolSize,
      },
      {
        icon: PiPackage,
        title: t('Delivery and Accounting'),
        description: t('Manage order fulfillment, payouts, and exports in one flow'),
        benefit: t('Stay organized as support grows'),
        size: 'small' as ToolSize,
      },
      {
        icon: PiCreditCard,
        title: t('Fiat contribution support'),
        description: t('Reduce checkout friction for supporters who prefer familiar payment methods'),
        benefit: t('Increase conversion from mixed audiences'),
        size: 'small' as ToolSize,
      },
    ],
    [],
  )

  const largeTools = useMemo(() => tools.filter((tool) => tool.size === 'large'), [tools])
  const mediumTools = useMemo(() => tools.filter((tool) => tool.size === 'medium'), [tools])
  const smallTools = useMemo(() => tools.filter((tool) => tool.size === 'small'), [tools])

  const renderToolCard = (tool: Tool) => (
    <PlaybookCard key={tool.title} height="100%">
      <VStack alignItems="flex-start" spacing={4} height="100%">
        <HStack alignItems="flex-start" spacing={3} width="100%">
          <VStack
            width="44px"
            height="44px"
            borderRadius="12px"
            justifyContent="center"
            alignItems="center"
            backgroundColor={iconBackground}
            flexShrink={0}
          >
            <tool.icon size={20} />
          </VStack>
          <VStack alignItems="flex-start" spacing={1}>
            <H3 size="md" bold>
              {tool.title}
            </H3>
            <Body size="sm" muted>
              {tool.description}
            </Body>
          </VStack>
        </HStack>

        <VStack
          borderRadius="999px"
          backgroundColor={benefitBackground}
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
        <Body size="lg" maxWidth="850px" muted>
          {t('Geyser gives creators a complete fundraising toolkit, not just a project page builder.')}
        </Body>
      </VStack>

      <VStack alignItems="stretch" spacing={5}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
          {largeTools.map(renderToolCard)}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
          {mediumTools.map(renderToolCard)}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
          {smallTools.map(renderToolCard)}
        </SimpleGrid>
      </VStack>
    </StartPageSectionShell>
  )
}
