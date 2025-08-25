import { Button, ButtonProps, HStack, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { MouseEvent } from 'react'
import { PiCopy, PiRepeat, PiShareFat, PiXLogo } from 'react-icons/pi'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { generateTwitterShareUrl } from '@/modules/project/utils'
import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks'
import { CopyButton } from '@/shared/molecules'
import { ImageCropAspectRatio } from '@/shared/molecules/ImageCropperModal'
import { ProjectPostFragment, usePublishNostrEventMutation } from '@/types'
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

  const [publishNostrEvent] = usePublishNostrEventMutation()

  const postRewardUrl = getSharePostUrlWithHeroId({ clickedFrom: CampaignContent.postShareButton })

  const twitterPostUrl = generateTwitterShareUrl(postRewardUrl)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    postShareModal.onOpen()
  }

  const handleRepostClick = async () => {
    const event = await createRepost(content.nostrEventId, {
      projectNostrPubkey: project.keys.nostrKeys.publicKey.npub,
    })

    await publishNostrEvent({
      variables: { event: JSON.stringify(event) },
      onCompleted() {
        toast.success({
          title: t('Repost successful'),
          description: t('Article has been reposted successfully'),
        })
      },
    })
    console.log('event', event)
  }

  const content = post.content ? JSON.parse(post.content) : ''
  const showRepostOnNostr = Boolean(content.nostrEventId)

  return (
    <>
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
              width="full"
              variant="solid"
              colorScheme="primary1"
              rightIcon={<PiRepeat />}
              isLoading={isReposting}
              onClick={handleRepostClick}
            >
              {t('Repost on Nostr')}
            </Button>
          )}
        </VStack>
      </Modal>
    </>
  )
}
