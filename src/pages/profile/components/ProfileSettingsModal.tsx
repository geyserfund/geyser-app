import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  InputGroup,
  InputRightElement,
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
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Body1, Body2 } from '../../../components/typography'
import { useAuthContext } from '../../../context'
import { TextField } from '../../../forms/components/TextField'
import {
  MfaAction,
  OtpResponseFragment,
  useSendOtpByEmailMutation,
  useUserEmailUpdateMutation,
} from '../../../types'
import { emailValidationSchema, useNotification } from '../../../utils'
import { VerifyYourEmail } from '../../otp'
import { EditProfileModalProps } from '../hooks/useEditProfileModal'

export const ProfileSettingsModal = ({
  isOpen,
  onClose,
  props,
}: EditProfileModalProps) => {
  const { t } = useTranslation()
  const { toast } = useNotification()
  const { user, setUser } = useAuthContext()

  const [otpSent, setSentOtp] = useState(false)
  const [otpData, setOtpData] = useState<OtpResponseFragment>()

  const {
    isOpen: isverifyEmailModalOpen,
    onOpen: onVerifyEmailModalOpen,
    onClose: onVerifyEmailModalClose,
  } = useDisclosure()
  const [currentMfaAction, setCurrentMfaAction] = useState(
    MfaAction.UserEmailUpdate,
  )

  const { formState, control, handleSubmit } = useForm<{ email: string }>({
    resolver: yupResolver(emailValidationSchema),
    values: user.email
      ? {
          email: user.email,
        }
      : undefined,
  })

  const [sendOtpByEmail] = useSendOtpByEmailMutation({
    onError() {
      toast({
        status: 'error',
        title: 'Failed to generate otp.',
        description: 'Please try again',
      })
    },
    onCompleted(data) {
      const otp = data.sendOTPByEmail
      if (otp) {
        setSentOtp(true)
        setOtpData(otp)
        setCurrentMfaAction(MfaAction.UserEmailVerification)
        onVerifyEmailModalOpen()
      }
    },
  })

  const [updateUserEmail] = useUserEmailUpdateMutation({
    onError() {
      toast({
        status: 'error',
        title: 'Failed to update email.',
        description: 'Please try again',
      })
    },
    onCompleted(data) {
      const emailUpdateUser = data.userEmailUpdate
      if (emailUpdateUser && emailUpdateUser.email) {
        setUser((current) => ({ ...current, ...emailUpdateUser }))
        sendOtpByEmail({
          variables: {
            input: {
              email: user.email,
              action: MfaAction.UserEmailVerification,
            },
          },
        })
      }
    },
  })

  const onSubmit = async ({ email }: { email: string }) => {
    if (!user.email || !user.isEmailVerified) {
      updateUserEmail({
        variables: {
          input: {
            email,
          },
        },
      })
    } else {
      setCurrentMfaAction(MfaAction.UserEmailUpdate)
      onVerifyEmailModalOpen()
    }
  }

  const handleModalClosed = () => {
    setOtpData(undefined)
    setSentOtp(false)
    onVerifyEmailModalClose()
  }

  const handleVerifyEmailClick = () => {
    if (user.email) {
      sendOtpByEmail({
        variables: {
          input: {
            email: user.email,
            action: MfaAction.UserEmailVerification,
          },
        },
      })
    }
  }

  const isSavedEmailUnverified =
    !formState.isDirty && user.email && !user.isEmailVerified

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow={0}>
          <Box borderRadius="4px" bg="neutral.0" pb={3}>
            <ModalHeader pb={2}>{t('Settings')}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form
                onSubmit={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  handleSubmit(onSubmit)(e)
                }}
              >
                <VStack spacing="20px">
                  <VStack spacing="10px" alignItems="start">
                    <Body1 semiBold>{t('Email')}</Body1>
                    <Body2>
                      {t(
                        'This is your account recovery email. Verify this email to edit your project wallet information. You will also receive important project notifications to this email.',
                      )}
                    </Body2>
                    <VStack w="full" spacing="0px">
                      <InputGroup>
                        <TextField required control={control} name="email" />
                        <InputRightElement>
                          {!formState.isDirty && user.isEmailVerified && (
                            <CheckCircleIcon color={'primary.400'} />
                          )}
                          {isSavedEmailUnverified && (
                            <WarningIcon color={'neutral.600'} />
                          )}
                        </InputRightElement>
                      </InputGroup>
                      {isSavedEmailUnverified && (
                        <Text color="neutral.600" w="full" textAlign="right">
                          {t('This email has not been verified')}
                        </Text>
                      )}
                    </VStack>

                    {!user.isEmailVerified && (
                      <Button
                        w="full"
                        variant="secondary"
                        isDisabled={formState.isDirty || !user.email}
                        onClick={handleVerifyEmailClick}
                      >
                        {t('Verify email')}
                      </Button>
                    )}
                  </VStack>

                  <Button
                    variant="primary"
                    w="full"
                    type="submit"
                    isDisabled={!formState.isDirty}
                  >
                    {t('Save')}
                  </Button>
                </VStack>
              </form>
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
      <VerifyYourEmail
        onClose={handleModalClosed}
        isOpen={isverifyEmailModalOpen}
        action={currentMfaAction}
        otpSent={otpSent}
        otpData={otpData}
      />
    </>
  )
}
