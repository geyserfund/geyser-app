import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'

import { CardLayout } from '../../../../components/layouts'
import { AuthModal } from '../../../../components/molecules'
import { Body1, Body2, H3 } from '../../../../components/typography'
import { UndecoratedLink } from '../../../../components/ui'
import { LockedConnectAccountUrl } from '../../../../constants'
import { useAuthContext } from '../../../../context'
import { Project } from '../../../../types'
import { ConnectWithNostr } from '../../../auth/ConnectWithNostr'
import { ConnectWithTwitter } from '../../../auth/ConnectWithTwitter'
import { CreateAProjectButton } from '../../../profile/components'

export const GrantApply = () => {
  return (
    <CardLayout w="full" p="20px" alignItems="center">
      <H3 alignSelf="start">Apply</H3>
      <Body1 alignSelf="start">
        {
          "Apply to be part of the 'Bitcoin Gaming Grant' community-voting grant."
        }
      </Body1>
      <ApplyGrant />
    </CardLayout>
  )
}

export const ApplyGrant = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button variant="primary" onClick={onOpen}>
        APPLY
      </Button>
      <ApplyGrantModal {...{ isOpen, onOpen, onClose }} />
    </>
  )
}

interface ApplyGrantModalProps {
  onOpen: () => void
  isOpen: boolean
  onClose: () => void
}

export const ApplyGrantModal = ({
  onOpen,
  isOpen,
  onClose,
}: ApplyGrantModalProps) => {
  const { isLoggedIn, user } = useAuthContext()

  const getModalTitle = () => {
    if (!isLoggedIn) {
      return 'Login to apply'
    }

    return 'Select a project'
  }

  const getModalContent = () => {
    if (!isLoggedIn) {
      return <LoginForGrant />
    }

    if (!user.ownerOf || user.ownerOf.length === 0) {
      return <CreateAProject />
    }

    return (
      <SelectAProject
        projects={user.ownerOf.map((owner) => owner?.project as Project)}
      />
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent display="flex" alignItems="center" padding="20px 15px">
        <ModalHeader alignSelf="start">
          <H3>{getModalTitle()}</H3>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody w="full" as={VStack} spacing="20px" alignItems="center">
          {getModalContent()}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export const LoginForGrant = () => {
  return (
    <>
      <Image src={LockedConnectAccountUrl} maxWidth="200px" />
      <Body1>To apply to a grant you need to first login into Geyser.</Body1>
      <VStack w="full">
        <ConnectWithTwitter />
        <ConnectWithNostr />
      </VStack>
    </>
  )
}

export const CreateAProject = () => {
  return (
    <>
      <Body2 alignSelf='start'>Select your Geyser project from the list</Body2>
      <Box
        w="full"
        paddingY="10px"
        backgroundColor="neutral.100"
        borderRadius="8px"
        textAlign="center"
      >
        You have not created any projects
      </Box>
      <Body1>
        To apply for a grant you need to create a project on Geyser.
      </Body1>
      <CreateAProjectButton />
    </>
  )
}

export const SelectAProject = ({ projects }: { projects: Project[] }) => {

  const [selectedProject, setSelectedProject] = useState<number>(0)

  const handleSelection = (id: number) => {
    if(selectedProject === id){
      setSelectedProject(0)
    } else {
      setSelectedProject(id)
    }
  }

  return (
    <>
      <Body2 alignSelf='start'>Select your Geyser project from the list</Body2>
      <VStack w="full">
        {projects.map((project) => {
          const isSelected = selectedProject === project.id
          return (
            <CardLayout
              hover
              key={project.id}
              w="full"
              h="80px"
              padding="0px"
              direction="row"
              alignItems="center"
              overflow="hidden"
              onClick={() => handleSelection(project.id)}
              borderColor={isSelected ? 'brand.primary' : 'neutral.200'}
              _hover={{ cursor: 'pointer', borderColor: isSelected ? 'brand.primary' : 'neutral.400' }}
            >
              <Image
                h="100%"
                width="135px"
                src={project.thumbnailImage || ''}
                objectFit="cover"
              />
              <Body1 bold>{project.title}</Body1>
            </CardLayout>
          )
        })}
      </VStack>
      <Button variant="primary" isDisabled={!selectedProject}>Apply</Button>
    </>
  )
}
