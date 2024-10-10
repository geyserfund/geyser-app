import { HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiChatCircle } from 'react-icons/pi'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body } from '@/shared/components/typography'

export const CreatorMessages = () => {
  const { rewards } = useRewardsAtom()

  const {
    formState: { rewardsByIDAndCount },
  } = useFundingFormAtom()

  const selectedRewards = rewards.filter((reward) => rewardsByIDAndCount && rewardsByIDAndCount[reward.id])

  const items = selectedRewards
    .filter((reward) => reward.confirmationMessage)
    .map((reward) => ({
      rewardName: reward.name,
      rewardConfirmationMessage: 'Best reward ever!',
    }))

  if (items.length === 0) return null

  return (
    <VStack w="full">
      {items.map((item) => (
        <CreatorMessage key={item.rewardName} {...item} />
      ))}
    </VStack>
  )
}

const CreatorMessage = ({
  rewardName,
  rewardConfirmationMessage,
}: {
  rewardName: string
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
      <Body size="sm">{rewardConfirmationMessage}</Body>
    </VStack>
  )
}
