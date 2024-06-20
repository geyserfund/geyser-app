import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { useAuthContext } from '../../../../../context'
import { ProjectFundingModalProps } from '../../../../../pages/grants/grantsPage/components/useProjectFundingModal'
import { Grant } from '../../../../../types'
import { ProjectFunding } from '../ProjectFunding'

interface Props extends ProjectFundingModalProps {
  grant?: Grant
}

export const ProjectFundingModal = ({ isOpen, onClose, props, grant }: Props) => {
  const [title, setTitle] = useState<string | null>(null)
  const { user } = useAuthContext()

  useEffect(() => {
    if (props?.project?.title) {
      setTitle(props.project.title)
    }
  }, [props])

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent bg="transparent" boxShadow={0}>
        <Box borderRadius="4px" bg="neutral.0" pb={3}>
          <ModalHeader pb={2}>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isOpen && <ProjectFunding project={props?.project} user={user} onTitleChange={setTitle} grant={grant} />}
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  )
}
