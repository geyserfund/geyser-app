import { useMutation } from '@apollo/client'
import {
  Avatar,
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FormEventHandler, useState } from 'react'

import { AddPictureIcon } from '../../../components/icons/svg/AddPictureIcon'
import { FileUpload } from '../../../components/molecules'
import { TextArea } from '../../../components/ui'
import Loader from '../../../components/ui/Loader'
import { MUTATION_UPDATE_USER, USER_PROFILE_QUERY } from '../../../graphql'
import { LightningAddressConnectionDetails } from '../../../types'
import { getRandomOrb, useNotification } from '../../../utils'
import { EditProfileModalProps } from '../hooks/useEditProfileModal'

export const EditProfileModal = ({
  isOpen,
  close,
  props,
}: EditProfileModalProps) => {
  const { unexpected } = useNotification()

  const [name, setName] = useState(() => props.user?.username || '')
  const [bio, setBio] = useState(() => props.user?.bio || '')
  const [imageUrl, setImageUrl] = useState(() => props.user?.imageUrl || '')
  const [isImageLoading, setImageLoading] = useState(false)

  const [lnAddress, setLnAddress] = useState(() => {
    const connectionDetails = (
      props.user?.wallet?.connectionDetails.__typename ===
      'LightningAddressConnectionDetails'
        ? props.user.wallet?.connectionDetails
        : {}
    ) as LightningAddressConnectionDetails
    return connectionDetails.lightningAddress || ''
  })

  const [updateUser, { loading }] = useMutation(MUTATION_UPDATE_USER, {
    onError: unexpected,
    refetchQueries: [USER_PROFILE_QUERY],
    onQueryUpdated: close,
  })

  const { user } = props

  if (!user) {
    return null
  }

  const onUploadImage = (url: string) => {
    setImageUrl(url)
    updateUser({ variables: { input: { id: user.id, imageUrl } } })
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    updateUser({
      variables: { input: { id: user.id, username: name, bio } },
    })
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={close} size="sm">
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent bg="transparent" boxShadow={0}>
        <Box borderRadius="4px" bg="brand.bgWhite" pb={3}>
          <ModalHeader pb={2}>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              {isOpen && (
                <Box>
                  <VStack align="start" gap={3}>
                    <FileUpload
                      onUploadComplete={onUploadImage}
                      onLoading={setImageLoading}
                    >
                      <Box
                        borderRadius="50%"
                        width="100px"
                        position="relative"
                        cursor="pointer"
                      >
                        <Avatar
                          src={imageUrl || getRandomOrb(user.id)}
                          h="100px"
                          w="100px"
                          border="2px solid"
                          borderColor="neutral.200 !important"
                        />
                        <Box
                          position="absolute"
                          top="0"
                          h="100px"
                          w="100px"
                          borderRadius="50%"
                          backgroundColor="neutral.900"
                          opacity={0.3}
                        />
                        <Box
                          position="absolute"
                          left="39px"
                          top="40px"
                          color="white"
                        >
                          {isImageLoading ? (
                            <Loader size="md" />
                          ) : (
                            <AddPictureIcon w="22px" h="20px" />
                          )}
                        </Box>
                      </Box>
                    </FileUpload>
                    <VStack align="start" gap={1} w="100%">
                      <Text>Name</Text>
                      <Input
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                      />
                    </VStack>
                    <VStack align="start" gap={1} w="100%">
                      <Text>Lightning Address</Text>
                      <Input
                        name="lightningAddress"
                        value={lnAddress}
                        onChange={(e) => setLnAddress(e.currentTarget.value)}
                      />
                    </VStack>
                    <VStack align="start" gap={1} w="100%">
                      <Text>Bio</Text>
                      <TextArea
                        value={bio}
                        onChange={(e) => setBio(e.currentTarget.value)}
                      />
                    </VStack>
                    <Button
                      isLoading={Boolean(loading)}
                      isDisabled={Boolean(loading)}
                      variant="contained"
                      type="submit"
                    >
                      Save
                    </Button>
                  </VStack>
                </Box>
              )}
            </form>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  )
}
