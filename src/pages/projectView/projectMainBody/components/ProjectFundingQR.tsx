import { IconButton, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { QrIcon } from '../../../../components/icons'
import { ProjectFragment } from '../../../../types/generated/graphql'
import { ProjectFundingQRModal } from './ProjectFundingQRModal'

interface ProjectFundingQRProps {
  project: Pick<ProjectFragment, 'name' | 'id' | 'title'>
}

export const ProjectFundingQR = ({ project }: ProjectFundingQRProps) => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Tooltip label={t('View Project QR Code')} placement="top">
        <IconButton
          size="sm"
          variant="secondary"
          color="neutral.600"
          icon={<QrIcon />}
          aria-label="project qr code"
          border="none"
          onClick={onOpen}
        />
      </Tooltip>

      <ProjectFundingQRModal
        isOpen={isOpen}
        onClose={onClose}
        name={project.name}
        projectId={project.id}
        title={project.title}
      />
    </>
  )
}
