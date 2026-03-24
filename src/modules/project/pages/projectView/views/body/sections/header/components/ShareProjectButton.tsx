import { Button, useDisclosure } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiShareFat } from 'react-icons/pi'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'

import { ProjectShareModal } from '../shareModal'

export const ShareProjectButton = () => {
  const { t } = useTranslation()

  const { project, isProjectOwner } = useProjectAtom()

  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <Button variant="soft" colorScheme="neutral1" rightIcon={<PiShareFat />} onClick={onOpen}>
        {isProjectOwner ? t('Share') : t('Share & Earn')}
      </Button>
      <ProjectShareModal isOpen={isOpen} onClose={onClose} projectId={project.id} title={project.title} />
    </>
  )
}
