import { Button, ButtonProps, HStack, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { MouseEvent } from 'react'
import { PiCopy, PiShareFat, PiXLogo } from 'react-icons/pi'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { generateTwitterShareUrl } from '@/modules/project/utils'
import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { CopyButton } from '@/shared/molecules'
import { ImageCropAspectRatio } from '@/shared/molecules/ImageCropperModal'
import { ProjectRewardFragment } from '@/types'

import { ShareBanner } from '../../body/components'

type RewardShareProps = {
  reward: ProjectRewardFragment
} & ButtonProps

export const RewardShare = ({ reward, ...props }: RewardShareProps) => {
  const { project } = useProjectAtom()

  const rewardShareModal = useModal()

  const projectRewardUrl = `${window.location.origin}${getPath('projectRewardView', project.name, reward.id)}`

  const twitterPostUrl = generateTwitterShareUrl(projectRewardUrl)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    rewardShareModal.onOpen()
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
        isOpen={rewardShareModal.isOpen}
        onClose={rewardShareModal.onClose}
        bodyProps={{ as: VStack, gap: 4 }}
        title={t('Share reward')}
      >
        <Body size="sm" dark>
          {t('Share the reward page to spread the word across the internet and social media.')}
        </Body>
        <ShareBanner aspectRatio={ImageCropAspectRatio.Reward} bannerImage={reward.image} bannerText={reward.name} />
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
