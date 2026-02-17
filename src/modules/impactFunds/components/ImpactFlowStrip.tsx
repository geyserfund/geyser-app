import { Box, HStack, Icon, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { IconType } from 'react-icons'
import { PiCheckCircle, PiStack, PiWallet } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'

type ImpactFlowStep = {
  icon: IconType
  title: string
  subtitle: string
}

export const ImpactFlowStrip = () => {
  const flowSteps: ImpactFlowStep[] = [
    {
      icon: PiWallet,
      title: t('impactFunds.flow.fundGrowth.title', { defaultValue: 'Fund Growth' }),
      subtitle: t('impactFunds.flow.fundGrowth.subtitle', { defaultValue: 'Growth from new sponsors and donations.' }),
    },
    {
      icon: PiStack,
      title: t('impactFunds.flow.continuousDistribution.title', { defaultValue: 'Continuous Distribution' }),
      subtitle: t('impactFunds.flow.continuousDistribution.subtitle', {
        defaultValue: 'Funds are distributed on a regular basis.',
      }),
    },
    {
      icon: PiCheckCircle,
      title: t('impactFunds.flow.verifiedImpact.title', { defaultValue: 'Verified Impact' }),
      subtitle: t('impactFunds.flow.verifiedImpact.subtitle', {
        defaultValue: 'Verified and proven track record of impact.',
      }),
    },
  ]

  const cardBackground = useColorModeValue(
    'linear-gradient(130deg, var(--chakra-colors-primary1-50) 0%, var(--chakra-colors-primary1-100) 100%)',
    'linear-gradient(130deg, var(--chakra-colors-primary1-700) 0%, var(--chakra-colors-primary1-800) 100%)',
  )
  const shadow = useColorModeValue('0 3px 10px rgba(16,24,40,0.08)', '0 4px 14px rgba(0,0,0,0.28)')
  const borderColor = useColorModeValue('neutral1.5', 'neutral1.6')
  const iconContainerBg = useColorModeValue('primary1.100', 'primary1.700')
  const iconColor = useColorModeValue('primary1.700', 'primary1.100')
  const subtitleColor = useColorModeValue('neutral1.7', 'neutral1.8')

  return (
    <HStack w="full" spacing={4} align="stretch" overflowX="auto" overflowY="visible" px={1} py={2}>
      {flowSteps.map((step) => (
        <Box
          key={step.title}
          flex={1}
          minW="320px"
          px="14px"
          py="10px"
          borderRadius="12px"
          bg={cardBackground}
          borderWidth="1px"
          borderColor={borderColor}
          boxShadow={shadow}
        >
          <HStack spacing={3} align="center">
            <Box
              boxSize={12}
              borderRadius="10px"
              bg={iconContainerBg}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              <Icon as={step.icon} boxSize={6} color={iconColor} />
            </Box>
            <VStack spacing={0} align="start" flex={1}>
              <Body size={{ base: 'md', lg: 'lg' }} bold>
                {step.title}
              </Body>
              <Body size="sm" color={subtitleColor}>
                {step.subtitle}
              </Body>
            </VStack>
          </HStack>
        </Box>
      ))}
    </HStack>
  )
}
