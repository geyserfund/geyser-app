import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Modal } from '@/shared/components/layouts'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { useAnimatedNavBar } from '@/shared/components/navigation/useAnimatedNavBar'

import { ProjectBanners } from './views/ProjectBanners.tsx'
import { ProjectContributionEmbed } from './views/ProjectContributionEmbed.tsx'
import { ProjectShareView } from './views/ProjectShareView'

interface IProjectShareModal {
  isOpen: boolean
  onClose: () => void
  projectId: string
  title: string
}

enum ProjectShareModalView {
  share = 'share',
  banner = 'banner',
  embed = 'embed',
}

export const ProjectShareModal = ({ isOpen, onClose }: IProjectShareModal) => {
  const { t } = useTranslation()

  const items = [
    {
      name: t('Share'),
      key: ProjectShareModalView.share,
      render: () => <ProjectShareView />,
    },
    {
      name: t('Banner'),
      key: ProjectShareModalView.banner,
      render: () => <ProjectBanners />,
    },
    {
      name: t('Embed'),
      key: ProjectShareModalView.embed,
      render: () => <ProjectContributionEmbed />,
    },
  ] as AnimatedNavBarItem[]

  const { render, ...animatedNavBarProps } = useAnimatedNavBar({
    items,
    defaultView: ProjectShareModalView.share,
  })

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={'md'}
      isCentered
      title={t('Spread the word')}
      bodyProps={{
        as: VStack,
        gap: 3,
        alignItems: 'stretch',
      }}
    >
      <AnimatedNavBar {...animatedNavBarProps} showLabel />
      {render && render()}
    </Modal>
  )
}
