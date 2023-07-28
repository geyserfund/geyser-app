import { useMutation } from '@apollo/client'
import {
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
import { FormEventHandler, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'

import { TextArea, TextInputBox } from '../../../../components/ui'
import Loader from '../../../../components/ui/Loader'
import { MUTATION_UPDATE_USER } from '../../../../graphql'
import { useDebounce } from '../../../../hooks'
import {
  LNAddressEvaluationState,
  useUserLightningAddress,
} from '../../../../hooks/useUserLightningAddress'
import { useNotification } from '../../../../utils'
import { getUserLightningAddress } from '../../../../utils'
import { EditableAvatar } from '../../components'
import { EditProfileModalProps } from '../../hooks/useEditProfileModal'

export const EditProfileModal = ({
  isOpen,
  onClose,
  props,
}: EditProfileModalProps) => {
  const { t } = useTranslation()

  const { unexpected } = useNotification()

  const [name, setName] = useState(() => props.user?.username || '')
  const [bio, setBio] = useState(() => props.user?.bio || '')
  const [imageUrl, setImageUrl] = useState(() => props.user?.imageUrl || '')

  const {
    error: lightningAddressError,
    loading: lightningAddressLoading,
    evaluationState,
    lightningAddress,
    setLightningAddress,
    validate,
    mutate,
  } = useUserLightningAddress(props.user)

  const debouncedLightningAddress = useDebounce(lightningAddress, 500)

  const [updateUser, { loading }] = useMutation(MUTATION_UPDATE_USER)

  const { user } = props

  useEffect(() => {
    if (debouncedLightningAddress !== getUserLightningAddress(user)) {
      validate()
    }
  }, [debouncedLightningAddress, mutate, user, validate])

  if (!user) {
    return null
  }

  const onUploadImage = (url: string) => {
    setImageUrl(url)
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await mutate()

    updateUser({
      variables: { input: { id: user.id, username: name, bio, imageUrl } },
      onError: unexpected,
      onCompleted: onClose,
    })
  }

  const renderRightElementContent = () => {
    switch (evaluationState) {
      case LNAddressEvaluationState.IDLE:
        return null
      case LNAddressEvaluationState.LOADING:
        return <Loader size="md"></Loader>
      case LNAddressEvaluationState.FAILED:
        return <BsFillXCircleFill fill={'secondary.red'} size="24px" />
      case LNAddressEvaluationState.SUCCEEDED:
        return <BsFillCheckCircleFill fill={'primary.500'} size="24px" />
      default:
        return null
    }
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent bg="transparent" boxShadow={0}>
        <Box borderRadius="4px" bg="neutral.0" pb={3}>
          <ModalHeader pb={2}>{t('Edit Profile')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              {isOpen && (
                <Box>
                  <VStack align="start" gap={3}>
                    <EditableAvatar
                      onUploadImage={onUploadImage}
                      userId={user.id}
                      imageUrl={imageUrl}
                    />

                    <VStack align="start" gap={1} w="100%">
                      <Text>{t('Name')}</Text>
                      <Input
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                      />
                    </VStack>

                    <VStack align="start" gap={1} w="100%">
                      <Text>{t('Lightning Address')}</Text>
                      <TextInputBox
                        name="lightningAddress"
                        type="email"
                        placeholder="satoshi@getalby.com"
                        value={lightningAddress}
                        rightIcon={renderRightElementContent()}
                        onChange={(e) => {
                          setLightningAddress(e.currentTarget.value)
                        }}
                        isInvalid={Boolean(lightningAddressError)}
                        focusBorderColor={'neutral.200'}
                        _valid={{
                          focusBorderColor: 'primary.500',
                        }}
                        error={lightningAddressError}
                      />
                    </VStack>

                    <VStack align="start" gap={1} w="100%">
                      <Text>{t('Bio')}</Text>
                      <TextArea
                        value={bio}
                        onChange={(e) => setBio(e.currentTarget.value)}
                      />
                    </VStack>

                    <Button
                      isLoading={Boolean(loading || lightningAddressLoading)}
                      isDisabled={Boolean(loading || lightningAddressLoading)}
                      variant="primary"
                      width="100%"
                      type="submit"
                    >
                      {t('Save')}
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
