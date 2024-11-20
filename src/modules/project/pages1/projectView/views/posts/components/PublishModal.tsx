import { Button, HStack, IconButton, Switch, Tooltip, VStack } from '@chakra-ui/react'
import { chakraComponents, MultiValue, OptionProps } from 'chakra-react-select'
import { t } from 'i18next'
import { useState } from 'react'
import { PiEnvelopeSimple, PiX } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { ImageWithReload } from '@/components/ui'
import { CustomSelect } from '@/components/ui/CustomSelect'
import { useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout, Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { Feedback, FeedBackVariant } from '@/shared/molecules'
import {
  EmailSubscriberSegment,
  PostStatus,
  ProjectPostFragment,
  ProjectRewardFragment,
  usePostEmailSegmentSizeGetQuery,
  usePostSendByEmailMutation,
} from '@/types'
import { isActive, useNotification } from '@/utils'

import { PostPublishProps } from '../hooks/usePostForm'
import { RewardItem } from './RewardItem'

const sendToOptions = [
  { label: t('Followers (Everyone)'), value: EmailSubscriberSegment.Followers },
  { label: t('Contributors'), value: EmailSubscriberSegment.Contributors },
  { label: t('Reward buyers'), value: EmailSubscriberSegment.RewardBuyers },
]

export const PublishModal = ({
  post,
  postPublish,
  publishing,
}: {
  post: Pick<ProjectPostFragment, 'id' | 'sentByEmailAt' | 'status'>
  postPublish: (_: PostPublishProps) => Promise<void>
  publishing: boolean
}) => {
  const { project, isProjectOwner } = useProjectAtom()
  const navigate = useNavigate()

  const toast = useNotification()

  const { rewards } = useRewardsAtom()

  const publishModal = useModal()

  const [sendEmail, setSendEmail] = useState(false)

  const [sendTo, setSendTo] = useState<EmailSubscriberSegment | null>(null)
  const [emailCount, setEmailCount] = useState<number>(0)
  const [selectedRewards, setSelectedRewards] = useState<ProjectRewardFragment[]>([])

  const [postSendByEmail, { loading: postSendByEmailLoading }] = usePostSendByEmailMutation({
    variables: {
      input: {
        postId: post.id,
        emailSendOptions: {
          segment: sendTo as EmailSubscriberSegment,
          projectRewardUUIDs: selectedRewards.length > 0 ? selectedRewards.map((reward) => reward.uuid) : undefined,
        },
      },
    },
    onCompleted(data) {
      publishModal.onClose()
      toast.success({
        title: `Sent email to ${
          data.postSendByEmail.recipientCount === 1 ? '1 user' : `${data.postSendByEmail.recipientCount} users`
        }.`,
      })
      post.sentByEmailAt = new Date().toISOString()
    },
    onError(error) {
      toast.error({
        title: error.message,
      })
    },
  })

  usePostEmailSegmentSizeGetQuery({
    skip: !sendTo,
    variables: {
      input: {
        projectId: project.id,
        emailSendOptions: {
          segment: sendTo as EmailSubscriberSegment,
          projectRewardUUIDs: selectedRewards.length > 0 ? selectedRewards.map((reward) => reward.uuid) : undefined,
        },
      },
    },
    onCompleted(data) {
      setEmailCount(data.postEmailSegmentSizeGet)
    },
  })

  const handleInput = (e: any) => {
    setSendTo(e.value)
  }

  const handleSendEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSendEmail(e.target.checked)
    if (!e.target.checked) {
      setSendTo(null)
      setEmailCount(0)
      setSelectedRewards([])
    }
  }

  const handlePostPublish = async () => {
    postPublish({
      emailSendOptions: sendTo
        ? {
            segment: sendTo as EmailSubscriberSegment,
            projectRewardUUIDs: selectedRewards.length > 0 ? selectedRewards.map((reward) => reward.uuid) : undefined,
          }
        : undefined,
      onCompleted() {
        navigate(getPath('projectPostView', project.name, post?.id), { state: { justPublished: true } })
      },
    })
  }

  const handleChange = (value: MultiValue<ProjectRewardFragment>) => {
    if (!value[0]) {
      return
    }

    const newReward: ProjectRewardFragment = { ...value[0] }
    if (!selectedRewards.some((reward) => reward.id === newReward.id)) {
      setSelectedRewards((current) => [newReward, ...current])
    } else {
      setSelectedRewards((current) => current.filter((reward) => reward.id !== newReward.id))
    }
  }

  const handleRewardRemove = (reward: ProjectRewardFragment) => {
    setSelectedRewards((current) => current.filter((r) => r.id !== reward.id))
  }

  const Option = (props: OptionProps<ProjectRewardFragment, true, any>) => {
    return (
      <chakraComponents.Option {...props}>
        <RewardItem imageUrl={props.data.images[0]} name={props.children} />
      </chakraComponents.Option>
    )
  }

  const sendEmailRender = () => {
    return (
      <>
        <Body size="sm" regular color="neutral1.11">
          {t(
            'The post title, subtitle, and image will be the only things visible in the email users receive. Make sure they’re attention-grabbing to encourage them to visit your post.',
          )}
        </Body>
        <VStack w="full" alignItems="flex-start">
          <Body size={'sm'} medium>
            {' '}
            {t('Send to')}
          </Body>
          <CustomSelect
            placeholder={t('Select recipients')}
            options={sendToOptions}
            onChange={handleInput}
            width={'full'}
            size="sm"
            fontSize="sm"
          />
        </VStack>

        {sendTo === EmailSubscriberSegment.RewardBuyers && (
          <>
            <CustomSelect<ProjectRewardFragment, true>
              isMulti
              width="full"
              onChange={handleChange}
              name="rewards"
              placeholder={t('Select rewards')}
              value={[]}
              options={rewards}
              getOptionLabel={(option: ProjectRewardFragment) => option.name}
              getOptionValue={(option: ProjectRewardFragment) => option.id}
              components={{ Option }}
            />

            <HStack w="full" flexWrap="wrap">
              {selectedRewards.map((reward) => (
                <HStack
                  key={reward.id}
                  w="auto"
                  maxWidth="40%"
                  alignItems={'start'}
                  backgroundColor="neutral1.3"
                  padding="1"
                  borderRadius="8px"
                >
                  <ImageWithReload
                    borderRadius={'8px'}
                    width="24px"
                    minWidth={'24px'}
                    height="24px"
                    src={reward.images[0]}
                  />
                  <Body size="sm" isTruncated>
                    {reward.name}
                  </Body>
                  <IconButton
                    aria-label="clear-reward-selection"
                    icon={<PiX />}
                    size="sm"
                    variant="surface"
                    colorScheme="error"
                    onClick={() => handleRewardRemove(reward)}
                  />
                </HStack>
              ))}
            </HStack>
          </>
        )}

        {sendTo !== null && (
          <Feedback variant={FeedBackVariant.INFO} icon={<PiEnvelopeSimple size="20px" />}>
            <Body size="sm">
              {t('Email will be sent to')} <strong> {emailCount}</strong> {t('members.')}
            </Body>
          </Feedback>
        )}
      </>
    )
  }

  const canSendViaEmail = !post.sentByEmailAt
  const isPostPublished = post.status === PostStatus.Published

  if (!isProjectOwner || (isPostPublished && !canSendViaEmail)) {
    return null
  }

  return (
    <>
      {!isPostPublished && (
        <Tooltip label={!isActive(project.status) ? t('Cannot publish post for inactive project') : ''}>
          <Button
            size="lg"
            variant="solid"
            colorScheme="primary1"
            onClick={publishModal.onOpen}
            isDisabled={!isActive(project.status)}
            isLoading={publishing}
          >
            {t('Publish')}
          </Button>
        </Tooltip>
      )}

      {isPostPublished && (
        <Tooltip label={!isActive(project.status) ? t('Cannot send post via email for inactive project') : ''}>
          <Button
            size="lg"
            variant="solid"
            colorScheme="primary1"
            onClick={publishModal.onOpen}
            isDisabled={!isActive(project.status)}
            isLoading={postSendByEmailLoading}
          >
            {t('Send via email')}
          </Button>
        </Tooltip>
      )}
      <Modal
        {...publishModal}
        title={t('Publish')}
        bodyProps={{
          gap: 4,
          as: VStack,
        }}
      >
        <Body size="sm">
          {t(
            'You can publish a post on the platform visible to everyone, and optionally send it via email to select members of your community.',
          )}
        </Body>
        <CardLayout w="full" padding={3} direction="row">
          <VStack flex={1} alignItems="start" spacing={0}>
            <Body size="sm" medium>
              {t('Send post by email')}
            </Body>
          </VStack>
          <VStack justifyContent={'center'}>
            <Switch size="lg" isChecked={sendEmail} onChange={handleSendEmailChange} />
          </VStack>
        </CardLayout>
        {sendEmail ? sendEmailRender() : null}

        <HStack w="full">
          <Button flex={1} variant="soft" colorScheme="neutral1" onClick={publishModal.onClose}>
            {t('Cancel')}
          </Button>
          {isPostPublished ? (
            <Button
              flex={1}
              variant="solid"
              colorScheme="primary1"
              onClick={() => postSendByEmail()}
              isDisabled={emailCount === 0}
              isLoading={postSendByEmailLoading}
            >
              {t('Send via email')}
            </Button>
          ) : (
            <Button flex={1} variant="solid" colorScheme="primary1" onClick={handlePostPublish}>
              {t('Publish')}
            </Button>
          )}
        </HStack>
      </Modal>
    </>
  )
}
