import { Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import type { IconType } from 'react-icons'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

export type CampaignCardProps = {
  icon: IconType
  titleKey: string
  descriptionKey: string
}

export const CampaignCard = ({ icon, titleKey, descriptionKey }: CampaignCardProps) => {
  const subtitleColor = 'neutral1.11'

  return (
    <CardLayout flex={1} flexDirection="row" alignItems="left" minWidth="320px" padding="10px 14px">
      <Icon as={icon} boxSize={6} color="primary1.11" flexShrink={0} />
      <VStack gap={0} w="full" alignItems="start">
        <Body size={{ base: 'md', lg: 'lg' }} bold>
          {t(titleKey)}
        </Body>
        <Body size="sm" color={subtitleColor}>
          {t(descriptionKey)}
        </Body>
      </VStack>
    </CardLayout>
  )
}
