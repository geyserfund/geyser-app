import { Button, ButtonProps, HStack, Link, Tooltip, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { MouseEvent } from 'react'
import { PiArrowsClockwiseBold, PiCopy, PiShareFat, PiXLogo } from 'react-icons/pi'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { generateTwitterShareUrl } from '@/modules/project/utils'
import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks'
import { CopyButton } from '@/shared/molecules'
import { ImageCropAspectRatio } from '@/shared/molecules/ImageCropperModal'
import { ProjectPostFragment, usePostRepostOnNostrMutation } from '@/types'
import { useNotification } from '@/utils/index.ts'

import { CampaignContent } from '../../../hooks'
import { usePostShare } from '../../../hooks/useProjectShare'
import { ShareBanner } from '../../body/components'
import { useNostrRepost } from '../hooks/useNostrRepost.tsx'

type PostShareProps = {
  post: ProjectPostFragment
} & ButtonProps

export const PostShare = ({ post, ...props }: PostShareProps) => {
  const { project } = useProjectAtom()
  const toast = useNotification()

  const postShareModal = useModal()

  const { getSharePostUrlWithHeroId } = usePostShare({ id: post.id })

  const { createRepost, isReposting } = useNostrRepost()

  const [postRepostOnNostr] = usePostRepostOnNostrMutation()

  const postRewardUrl = getSharePostUrlWithHeroId({ clickedFrom: CampaignContent.postShareButton })

  const twitterPostUrl = generateTwitterShareUrl(postRewardUrl)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    postShareModal.onOpen()
  }

  const handleRepostClick = async () => {
    const event = await createRepost(content.nostrEventNoteId, {
      projectNostrPubkey: project.keys.nostrKeys.publicKey.npub,
    })

    await postRepostOnNostr({
      variables: { input: { postId: post.id, event: JSON.stringify(event) } },
      onCompleted() {
        toast.success({
          title: t('Repost successful'),
          description: t('Article has been reposted successfully'),
        })
      },
      onError(error) {
        toast.error({
          title: t('Repost failed'),
          description: error.message,
        })
      },
    })
  }

  const content = post.content ? JSON.parse(post.content) : ''
  const showRepostOnNostr = Boolean(content.nostrEventId) && Boolean(content.nostrEventNoteId)

  return (
    <HStack spacing={2}>
      <Button
        size={{ base: 'md', lg: 'lg' }}
        variant="soft"
        colorScheme="neutral1"
        rightIcon={<PiShareFat />}
        onClick={handleClick}
        {...props}
      >
        {t('Share')}
      </Button>
      {showRepostOnNostr && window.nostr && (
        <Tooltip label={t('Repost on nostr')}>
          <Button
            aria-label={t('Repost on nostr')}
            variant="soft"
            colorScheme="nostr"
            size={{ base: 'md', lg: 'lg' }}
            isLoading={isReposting}
            onClick={handleRepostClick}
            {...props}
          >
            <HStack spacing={1}>
              <PiArrowsClockwiseBold />
              {content.repostCount && <Body> {content.repostCount}</Body>}
            </HStack>
          </Button>
        </Tooltip>
      )}

      <Modal
        isOpen={postShareModal.isOpen}
        onClose={postShareModal.onClose}
        bodyProps={{ as: VStack, gap: 4 }}
        title={t('Share post')}
      >
        <Body size="sm" dark>
          {t('Share the post page to spread the word across the internet and social media.')}
        </Body>
        <ShareBanner
          aspectRatio={ImageCropAspectRatio.Post}
          bannerImage={post.image || project.thumbnailImage}
          bannerText={post.title}
        />
        <VStack w="full">
          <HStack w="full" spacing={3}>
            <Button
              flex={1}
              variant="soft"
              colorScheme="neutral1"
              rightIcon={<PiXLogo />}
              as={Link}
              href={twitterPostUrl}
              isExternal
            >
              {t('Post')}
            </Button>
            <CopyButton
              flex={1}
              w="full"
              variant="soft"
              colorScheme="neutral1"
              rightIcon={<PiCopy />}
              copyText={postRewardUrl}
            >
              {t('Copy link')}
            </CopyButton>
          </HStack>
          {showRepostOnNostr && window.nostr && (
            <Button
              aria-label={t('Repost on nostr')}
              width="full"
              variant="soft"
              colorScheme="nostr"
              size={{ base: 'md', lg: 'lg' }}
              isLoading={isReposting}
              onClick={handleRepostClick}
              {...props}
            >
              <HStack spacing={2}>
                <Body> {t('Repost on Nostr')}</Body>
                <PiArrowsClockwiseBold />
                {content.repostCount && <Body> {content.repostCount}</Body>}
              </HStack>
            </Button>
          )}
        </VStack>
      </Modal>
    </HStack>
  )
}
