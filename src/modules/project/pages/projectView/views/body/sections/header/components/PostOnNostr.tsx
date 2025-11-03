import { IconButton, IconButtonProps, Tooltip } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowsClockwiseBold } from 'react-icons/pi'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { usePublishNostrEventMutation } from '@/types/index.ts'
import { useNotification } from '@/utils/tools/Notification.tsx'

import { useNostrPostForProject } from '../../../hooks/useNostrPostForProject.tsx'

export const PostOnNostr = (props: Omit<IconButtonProps, 'aria-label'>) => {
  const { project } = useProjectAtom()
  const { createPostEvent, isPosting } = useNostrPostForProject()
  const toast = useNotification()

  const [publishNostrEvent, { loading: isPublishing }] = usePublishNostrEventMutation()

  const handlePost = async () => {
    if (!project?.keys?.nostrKeys?.publicKey?.hex || !project.name) {
      return
    }

    const signedEvent = await createPostEvent(project.name, project.keys.nostrKeys.publicKey.hex)

    if (signedEvent) {
      await publishNostrEvent({
        variables: {
          event: JSON.stringify(signedEvent),
        },
        onCompleted() {
          toast.success({
            title: t('Post successful'),
            description: t('Your post has been published to Nostr.'),
          })
        },
        onError(error) {
          toast.error({
            title: t('Post failed'),
            description: error.message,
          })
        },
      })
    }
  }

  if (!project?.keys?.nostrKeys?.publicKey?.hex || !window.nostr) {
    return null
  }

  return (
    <Tooltip label={t('Post on nostr')}>
      <IconButton
        aria-label={t('Post on nostr')}
        icon={<PiArrowsClockwiseBold />}
        variant="soft"
        colorScheme="nostr"
        size="md"
        isLoading={isPosting || isPublishing}
        onClick={handlePost}
        {...props}
      />
    </Tooltip>
  )
}
