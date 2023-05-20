/* eslint-disable complexity */

import { ArrowForwardIcon, CheckIcon } from '@chakra-ui/icons'
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaTelegramPlane, FaTwitter } from 'react-icons/fa'

import { createCreatorRecord } from '../../api'
import { GeyserTelegramUrl, GeyserTwitterUrl } from '../../constants'
import { useMobileMode, useNotification, validateEmail } from '../../utils'
import { ButtonComponent, TextInputBox } from '../ui'

interface ISubscribe {
  isOpen?: boolean
  onClose?: any
  style: string
  interest?: string
  parentState?: React.Dispatch<React.SetStateAction<boolean>>
  titleSize?: string
}

export const Subscribe = ({
  isOpen,
  onClose,
  style,
  interest,
  parentState,
  titleSize,
}: ISubscribe) => {
  const { toast } = useNotification()
  const isMobile = useMobileMode()
  const [submitting, setSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleEmail = (event: any) => {
    if (error) {
      setError('')
    }

    setEmail(event.target.value)
  }

  const handleConfirm = async () => {
    const res = validateEmail(email)
    if (!res) {
      setError('Please enter a valid email address.')
      return
    }

    try {
      setSubmitting(true)
      let records
      if (interest === 'grants') {
        records = [
          {
            fields: {
              Email: email,
              Type: ['Subscriber'],
              fldOWbMeUVrRjXrYu: ['Geyser Grants'],
            },
          },
        ]
      } else {
        records = [
          {
            fields: {
              Email: email,
              Type: ['Subscriber'],
            },
          },
        ]
      }

      await createCreatorRecord({ records })

      setSubmitting(false)
      setSuccess(true)

      if (parentState) {
        parentState(true)
      }

      toast({
        title: 'Succesfully subscribed to Geyser',
        status: 'success',
      })
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again',
        status: 'error',
      })
    }
  }

  const handleClose = () => {
    setSuccess(false)
    setEmail('')
    onClose()
  }

  return (
    <>
      {style === 'button-modal' &&
      isOpen !== undefined &&
      onClose !== undefined ? (
        <Modal isOpen={isOpen} onClose={handleClose} isCentered>
          <ModalOverlay />
          <ModalContent display="flex" alignItems="center" padding="20px 15px">
            <ModalHeader>
              <Text fontSize="16px" fontWeight={600}>
                {success ? 'Success!' : 'Subscribe'}
              </Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody width="100%">
              <VStack spacing="15px" width="100%">
                <Text>
                  {success
                    ? 'Thanks for signing up. We’ll be sharing more info about Geyser projects and product soon. To join our community find us on Telegram and Twitter.'
                    : 'To get information on the latest Geyser projects and product subscribe by dropping your email below.'}
                </Text>
                {!success && (
                  <TextInputBox
                    value={email}
                    placeholder="Contact Email"
                    onChange={handleEmail}
                  />
                )}
                {error && <Text fontSize={'12px'}>{error}</Text>}
                {success && (
                  <HStack>
                    <Link href={GeyserTwitterUrl} isExternal>
                      <IconButton
                        size="sm"
                        background={'none'}
                        aria-label="twitter"
                        icon={<FaTwitter fontSize="20px" />}
                        color={'neutral.700'}
                      />
                    </Link>
                    <Link href={GeyserTelegramUrl} isExternal>
                      <IconButton
                        size="sm"
                        background={'none'}
                        aria-label="telegram"
                        icon={<FaTelegramPlane fontSize="20px" />}
                        color={'neutral.700'}
                      />
                    </Link>
                  </HStack>
                )}
                <ButtonComponent
                  w="full"
                  primary
                  onClick={success ? handleClose : handleConfirm}
                  disabled={!email}
                  isLoading={submitting}
                >
                  {success ? 'Close' : 'Confirm'}
                </ButtonComponent>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : style === 'inline' ? (
        <VStack>
          <Text fontWeight="bold" fontSize={titleSize} textAlign="center">
            {success ? 'Success!' : 'Stay up to date with Geyser Grants'}
          </Text>
          {success && (
            <Box
              bg="primary.400"
              borderRadius="full"
              width="75px"
              height="75px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CheckIcon w={7} h={7} />
            </Box>
          )}
          <Text
            textAlign={isMobile ? 'left' : 'center'}
            w={isMobile ? '80%' : '400px'}
          >
            {success
              ? 'Thanks for signing up. We’ll be sharing more info about Geyser Grants soon.'
              : 'Receive news on recent and upcoming Grants by joining our newsletter and join our community on Telegram.'}
          </Text>
          <Box display={isMobile ? 'block' : 'flex'}>
            {!success && (
              <>
                <Box>
                  <InputGroup
                    w={isMobile ? '100%' : '250px'}
                    mr={isMobile ? 0 : 5}
                    mb={isMobile ? 2 : 0}
                  >
                    <Input
                      focusBorderColor="#20ECC7"
                      type="email"
                      isRequired={true}
                      placeholder="satoshi@geyser.fund"
                      value={email}
                      onChange={handleEmail}
                    />
                    <InputRightElement>
                      <ButtonComponent
                        w="100%"
                        primary
                        disabled={!email}
                        onClick={handleConfirm}
                        isLoading={submitting}
                      >
                        <ArrowForwardIcon w={6} h={6} />
                      </ButtonComponent>
                    </InputRightElement>
                  </InputGroup>
                  {error && (
                    <Text my={isMobile ? 2 : 1} ml={1} fontSize={'12px'}>
                      {error}
                    </Text>
                  )}
                </Box>
              </>
            )}
            <Link
              href={GeyserTelegramUrl}
              _hover={{ textDecoration: 'none' }}
              isExternal
              bg="#5B5B5B"
              borderRadius="md"
              h="40px"
              px={3}
              color="white"
              fontWeight="bold"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Icon
                boxSize={6}
                aria-label="telegram"
                as={FaTelegramPlane}
                mr={2}
              />
              Join us on Telegram
            </Link>
          </Box>
        </VStack>
      ) : style === 'inline-minimal' ? (
        <>
          {!success ? (
            <VStack>
              <Input
                focusBorderColor="#20ECC7"
                type="email"
                isRequired={true}
                placeholder="satoshi@geyser.fund"
                value={email}
                onChange={handleEmail}
              />
              <ButtonComponent
                w="100%"
                primary
                disabled={!email}
                onClick={handleConfirm}
                isLoading={submitting}
              >
                Subscribe
              </ButtonComponent>
              {error && <Text fontSize={'12px'}>{error}</Text>}
            </VStack>
          ) : (
            <Text>
              You successfully subscribed to <strong>Geyser Grants</strong>!
            </Text>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  )
}
