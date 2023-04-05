import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { useAuthContext } from '../../context'
import { ProjectFundingModalProps } from './hooks/useProjectFundingModal'
import { ProjectFunding } from './ProjectFunding'

export const ProjectFundingModal = ({
  isOpen,
  onClose,
  props,
}: ProjectFundingModalProps) => {
  const [title, setTitle] = useState<string | null>(null)
  const { user } = useAuthContext()

  useEffect(() => {
    if (props?.project?.title) {
      setTitle(props.project.title)
    }
  }, [props])

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent bg="transparent" boxShadow={0}>
        <Box borderRadius="4px" bg="brand.bgWhite" pb={3}>
          <ModalHeader pb={2}>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isOpen && (
              <ProjectFunding
                project={props?.project}
                user={user}
                onTitleChange={setTitle}
              />
            )}
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  )
}
