import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Modal } from '@/shared/components/layouts'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { useAnimatedNavBar } from '@/shared/components/navigation/useAnimatedNavBar'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'

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
  const { isProjectOwner } = useProjectAtom()

  const items = (isProjectOwner
    ? [
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
      ]
    : [
        {
          name: t('Share'),
          key: ProjectShareModalView.share,
          render: () => <ProjectShareView />,
        },
      ]) as AnimatedNavBarItem[]

  const { render, ...animatedNavBarProps } = useAnimatedNavBar({
    items,
    defaultView: isProjectOwner ? ProjectShareModalView.banner : ProjectShareModalView.share,
    resetKey: isOpen,
  })

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={'xl'}
      isCentered
      title={t('Share & Earn')}
      bodyProps={{
        as: VStack,
        gap: 3,
        alignItems: 'stretch',
      }}
    >
      {items.length > 1 ? <AnimatedNavBar {...animatedNavBarProps} showLabel /> : null}
      {render && render()}
    </Modal>
  )
}
