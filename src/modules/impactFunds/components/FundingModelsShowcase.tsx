import { Icon, SimpleGrid, VStack } from '@chakra-ui/react'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'

import type { ImpactFundFundingModelItem } from '../utils/informationContent.ts'

type FundingModelsShowcaseProps = {
  items: readonly ImpactFundFundingModelItem[]
}

function FundingModelCard({ item }: { item: ImpactFundFundingModelItem }): React.ReactNode {
  return (
    <CardLayout h="full" spacing={4}>
      <Icon as={item.icon} boxSize={7} color="primary1.11" />
      <VStack align="stretch" spacing={1}>
        <H3 size="lg" bold>
          {item.title}
        </H3>
        <Body size="sm" medium color="neutral1.11">
          {item.eyebrow}
        </Body>
      </VStack>
      <Body size="md" color="neutral1.11">
        {item.description}
      </Body>
    </CardLayout>
  )
}

/** Card grid for the Impact Fund funding model explanations used across overview pages. */
export function FundingModelsShowcase({ items }: FundingModelsShowcaseProps): React.ReactNode {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={5} alignItems="stretch">
      {items.map((item) => (
        <FundingModelCard key={item.title} item={item} />
      ))}
    </SimpleGrid>
  )
}
