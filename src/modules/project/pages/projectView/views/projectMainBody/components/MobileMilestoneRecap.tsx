import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Body1 } from '../../../../../../../components/typography'
import { useProjectMilestones } from '../../../../../pages/projectView/hooks/useProjectMilestones'

export const MobileMilestoneRecap = () => {
  const { t } = useTranslation()

  const { currentMilestone, milestoneIndex, prevMilestone, balance } = useProjectMilestones()

  const getMilestoneValue = useCallback(() => {
    if (!currentMilestone) return null

    return Math.ceil(((balance - prevMilestone) / (currentMilestone.amount - prevMilestone)) * 100)
  }, [balance, currentMilestone, prevMilestone])

  return (
    <VStack px={1} spacing={1} width="100%">
      <HStack display="flex" justifyContent="space-between" width="100%">
        <Body1 fontWeight={400} color="neutral.600">
          {t('Amount raised:')}{' '}
          <Text as="span" color="neutral.900" fontWeight={700}>
            {' '}
            {currentMilestone?.amount}M
          </Text>{' '}
          {t('sats')}
        </Body1>
        <Body1 fontWeight={400} color="neutral.600">
          {getMilestoneValue()}%
        </Body1>
      </HStack>
      <HStack width="100%" maxW="100%">
        <Box bg="neutral.100" h="8px" borderRadius="51px" width="100%" maxW="100%">
          <Box bg="primary.400" h="8px" borderRadius="51px" width={`${getMilestoneValue()}%`} maxW={'100%'}></Box>
        </Box>
      </HStack>
      <HStack width="100%" justifyContent="flex-start">
        <Body1 fontWeight={400} color="neutral.600">
          {t('Milestone')} {milestoneIndex}:{' '}
          <Text as="span" color="neutral.900" fontWeight={500}>
            {currentMilestone?.description}
          </Text>
        </Body1>
      </HStack>
    </VStack>
  )
}
