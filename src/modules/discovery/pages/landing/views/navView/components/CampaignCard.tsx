import { Image, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

export type CampaignCardProps = {
  imageUrl: string
  alt: string
  title: string
  description: string
}

export const CampaignCard = ({ imageUrl, alt, title, description }: CampaignCardProps) => {
  return (
    <CardLayout
      flex={1}
      flexDirection="row"
      backgroundColor="neutral1.3"
      border="none"
      alignItems="left"
      borderRadius="8px"
      minWidth="320px"
      padding={'8px 12px'}
    >
      <Image src={imageUrl} alt={alt} boxSize={14} />
      <VStack gap={0} w="full" alignItems="start">
        <Body size={{ base: 'md', lg: 'lg' }} bold>
          {t(title)}
        </Body>
        <Body size="sm">{t(description)}</Body>
      </VStack>
    </CardLayout>
  )
}
