import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Modal } from '@/shared/components/layouts'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { useAnimatedNavBar } from '@/shared/components/navigation/useAnimatedNavBar'
import { Body } from '@/shared/components/typography'

import { ProjectBannerView } from './views/ProjectBannerView'
import { ProjectShareContribute } from './views/ProjectShareContribute'
import { ProjectShareView } from './views/ProjectShareView'

interface IProjectShareModal {
  isOpen: boolean
  onClose: () => void
  name: string
  projectId: string
  title: string
  heroCount?: number
  satAmount?: number
}

enum ProjectShareModalView {
  share = 'share',
  banner = 'banner',
  lightning = 'lightning',
}

export const ProjectShareModal = ({
  isOpen,
  onClose,
  name,
  heroCount = 10,
  satAmount = 21212129,
}: IProjectShareModal) => {
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
      title={t('Share')}
      bodyProps={{
        as: VStack,
        gap: 3,
        alignItems: 'stretch',
      }}
    >
      <Body size="sm" dark>
        {t('Spread the word across the internet and social media.')}
      </Body>

      <AnimatedNavBar {...animatedNavBarProps} showLabel />
      {render && render()}
      {/* <ShareBlock projectName={name} paddingTop={1} /> */}
    </Modal>
  )
}
