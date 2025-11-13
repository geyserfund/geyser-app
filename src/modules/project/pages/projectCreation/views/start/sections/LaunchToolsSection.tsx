import { Button, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'

import { CreationIllustrationCard } from '../components/CreationIllustrationCard.tsx'
import { CreationLayoutCard } from '../components/CreationLayoutCard.tsx'
import {
  NeedToLaunchIllustration1URL,
  NeedToLaunchIllustration2URL,
  NeedToLaunchIllustration3URL,
} from '../utils/urls.ts'
import { useLaunchNow } from '../utils/useLaunchNow.tsx'

type Tool = {
  title: string
  image: string
  description: string
}

const tools: Tool[] = [
  {
    title: 'Raise funds globally',
    image: NeedToLaunchIllustration1URL,
    description: 'With Bitcoin, Lightning, or fiat (20+ payment methods)',
  },
  {
    title: 'Sell products',
    image: NeedToLaunchIllustration2URL,
    description: 'Manage shipping and pre-orders with built-in tools',
  },
  {
    title: 'Share updates',
    image: NeedToLaunchIllustration3URL,
    description: 'Track performance in real time, keep your supporters engaged',
  },
]

/** Everything you need to launch section with tool icons */
export const LaunchToolsSection = () => {
  const { handleLauchNowClick, renderModal } = useLaunchNow()
  return (
    <CreationLayoutCard>
      <VStack w="full" spacing={0} maxW={dimensions.creation.start.maxWidth} alignItems="flex-start">
        <H2 size="2xl" bold>
          {t('Everything you need to launch')}
        </H2>

        <Body size="md">
          {t(
            "Geyser is your all-in-one crowdfunding toolkit. From funding to community building, we've got you covered.",
          )}
        </Body>
      </VStack>

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 4, lg: 8 }}
        width="100%"
        maxW={dimensions.creation.start.maxWidth}
      >
        {tools.map((tool) => (
          <CreationIllustrationCard
            key={tool.title}
            title={tool.title}
            description={tool.description}
            image={tool.image}
          />
        ))}
      </SimpleGrid>

      <Button minWidth="300px" onClick={handleLauchNowClick} colorScheme="primary1" size="xl" px={8}>
        {t('Launch now')}
      </Button>
      {renderModal()}
    </CreationLayoutCard>
  )
}
