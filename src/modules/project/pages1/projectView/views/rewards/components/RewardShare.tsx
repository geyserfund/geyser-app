import { Button, ButtonProps, HStack, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { MouseEvent } from 'react'
import { PiCopy, PiShareFat, PiXLogo } from 'react-icons/pi'

import { generateTwitterShareUrl } from '@/modules/project/utils'
import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks'
import { CopyButton } from '@/shared/molecules'
import { ImageCropAspectRatio } from '@/shared/molecules/ImageCropperModal'
import { ProjectRewardFragment } from '@/types'

import { CampaignContent, useRewardShare } from '../../../hooks/useProjectShare'
import { ShareBanner } from '../../body/components'

type RewardShareProps = {
  reward: ProjectRewardFragment
} & ButtonProps

export const RewardShare = ({ reward, ...props }: RewardShareProps) => {
  const rewardShareModal = useModal()

  const { getShareRewardUrlWithHeroId } = useRewardShare({ uuid: reward.uuid, name: reward.name })

  const projectRewardUrl = getShareRewardUrlWithHeroId({ clickedFrom: CampaignContent.rewardShareButton })

  const twitterPostUrl = generateTwitterShareUrl(projectRewardUrl)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    rewardShareModal.onOpen()
  }

  return (
    <>
      <Button
        size={'lg'}
        variant="soft"
        colorScheme="neutral1"
        rightIcon={<PiShareFat />}
        onClick={handleClick}
        {...props}
      >
        {t('Share')}
      </Button>
      <Modal
        isOpen={rewardShareModal.isOpen}
        onClose={rewardShareModal.onClose}
        bodyProps={{ as: VStack, gap: 4 }}
        title={t('Share product')}
      >
        <Body size="sm" dark>
          {t('Share the product page to spread the word across the internet and social media.')}
        </Body>
        <ShareBanner
          aspectRatio={ImageCropAspectRatio.Reward}
          bannerImage={reward.images[0]}
          bannerText={reward.name}
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

          <CopyButton
            flex={1}
            variant="solid"
            colorScheme="primary1"
            rightIcon={<PiCopy />}
            copyText={projectRewardUrl}
          >
            {t('Copy link')}
          </CopyButton>
        </HStack>
      </Modal>
    </>
  )
}
