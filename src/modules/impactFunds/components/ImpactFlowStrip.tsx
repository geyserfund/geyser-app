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

const flowSteps: ImpactFlowStep[] = [
  {
    icon: PiWallet,
    title: t('Fund Growth'),
    subtitle: t('Growth from new sponsors and donations.'),
  },
  {
    icon: PiStack,
    title: t('Continuous Distribution'),
    subtitle: t('Funds are distributed on a regular basis.'),
  },
  {
    icon: PiCheckCircle,
    title: t('Verified Impact'),
    subtitle: t('Verified and proven track record of impact.'),
  },
]

export const ImpactFlowStrip = () => {
  const cardBackground = useColorModeValue(
    'linear-gradient(130deg, var(--chakra-colors-primary1-50) 0%, var(--chakra-colors-primary1-100) 100%)',
    'linear-gradient(130deg, var(--chakra-colors-primary1-700) 0%, var(--chakra-colors-primary1-800) 100%)',
  )
  const shadow = useColorModeValue('0 2px 10px rgba(16,24,40,0.08)', '0 4px 14px rgba(0,0,0,0.30)')
  const iconColor = useColorModeValue('primary1.700', 'primary1.100')
  const subtitleColor = useColorModeValue('neutral1.7', 'neutral1.8')

  return (
    <HStack
      w="full"
      spacing={4}
      align="stretch"
      overflowX="auto"
      overflowY="visible"
      px={1}
      py={2}
    >
      {flowSteps.map((step) => (
        <Box
          key={step.title}
          flex={{ base: '0 0 280px', md: 1 }}
          minW={{ base: '280px', md: 'auto' }}
          px={4}
          py={3}
          borderRadius="8px"
          bg={cardBackground}
          boxShadow={shadow}
        >
          <HStack spacing={3} align="center">
            <Icon as={step.icon} boxSize={5} color={iconColor} flexShrink={0} />
            <VStack spacing={0} align="start" flex={1}>
              <Body bold size="md">
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
