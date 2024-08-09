import { Button, useDisclosure } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiShareFat } from 'react-icons/pi'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'

import { ProjectShareModal } from '../shareModal'

export const ShareProjectButton = () => {
  const { t } = useTranslation()

  const { project } = useProjectAtom()

  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <Button size="sm" variant="soft" colorScheme="neutral1" rightIcon={<PiShareFat />} onClick={onOpen}>
        {t('Share')}
      </Button>
      <ProjectShareModal
        isOpen={isOpen}
        onClose={onClose}
        name={project.name}
        projectId={project.id}
        title={project.title}
      />
    </>
  )
}
