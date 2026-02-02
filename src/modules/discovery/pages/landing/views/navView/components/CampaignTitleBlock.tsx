import { Button, HStack, Icon, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiHouse } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

import { type CampaignCardProps, CampaignCard } from './CampaignCard.tsx'

export type CampaignTitleBlockProps = {
  title: string
  description: string
  campaignCards: CampaignCardProps[]
}

export const CampaignTitleBlock = ({ campaignCards, title, description }: CampaignTitleBlockProps) => {
  return (
    <VStack w="full" width="full" gap={4} alignItems="start">
      <HStack w="full" justifyContent={'space-between'} alignItems="start">
        <VStack gap={0} alignItems="start">
          <H2 size={{ base: 'xl', lg: '3xl' }} bold>
            {title}
          </H2>
          <Body size="md" textAlign="center">
            {description}
          </Body>
        </VStack>
        <Button variant="ghost" colorScheme="neutral1" size="lg" leftIcon={<Icon as={PiHouse} />}>
          {t('Home')}
        </Button>
      </HStack>

      <Stack w="full" gap={{ base: 4, lg: 8 }} direction="row" alignItems="stretch" overflowX="auto">
        {campaignCards.map((card) => (
          <CampaignCard key={card.title} {...card} />
        ))}
      </Stack>
    </VStack>
  )
}
