import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body1 } from '../../../../../../../components/typography'
import { useProjectContext } from '../../../../../context'

const mockMilestoneData = {
  amountRaised: 3.5,
  progressPercentage: 75,
  milestoneNumber: 2,
  milestoneDescription: 'Completion of the prototype for the new eco-friendly packaging.',
}

export const MobileMilestoneRecap = () => {
  const { t } = useTranslation()
  return (
    <VStack px={1} spacing={1} width="100%">
      <HStack display="flex" justifyContent="space-between" width="100%">
        <Body1 fontWeight={400} color="neutral.600">
          {t('Amount raised:')}{' '}
          <Text as="span" color="neutral.900" fontWeight={700}>
            {' '}
            {mockMilestoneData.amountRaised}M
          </Text>{' '}
          {t('sats')}
        </Body1>
        <Body1 fontWeight={400} color="neutral.600">
          {mockMilestoneData.progressPercentage}%
        </Body1>
      </HStack>
      <HStack width="100%">
        <Box bg="neutral.100" h="8px" borderRadius="51px" width="100%">
          <Box bg="primary.400" h="8px" borderRadius="51px" width={`${mockMilestoneData.progressPercentage}%`}></Box>
        </Box>
      </HStack>
      <HStack>
        <Body1 fontWeight={400} color="neutral.600">
          {t('Milestone')} {mockMilestoneData.milestoneNumber}:{' '}
          <Text as="span" color="neutral.900" fontWeight={500}>
            {mockMilestoneData.milestoneDescription}
          </Text>
        </Body1>
      </HStack>
    </VStack>
  )
}
