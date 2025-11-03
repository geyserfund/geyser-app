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
import { ProjectGoalFragment } from '@/types'

import { CampaignContent, useGoalShare } from '../../../hooks/useProjectShare'
import { ShareBanner } from '../../body/components'

type GoalShareProps = {
  goal: ProjectGoalFragment
} & ButtonProps

export const GoalShare = ({ goal, ...props }: GoalShareProps) => {
  const goalShareModal = useModal()

  const { project } = useProjectAtom()

  const { getShareGoalUrlWithHeroId } = useGoalShare({ id: goal.id, name: goal.title })

  const projectGoalUrl = getShareGoalUrlWithHeroId({ clickedFrom: CampaignContent.goalShareButton })

  const twitterPostUrl = generateTwitterShareUrl(projectGoalUrl)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    goalShareModal.onOpen()
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
        isOpen={goalShareModal.isOpen}
        onClose={goalShareModal.onClose}
        bodyProps={{ as: VStack, gap: 4 }}
        title={t('Share goal')}
      >
        <Body size="sm" dark>
          {t('Share the goal page to spread the word across the internet and social media.')}
        </Body>
        <ShareBanner
          aspectRatio={ImageCropAspectRatio.Header}
          bannerImage={project?.images[0]}
          bannerText={goal.title}
          emoji={goal?.emojiUnifiedCode ?? undefined}
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

          <CopyButton flex={1} variant="solid" colorScheme="primary1" rightIcon={<PiCopy />} copyText={projectGoalUrl}>
            {t('Copy link')}
          </CopyButton>
        </HStack>
      </Modal>
    </>
  )
}
