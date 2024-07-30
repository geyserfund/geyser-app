import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Modal } from '@/shared/components/layouts'
import { AnimatedNavBar, NavBarItems } from '@/shared/components/navigation/AnimatedNavBar'
import { useAnimatedNavBar } from '@/shared/components/navigation/useAnimatedNavBar'
import { Body } from '@/shared/components/typography'

import { ShareBlock } from '../../../components'
import { ProjectShareContribute } from './views/ProjectShareContribute'
import { ProjectShareView } from './views/ProjectShareView'

interface IQRModal {
  isOpen: boolean
  onClose: () => void
  name: string
  projectId: string
  title: string
}

enum ProjectShareModalView {
  share = 'share',
  contribute = 'contribute',
  // embed = 'embed',
}

export const ProjectShareModal = ({ isOpen, onClose, name }: IQRModal) => {
  const { t } = useTranslation()

  const items = [
    {
      name: t('Share'),
      key: ProjectShareModalView.share,
      render: () => <ProjectShareView />,
    },
    {
      name: t('Contribute'),
      key: ProjectShareModalView.contribute,
      render: () => <ProjectShareContribute />,
    },
  ] as NavBarItems[]

  const { render, ...animatedNavBarProps } = useAnimatedNavBar({ items, defaultView: ProjectShareModalView.share })

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={'md'}
        isCentered
        title={t('Share')}
        bodyProps={{
          as: VStack,
          gap: 3,
        }}
      >
        <Body size="sm" dark>
          {t('Share the project page to spread the word across the internet and social media.')}
        </Body>
        <AnimatedNavBar {...animatedNavBarProps} showLabel />
        {render && render()}
        <ShareBlock projectName={name} paddingTop={1} />
      </Modal>
    </>
  )
}
