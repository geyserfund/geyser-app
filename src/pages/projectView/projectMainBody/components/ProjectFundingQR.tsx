import { IconButton, Tooltip, useDisclosure } from '@chakra-ui/react'

import { QrIcon } from '../../../../components/icons'
import { ProjectFragment } from '../../../../types/generated/graphql'
import { ProjectFundingQRModal } from './ProjectFundingQRModal'

interface ProjectFundingQRProps {
  project: Pick<ProjectFragment, 'name' | 'id' | 'title'>
}

export const ProjectFundingQR = ({ project }: ProjectFundingQRProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Tooltip label="View Project QR Code" placement="top">
        <IconButton
          size="sm"
          variant="secondary"
          icon={<QrIcon />}
          aria-label="project qr code"
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
