import {
  Box,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiX } from 'react-icons/pi'

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
    <Modal isOpen={isOpen} onClose={onClose} size={'md'} isCentered>
      <ModalOverlay />
      <ModalContent padding={5} as={Box} gap={4}>
        <ModalHeader padding={0}>
          <HStack w="full" justifyContent={'space-between'}>
            <Body size="md" bold dark>
              {t('Share')}
            </Body>
            <IconButton
              aria-label="modal-close"
              variant="outline"
              colorScheme="neutral1"
              icon={<PiX />}
              size="sm"
              onClick={onClose}
            />
          </HStack>
        </ModalHeader>

        <ModalBody as={VStack} spacing={3} padding={0}>
          <AnimatedNavBar {...animatedNavBarProps} showLabel />
          {render && render()}
          <ShareBlock projectName={name} paddingTop={1} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
