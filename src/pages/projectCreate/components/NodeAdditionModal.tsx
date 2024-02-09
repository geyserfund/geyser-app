import {
  Avatar,
  Checkbox,
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
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsExclamation, BsQuestion } from 'react-icons/bs'

import { DescriptionLinkWithIconComponent } from '../../../components/molecules'
import { ButtonComponent, TextArea, TextInputBox } from '../../../components/ui'
import { VoltageNodeConnectionDemoURL, WalletCreationFindOutMoreUrl } from '../../../constants'
import { ProjectNodeValidations } from '../../../constants/validations'
import { useMobileMode } from '../../../utils'
import { checkMacaroonPermissions } from '../../../utils/validations/checkMacaroonPermissions'
import { isSecp256k1Compressed } from '../../../utils/validations/isSecp256k1Compressed'
import { isTorV3Address } from '../../../utils/validations/isTorV3Address'
import { TNodeInput } from '../types'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (_: TNodeInput) => void
  nodeInput?: TNodeInput
}

export const defaultNode = {
  name: '',
  isVoltage: false,
  hostname: '',
  publicKey: '',
  invoiceMacaroon: '',
  tlsCert: '',
  grpc: '',
}

export const NodeAdditionModal = ({ isOpen, onClose, nodeInput, onSubmit }: Props) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

  const [isVoltage, setIsVoltage] = useState(false)
  const [form, setForm] = useState<TNodeInput>(nodeInput || defaultNode)
  const [formError, setFormError] = useState<any>({})

  useEffect(() => {
    if (nodeInput) {
      setForm(nodeInput)
      if (nodeInput.isVoltage) {
        setIsVoltage(true)
      }
    } else {
      setForm(defaultNode)
    }
  }, [nodeInput])

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormError({})

    const { name, value } = event.target

    setForm({ ...form, [name]: value })
  }

  const handleVoltageNodeToggled = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormError({})

    const isVoltageNode = event.target.checked

    setIsVoltage(isVoltageNode)
  }

  const handleSubmit = () => {
    const isValid = validateForm()
    if (isValid) {
      onSubmit({ ...form, isVoltage })
      onClose()
    }
  }

  const validateForm = () => {
    const errors: any = {}
    let isValid = true

    const additionalText = ' is a required field'

    if (!form.name) {
      errors.name = 'Node name' + additionalText
      isValid = false
    } else if (form.name.length > ProjectNodeValidations.nodeName.maxLength) {
      errors.name = `${t('Node name cannot be longer than')} ${ProjectNodeValidations.nodeName.maxLength} ${t(
        'characters',
      )}.`
      isValid = false
    }

    if (!form.hostname) {
      errors.hostname = 'Host name' + additionalText
      isValid = false
    } else {
      const val = isTorV3Address(form.hostname)
      if (val) {
        errors.hostname = 'Tor addresses are currently not supported'
        isValid = false
      }
    }

    if (!form.publicKey) {
      errors.publicKey = 'Public Key' + additionalText
      isValid = false
    } else if (form.publicKey.length !== ProjectNodeValidations.publicKey.length) {
      errors.publicKey = `${t('Public Key must be')} ${ProjectNodeValidations.publicKey.length} ${t(
        'characters long',
      )}.`
      isValid = false
    } else {
      const val = isSecp256k1Compressed(form.publicKey)
      if (!val) {
        errors.publicKey = 'The Public Key is wrongly formatted.'
        isValid = false
      }
    }

    if (!form.invoiceMacaroon) {
      errors.invoiceMacaroon = 'Invoice Macaroon' + additionalText
      isValid = false
    } else if (form.invoiceMacaroon.length > ProjectNodeValidations.invoiceMacaroon.maxLength) {
      errors.invoiceMacaroon = `${t('Invoice Macaroon cannot be longer than')} ${
        ProjectNodeValidations.invoiceMacaroon.maxLength
      } ${t('characters')}.`
      isValid = false
    } else {
      const val = checkMacaroonPermissions(form.invoiceMacaroon)
      if (val) {
        errors.invoiceMacaroon = val
        isValid = false
      }
    }

    if (!isVoltage) {
      if (!form.tlsCert) {
        errors.tlsCert = 'TLS certificate' + additionalText
        isValid = false
      }
    }

    if (!isVoltage && !form.grpc) {
      errors.grpc = 'gRPC port' + additionalText
      isValid = false
    }

    if (!isValid) {
      setFormError(errors)
    }

    return isValid
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={isMobile ? 'sm' : 'md'} isCentered>
      <ModalOverlay />

      <ModalContent
        bg="neutral.0"
        display="flex"
        alignItems="flex-start"
        paddingY="20px"
        paddingX="0px"
        maxHeight="100%"
      >
        <ModalHeader paddingX="20px">
          <VStack spacing={2} alignItems="flex-start">
            <Text fontSize="18px" fontWeight={600}>
              {t('Add a Node')}
            </Text>

            <Text fontSize={'14px'} fontWeight="medium" color="neutral.600">
              {t('We currently support LND and clearnet nodes. So Tor nodes will not work at this time.')}
            </Text>
            <DescriptionLinkWithIconComponent
              title={
                <>
                  {t('Keep in mind that you are responsible for managing the liquidity of your node.')}{' '}
                  <Link href={WalletCreationFindOutMoreUrl} target="_blank">
                    {t('Find out more')}
                  </Link>
                  .
                </>
              }
              icon={<Avatar bgColor="neutral.300" color="neutral.900" icon={<BsExclamation fontSize="36px" />} />}
            />
          </VStack>
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody width="100%" paddingX="0px">
          <VStack
            width="100%"
            paddingBottom="20px"
            marginBottom="20px"
            maxHeight="600px"
            overflowY="auto"
            spacing="15px"
            paddingX="20px"
          >
            <VStack width="100%" alignItems="flex-start">
              <Text>{t('Node Name')}</Text>
              <TextInputBox name="name" onChange={handleTextChange} value={form.name} error={formError.name} />
            </VStack>

            <VStack width="100%" alignItems="flex-start">
              <Checkbox size="lg" colorScheme="green" isChecked={isVoltage} onChange={handleVoltageNodeToggled}>
                <Text>{t('This is a Voltage Node')}</Text>
              </Checkbox>

              {isVoltage ? (
                <DescriptionLinkWithIconComponent
                  title={t('Find our demo here on how to load a Voltage node.')}
                  link={VoltageNodeConnectionDemoURL}
                  icon={<Avatar bgColor="neutral.300" color="neutral.900" icon={<BsQuestion fontSize="36px" />} />}
                />
              ) : null}
            </VStack>

            <VStack width="100%" alignItems="flex-start">
              <Text>{`${t('Hostname or IP address')} (${t('API endpoint')})`}</Text>

              <TextInputBox
                name="hostname"
                onChange={handleTextChange}
                placeholder={isVoltage ? 'nodename.m.voltageapp.io' : ''}
                value={form.hostname}
                error={formError.hostname}
              />
            </VStack>

            <VStack width="100%" alignItems="flex-start">
              <Text>{`${t('Public key')} (${t('Identity Pubkey')})`}</Text>
              <TextArea
                minHeight={'6em'}
                name="publicKey"
                placeholder="0330ba2ac70aa1566d3d07524248ee8a7861aaebdc6d46c8ccd016bfe20b76c995"
                onChange={handleTextChange}
                value={form.publicKey}
                error={formError.publicKey}
              />
            </VStack>

            <VStack width="100%" alignItems="flex-start">
              <Text>{`${t('Invoice Macaroon')} (base64)`}</Text>
              <TextArea
                minHeight={'10em'}
                name="invoiceMacaroon"
                placeholder="cml0ZRoKCGbG5kAlgRChAGp+sQl/hVmpZQVWvphmk/EgEwGhYKB2FkZHJlc3MSBHJlYWWSBXdyaXRlGhcrudm9pY2VzEgRyZZFkEgV3PCgdvbmNoYWluEgRyZWFkAAAGIK8pI70yQT8GuVhykez0PMpNt5kEeYsmuvwdnLe4JfFMAgEE"
                onChange={handleTextChange}
                value={form.invoiceMacaroon}
                error={formError.invoiceMacaroon}
              />
            </VStack>

            {isVoltage === false ? (
              <>
                <VStack width="100%" alignItems="flex-start">
                  <Text>{`${t('TLS certificate')} (base64)`}</Text>
                  <TextArea
                    minHeight={'6em'}
                    name="tlsCert"
                    placeholder="LS0tLS1CRUdJTiBDRVJU.....zeUZrYWFNTzdCWU51SVRxSRVJUSUZJQ0FURS0tLS0tCg=="
                    onChange={handleTextChange}
                    value={form.tlsCert}
                    error={formError.tlsCert}
                  />
                </VStack>
                <VStack width="100%" alignItems="flex-start">
                  <Text>{t('gRPC port')}</Text>
                  <TextInputBox
                    name="grpc"
                    type="number"
                    placeholder="10009"
                    onChange={handleTextChange}
                    value={form.grpc}
                    error={formError.grpc}
                  />
                </VStack>
              </>
            ) : null}
          </VStack>

          <VStack spacing="10px" paddingX="20px">
            <ButtonComponent w="full" primary onClick={handleSubmit}>
              {t('Confirm')}
            </ButtonComponent>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
