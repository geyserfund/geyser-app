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
          border="1px solid"
          borderColor="transparent"
          _hover={{ backgroundColor: 'none', borderColor: '#20ECC7' }}
          _active={{ backgroundColor: 'brand.primary' }}
          bg="none"
          icon={<QrIcon />}
          aria-label="qr"
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
