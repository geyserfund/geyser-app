import { Button, ButtonProps, HStack, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { MouseEvent } from 'react'
import { PiCopy, PiShareFat, PiXLogo } from 'react-icons/pi'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { generateTwitterShareUrl } from '@/modules/project/utils'
import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks'
import { CopyButton } from '@/shared/molecules'
import { ImageCropAspectRatio } from '@/shared/molecules/ImageCropperModal'
import { ProjectPostFragment } from '@/types'

import { CampaignContent } from '../../../hooks'
import { usePostShare } from '../../../hooks/useProjectShare'
import { ShareBanner } from '../../body/components'

type PostShareProps = {
  post: ProjectPostFragment
} & ButtonProps

export const PostShare = ({ post, ...props }: PostShareProps) => {
  const { project } = useProjectAtom()

  const postShareModal = useModal()

  const { getSharePostUrlWithHeroId } = usePostShare({ id: post.id })

  const postRewardUrl = getSharePostUrlWithHeroId({ clickedFrom: CampaignContent.postShareButton })

  const twitterPostUrl = generateTwitterShareUrl(postRewardUrl)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    postShareModal.onOpen()
  }

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

          <CopyButton flex={1} variant="solid" colorScheme="primary1" rightIcon={<PiCopy />} copyText={postRewardUrl}>
            {t('Copy link')}
          </CopyButton>
        </HStack>
      </Modal>
    </>
  )
}
