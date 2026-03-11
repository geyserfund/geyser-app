import { Box, Circle, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiCheckBold } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { commaFormatted } from '@/utils/index.ts'

export type PayoutProgressStepStatus = 'complete' | 'current' | 'upcoming'

export type PayoutProgressStep = {
  title: string
  description: string
  status: PayoutProgressStepStatus
}

type PayoutProgressSidebarProps = {
  amount: number
  steps: PayoutProgressStep[]
  label?: string
}

export const PayoutProgressSidebar = ({ amount, steps, label = t('Pending payout') }: PayoutProgressSidebarProps) => {
  return (
    <VStack
      align="stretch"
      spacing={5}
      bg="neutral1.2"
      border="1px solid"
      borderColor="neutral1.6"
      borderRadius="12px"
      p={5}
      minW={{ base: 'full', lg: '280px' }}
      maxW={{ base: 'full', lg: '280px' }}
    >
      <VStack align="start" spacing={1}>
        <Body size="sm" color="neutral1.10" textTransform="uppercase" letterSpacing="0.08em">
          {label}
        </Body>
        <Body size="2xl" bold color="neutral1.12">
          {commaFormatted(amount)} sats
        </Body>
      </VStack>

      <VStack align="stretch" spacing={0}>
        {steps.map((step, index) => {
          const isComplete = step.status === 'complete'
          const isCurrent = step.status === 'current'
          const isLast = index === steps.length - 1

          return (
            <HStack key={`${step.title}-${index}`} align="stretch" spacing={3}>
              <VStack spacing={2} align="center" minW="24px">
                <Circle
                  size="24px"
                  bg={isComplete ? 'primary1.9' : isCurrent ? 'primary1.3' : 'transparent'}
                  borderWidth="1px"
                  borderColor={isComplete || isCurrent ? 'primary1.9' : 'neutral1.6'}
                  color={isComplete ? 'utils.pbg' : isCurrent ? 'primary1.11' : 'neutral1.9'}
                >
                  {isComplete ? (
                    <PiCheckBold size={12} />
                  ) : (
                    <Body size="xs" bold>
                      {index + 1}
                    </Body>
                  )}
                </Circle>
                {!isLast && <Box w="1px" flex={1} bg={isComplete ? 'primary1.6' : 'neutral1.6'} minH="28px" />}
              </VStack>

              <VStack align="start" spacing={1} pb={isLast ? 0 : 5}>
                <Body size="md" bold={isCurrent || isComplete} color={isCurrent || isComplete ? 'neutral1.12' : 'neutral1.10'}>
                  {step.title}
                </Body>
              </VStack>
            </HStack>
          )
        })}
      </VStack>
    </VStack>
  )
}
