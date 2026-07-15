import { Button, HStack, Switch, Tooltip, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { PostEmailSendForm, PostEmailSendOptions } from '@/modules/project/components/PostEmailSendForm.tsx'
import { useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { Modal } from '@/shared/components/layouts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { PostStatus, ProjectPostFragment, usePostSendByEmailMutation } from '@/types'
import { isActive, useNotification } from '@/utils'

import { PostPublishProps } from '../hooks/usePostForm.tsx'

export const PublishModal = ({
  post,
  postPublish,
  publishing,
}: {
  post: Pick<ProjectPostFragment, 'id' | 'sentByEmailAt' | 'status' | 'postType'>
  postPublish: (_: PostPublishProps) => Promise<void>
  publishing: boolean
}) => {
  const { project, isProjectOwner } = useProjectAtom()
  const navigate = useNavigate()

  const toast = useNotification()

  const { rewards } = useRewardsAtom()

  const publishModal = useModal()

  const [sendEmail, setSendEmail] = useState(false)

  const [emailSendOptions, setEmailSendOptions] = useState<PostEmailSendOptions | undefined>(undefined)
  const [emailCount, setEmailCount] = useState<number>(0)

  const [postSendByEmail, { loading: postSendByEmailLoading }] = usePostSendByEmailMutation({
    variables: {
      input: {
        postId: post.id,
        emailSendOptions: emailSendOptions as PostEmailSendOptions,
      },
    },
    onCompleted(data) {
      publishModal.onClose()
      const recipientCount = data.postSendByEmail.recipientCount || 0
      toast.success({
        title:
          recipientCount === 1
            ? t('Sent email to 1 user.')
            : t('Sent email to {{count}} users.', { count: recipientCount }),
      })
      post.sentByEmailAt = new Date().toISOString()
    },
    onError(error) {
      toast.error({
        title: error.message,
      })
    },
  })

  const handleSendEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSendEmail(e.target.checked)
    if (!e.target.checked) {
      setEmailSendOptions(undefined)
      setEmailCount(0)
    }
  }

  const handlePostPublish = async () => {
    postPublish({
      emailSendOptions,
      onCompleted() {
        navigate(getPath('projectPostView', project.name, post?.id), { state: { justPublished: true } })
      },
    })
  }

  const canSendViaEmail = !post.sentByEmailAt
  const isPostPublished = post.status === PostStatus.Published

  if (!isProjectOwner || (isPostPublished && !canSendViaEmail)) {
    return null
  }

  const handlePublishClick = () => {
    if (!post.postType) {
      toast.warning({
        title: t('Invalid post type'),
        description: t('Please select a post type to publish'),
      })
      return
    }

    publishModal.onOpen()
  }

  return (
    <>
      {!isPostPublished && (
        <Tooltip label={!isActive(project.status) ? t('Cannot publish post for inactive project') : ''}>
          <Button
            size="lg"
            variant="solid"
            colorScheme="primary1"
            onClick={handlePublishClick}
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
        {sendEmail ? (
          <PostEmailSendForm
            projectId={project.id}
            rewards={rewards}
            onEmailSendOptionsChange={setEmailSendOptions}
            onEmailCountChange={setEmailCount}
          />
        ) : null}

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
              isDisabled={!emailSendOptions || emailCount === 0}
              isLoading={postSendByEmailLoading}
            >
              {t('Send via email')}
            </Button>
          ) : (
            <Button flex={1} variant="solid" colorScheme="primary1" onClick={handlePostPublish} isLoading={publishing}>
              {t('Publish')}
            </Button>
          )}
        </HStack>
      </Modal>
    </>
  )
}
