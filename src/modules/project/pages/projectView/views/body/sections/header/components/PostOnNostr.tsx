import { IconButton, IconButtonProps, Tooltip } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowsClockwiseBold } from 'react-icons/pi'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { usePublishNostrEventMutation } from '@/types/index.ts'
import { useNotification } from '@/utils/tools/Notification.tsx'

import { useNostrPostForProject } from '../../../hooks/useNostrPostForProject.tsx'

export const usePostProjectOnNostr = () => {
  const { project } = useProjectAtom()
  const { createPostEvent, isPosting } = useNostrPostForProject()
  const toast = useNotification()

  const [publishNostrEvent, { loading: isPublishing }] = usePublishNostrEventMutation()

  const postProjectOnNostr = async () => {
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

  return {
    canPostProjectOnNostr: Boolean(
      project?.keys?.nostrKeys?.publicKey?.hex && typeof window !== 'undefined' && window.nostr,
    ),
    isPostingProjectOnNostr: isPosting || isPublishing,
    postProjectOnNostr,
  }
}

export const PostOnNostr = (props: Omit<IconButtonProps, 'aria-label'>) => {
  const { canPostProjectOnNostr, isPostingProjectOnNostr, postProjectOnNostr } = usePostProjectOnNostr()

  if (!canPostProjectOnNostr) {
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
        isLoading={isPostingProjectOnNostr}
        onClick={postProjectOnNostr}
        {...props}
      />
    </Tooltip>
  )
}
