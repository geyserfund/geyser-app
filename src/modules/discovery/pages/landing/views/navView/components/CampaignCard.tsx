import { Box, Icon, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { IconType } from 'react-icons'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

export type CampaignCardProps = {
  icon: IconType
  titleKey: string
  descriptionKey: string
}

export const CampaignCard = ({ icon, titleKey, descriptionKey }: CampaignCardProps) => {
  const background = useColorModeValue(
    'linear-gradient(130deg, var(--chakra-colors-primary1-50) 0%, var(--chakra-colors-primary1-100) 100%)',
    'linear-gradient(130deg, var(--chakra-colors-primary1-700) 0%, var(--chakra-colors-primary1-800) 100%)',
  )
  const iconColor = useColorModeValue('primary1.700', 'primary1.200')
  const subtitleColor = useColorModeValue('neutral1.7', 'neutral1.8')
  const iconBg = useColorModeValue('primary1.100', 'primary1.700')

  return (
    <CardLayout
      flex={1}
      flexDirection="row"
      background={background}
      alignItems="left"
      minWidth="320px"
      padding="10px 14px"
    >
      <Box
        boxSize={12}
        borderRadius="innerCard"
        bg={iconBg}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
      >
        <Icon as={icon} boxSize={6} color={iconColor} />
      </Box>
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
