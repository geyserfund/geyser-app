import { Button, Checkbox, HStack, Select, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useMemo, useState } from 'react'
import { PiEnvelopeSimple } from 'react-icons/pi'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import {
  EmailSubscriberSegment,
  ProjectRewardFragment,
  usePostEmailSegmentSizeGetQuery,
  usePostSendByEmailMutation,
} from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

export type PostEmailSendOptions = {
  segment: EmailSubscriberSegment
  projectRewardUUIDs?: string[]
}

type PostEmailSendFormProps = {
  postId?: number
  projectId: number
  rewards: ProjectRewardFragment[]
  defaultSegment?: EmailSubscriberSegment
  showSendButton?: boolean
  sendButtonLabel?: string
  onEmailSendOptionsChange?: (emailSendOptions?: PostEmailSendOptions) => void
  onEmailCountChange?: (emailCount: number) => void
  onEmailSent?: () => void
}

/** Shared recipient picker and sender for post email delivery. */
export const PostEmailSendForm = ({
  postId,
  projectId,
  rewards,
  defaultSegment,
  showSendButton = false,
  sendButtonLabel = t('Send via email'),
  onEmailSendOptionsChange,
  onEmailCountChange,
  onEmailSent,
}: PostEmailSendFormProps) => {
  const toast = useNotification()

  const [sendTo, setSendTo] = useState<EmailSubscriberSegment | ''>(defaultSegment || '')
  const [emailCount, setEmailCount] = useState<number>(0)
  const [selectedRewards, setSelectedRewards] = useState<ProjectRewardFragment[]>([])
  const [hasSentEmail, setHasSentEmail] = useState(false)

  const sendToOptions = [
    { label: t('Followers (Everyone)'), value: EmailSubscriberSegment.Followers },
    { label: t('Contributors'), value: EmailSubscriberSegment.Contributors },
    { label: t('Product buyers'), value: EmailSubscriberSegment.RewardBuyers },
  ]

  const projectRewardUUIDs = useMemo(
    () => (selectedRewards.length > 0 ? selectedRewards.map((reward) => reward.uuid) : undefined),
    [selectedRewards],
  )

  const emailSendOptions = useMemo<PostEmailSendOptions | undefined>(() => {
    if (!sendTo) {
      return undefined
    }

    return {
      segment: sendTo,
      projectRewardUUIDs,
    }
  }, [projectRewardUUIDs, sendTo])

  const [postSendByEmail, { loading: postSendByEmailLoading }] = usePostSendByEmailMutation({
    onCompleted(data) {
      const recipientCount = data.postSendByEmail.recipientCount || 0
      setHasSentEmail(true)
      toast.success({
        title:
          recipientCount === 1
            ? t('Sent email to 1 user.')
            : t('Sent email to {{count}} users.', { count: recipientCount }),
      })
      onEmailSent?.()
    },
    onError(error) {
      toast.error({
        title: error.message,
      })
    },
  })

  usePostEmailSegmentSizeGetQuery({
    skip: !emailSendOptions,
    variables: {
      input: {
        projectId,
        emailSendOptions: emailSendOptions as PostEmailSendOptions,
      },
    },
    onCompleted(data) {
      setEmailCount(data.postEmailSegmentSizeGet)
      onEmailCountChange?.(data.postEmailSegmentSizeGet)
    },
  })

  useEffect(() => {
    onEmailSendOptionsChange?.(emailSendOptions)
  }, [emailSendOptions, onEmailSendOptionsChange])

  const handleSendToChange = (value: EmailSubscriberSegment | '') => {
    setSendTo(value)
    setEmailCount(0)
    onEmailCountChange?.(0)
    if (value !== EmailSubscriberSegment.RewardBuyers) {
      setSelectedRewards([])
    }
  }

  const handleRewardChange = (reward: ProjectRewardFragment, isChecked: boolean) => {
    setEmailCount(0)
    onEmailCountChange?.(0)

    if (isChecked) {
      setSelectedRewards((current) => [reward, ...current])
      return
    }

    setSelectedRewards((current) => current.filter((currentReward) => currentReward.id !== reward.id))
  }

  const handleSendEmail = () => {
    if (!postId || !emailSendOptions) {
      return
    }

    postSendByEmail({
      variables: {
        input: {
          postId,
          emailSendOptions,
        },
      },
    })
  }

  return (
    <VStack w="full" alignItems="stretch" spacing={4}>
      <Body size="sm" regular color="neutral1.11">
        {t(
          'The post title, subtitle, and image will be the only things visible in the email users receive. Make sure they’re attention-grabbing to encourage them to visit your post.',
        )}
      </Body>

      <VStack w="full" alignItems="flex-start" spacing={2}>
        <Body size="sm" medium>
          {t('Send to')}
        </Body>
        <Select
          size="sm"
          value={sendTo}
          onChange={(event) => handleSendToChange(event.target.value as EmailSubscriberSegment | '')}
          placeholder={t('Select recipients')}
          borderRadius="8px"
          color="neutral1.11"
          borderColor="neutral1.6"
          _hover={{ borderColor: 'neutral1.8' }}
        >
          {sendToOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </VStack>

      {sendTo === EmailSubscriberSegment.RewardBuyers ? (
        <VStack w="full" alignItems="stretch" spacing={2}>
          <Body size="sm" medium>
            {t('Products')}
          </Body>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
            {rewards.map((reward) => {
              const isChecked = selectedRewards.some((selectedReward) => selectedReward.id === reward.id)

              return (
                <Checkbox
                  key={reward.id}
                  isChecked={isChecked}
                  onChange={(event) => handleRewardChange(reward, event.target.checked)}
                  border="1px solid"
                  borderColor="neutral1.6"
                  borderRadius="8px"
                  px={2}
                  py={2}
                >
                  <HStack spacing={2} minW={0}>
                    <ImageWithReload
                      borderRadius="8px"
                      width="24px"
                      minWidth="24px"
                      height="24px"
                      src={reward.images[0]}
                      alt={t('{{rewardName}} product image', { rewardName: reward.name })}
                    />
                    <Body size="sm" isTruncated>
                      {reward.name}
                    </Body>
                  </HStack>
                </Checkbox>
              )
            })}
          </SimpleGrid>
        </VStack>
      ) : null}

      {sendTo ? (
        <Feedback variant={FeedBackVariant.INFO} icon={<PiEnvelopeSimple size="20px" />}>
          <Body size="sm">{t('Email will be sent to {{count}} members.', { count: emailCount })}</Body>
        </Feedback>
      ) : null}

      {showSendButton ? (
        <Button
          w="full"
          size="lg"
          variant="solid"
          colorScheme="primary1"
          onClick={handleSendEmail}
          isDisabled={!emailSendOptions || emailCount === 0 || hasSentEmail}
          isLoading={postSendByEmailLoading}
        >
          {hasSentEmail ? t('Email sent') : sendButtonLabel}
        </Button>
      ) : null}
    </VStack>
  )
}
