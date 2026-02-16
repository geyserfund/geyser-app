import { Image, useColorModeValue, VStack } from '@chakra-ui/react'
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
  const background = useColorModeValue(
    'linear-gradient(130deg, var(--chakra-colors-primary1-50) 0%, var(--chakra-colors-primary1-100) 100%)',
    'linear-gradient(130deg, var(--chakra-colors-primary1-700) 0%, var(--chakra-colors-primary1-800) 100%)',
  )
  const shadow = useColorModeValue('0 2px 10px rgba(16,24,40,0.08)', '0 4px 14px rgba(0,0,0,0.30)')
  const subtitleColor = useColorModeValue('neutral1.7', 'neutral1.8')

  return (
    <CardLayout
      flex={1}
      flexDirection="row"
      background={background}
      border="none"
      alignItems="left"
      borderRadius="12px"
      minWidth="320px"
      padding="10px 14px"
      boxShadow={shadow}
    >
      <Image src={imageUrl} alt={alt} boxSize={14} flexShrink={0} />
      <VStack gap={0} w="full" alignItems="start">
        <Body size={{ base: 'md', lg: 'lg' }} bold>
          {t(title)}
        </Body>
        <Body size="sm" color={subtitleColor}>
          {t(description)}
        </Body>
      </VStack>
    </CardLayout>
  )
}
