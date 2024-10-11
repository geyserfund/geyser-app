import { HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiChatCircle } from 'react-icons/pi'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body } from '@/shared/components/typography'

export const ConfirmationMessages = () => {
  const { rewards } = useRewardsAtom()

  const {
    formState: { rewardsByIDAndCount },
  } = useFundingFormAtom()

  const selectedRewards = rewards.filter((reward) => rewardsByIDAndCount && rewardsByIDAndCount[reward.id])

  const items = selectedRewards
    .filter((reward) => reward.confirmationMessage && reward.confirmationMessage !== null)
    .map((reward) => ({
      rewardConfirmationMessage: reward.confirmationMessage,
    }))

  if (items.length === 0) return null

  return (
    <VStack w="full">
      {items.map((item, index) => (
        <ConfirmationMessage key={index} {...item} />
      ))}
    </VStack>
  )
}

const ConfirmationMessage = ({
  rewardConfirmationMessage,
}: {
  rewardConfirmationMessage: string | null | undefined
}) => {
  const { t } = useTranslation()

  return (
    <VStack
      alignItems="start"
      bg="primaryAlpha.2"
      border="1px solid"
      borderColor="primaryAlpha.6"
      p={4}
      borderRadius="md"
      w="full"
      spacing={1}
    >
      <HStack justifyContent="flex-start" alignItems="center" spacing={2}>
        <PiChatCircle />
        <Body size="lg" medium>
          {t("Creator's message")}
        </Body>
      </HStack>
      <Body size="sm" style={{ whiteSpace: 'pre-wrap' }}>
        {rewardConfirmationMessage}
      </Body>
    </VStack>
  )
}
