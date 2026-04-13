import { Box, Icon, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
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
      title: t('impactFunds.flow.fundGrowth.title'),
      subtitle: t('impactFunds.flow.fundGrowth.subtitle'),
    },
    {
      icon: PiStack,
      title: t('impactFunds.flow.continuousDistribution.title'),
      subtitle: t('impactFunds.flow.continuousDistribution.subtitle'),
    },
    {
      icon: PiCheckCircle,
      title: t('impactFunds.flow.verifiedImpact.title'),
      subtitle: t('impactFunds.flow.verifiedImpact.subtitle'),
    },
  ]

  const cardBackground = useColorModeValue('white', 'neutral1.3')
  const cardBorderColor = useColorModeValue('neutral1.3', 'neutral1.4')
  const iconColor = useColorModeValue('neutral1.9', 'neutral1.11')
  const titleColor = useColorModeValue('neutral1.11', 'neutral1.12')
  const subtitleColor = useColorModeValue('neutral1.8', 'neutral1.10')

  return (
    <SimpleGrid w="full" columns={{ base: 1, md: 3 }} spacing={4}>
      {flowSteps.map((step) => (
        <Box
          key={step.title}
          px={4}
          py={4}
          borderRadius="12px"
          bg={cardBackground}
          borderWidth="1px"
          borderColor={cardBorderColor}
          minH={{ md: '150px', lg: '164px' }}
        >
          <VStack h="full" spacing={2} justify="center" align="center" textAlign="center">
            <Icon as={step.icon} boxSize={7} color={iconColor} />
            <Body size={{ base: 'md', lg: 'lg' }} bold color={titleColor}>
              {step.title}
            </Body>
            <Body size="sm" color={subtitleColor}>
              {step.subtitle}
            </Body>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  )
}
