import { Box, Icon, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { IconType } from 'react-icons'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

export type CampaignCardProps = {
  icon: IconType
  titleKey: string
  descriptionKey: string
  fallbackTitle: string
  fallbackDescription: string
}

export const CampaignCard = ({
  icon,
  titleKey,
  descriptionKey,
  fallbackTitle,
  fallbackDescription,
}: CampaignCardProps) => {
  const background = useColorModeValue(
    'linear-gradient(130deg, var(--chakra-colors-primary1-50) 0%, var(--chakra-colors-primary1-100) 100%)',
    'linear-gradient(130deg, var(--chakra-colors-primary1-700) 0%, var(--chakra-colors-primary1-800) 100%)',
  )
  const shadow = useColorModeValue('0 3px 10px rgba(16,24,40,0.08)', '0 4px 14px rgba(0,0,0,0.28)')
  const borderColor = useColorModeValue('neutral1.5', 'neutral1.6')
  const iconColor = useColorModeValue('primary1.700', 'primary1.200')
  const subtitleColor = useColorModeValue('neutral1.7', 'neutral1.8')

  return (
    <CardLayout
      flex={1}
      flexDirection="row"
      background={background}
      border="1px solid"
      borderColor={borderColor}
      alignItems="left"
      borderRadius="12px"
      minWidth="320px"
      padding="10px 14px"
      boxShadow={shadow}
    >
      <Box
        boxSize={12}
        borderRadius="10px"
        bg={useColorModeValue('primary1.100', 'primary1.700')}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
      >
        <Icon as={icon} boxSize={6} color={iconColor} />
      </Box>
      <VStack gap={0} w="full" alignItems="start">
        <Body size={{ base: 'md', lg: 'lg' }} bold>
          {t(titleKey, { defaultValue: fallbackTitle })}
        </Body>
        <Body size="sm" color={subtitleColor}>
          {t(descriptionKey, { defaultValue: fallbackDescription })}
        </Body>
      </VStack>
    </CardLayout>
  )
}
