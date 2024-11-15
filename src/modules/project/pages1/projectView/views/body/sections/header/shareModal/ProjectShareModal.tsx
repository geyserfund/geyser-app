import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Modal } from '@/shared/components/layouts'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { useAnimatedNavBar } from '@/shared/components/navigation/useAnimatedNavBar'

import { ProjectBannerView } from './views/ProjectBannerView'
import { ProjectShareContribute } from './views/ProjectShareContribute'
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
  lightning = 'lightning',
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
      render: () => <ProjectBannerView />,
    },
    {
      name: t('Lightning'),
      key: ProjectShareModalView.lightning,
      render: () => <ProjectShareContribute />,
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
