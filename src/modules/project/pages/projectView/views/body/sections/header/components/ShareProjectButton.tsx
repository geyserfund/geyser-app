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
      <Button
        variant="soft"
        colorScheme="neutral1"
        rightIcon={<PiShareFat />}
        onClick={onOpen}
        sx={{
          transition: 'transform 0.1s cubic-bezier(0.2, 0, 0, 1), background-color 0.2s',
          '&:active:not(:disabled)': { transform: 'scale(0.96)' },
        }}
      >
        {isProjectOwner ? t('Share') : t('Share & Earn')}
      </Button>
      <ProjectShareModal isOpen={isOpen} onClose={onClose} projectId={project.id} title={project.title} />
    </>
  )
}
