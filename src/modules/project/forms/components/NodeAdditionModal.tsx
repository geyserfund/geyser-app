import { Avatar, Button, Checkbox, Link, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiQuestion } from 'react-icons/pi'

import { Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { Feedback, FeedBackVariant } from '@/shared/molecules'
import { standardPadding } from '@/shared/styles'

import { DescriptionLinkWithIconComponent } from '../../../../components/molecules'
import { TextArea, TextInputBox } from '../../../../components/ui'
import { VoltageNodeConnectionDemoURL, WalletCreationFindOutMoreUrl } from '../../../../shared/constants'
import { ProjectNodeValidations } from '../../../../shared/constants/validations'
import { useMobileMode } from '../../../../utils'
import { checkMacaroonPermissions } from '../../../../utils/validations/checkMacaroonPermissions'
import { isSecp256k1Compressed } from '../../../../utils/validations/isSecp256k1Compressed'
import { isTorV3Address } from '../../../../utils/validations/isTorV3Address'
import { TNodeInput } from '../../pages/projectCreation/hooks/useWalletForm.tsx'

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
    const { isValid, formattedTlsCert } = validateForm()
    if (isValid) {
      onSubmit({ ...form, tlsCert: formattedTlsCert, isVoltage })
      onClose()
    }
  }

  const validateForm = () => {
    const errors: any = {}
    let isValid = true
    let formattedTlsCert = ''

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
    } else if (form.hostname.match(/:\d+$/)) {
      errors.hostname = `${t('Host name cannot contain port number')}.`
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
      } else {
        const tlsValidation = validateTLSCertificate(form.tlsCert)
        if (!tlsValidation.isValid) {
          errors.tlsCert = tlsValidation.error
          isValid = false
        } else {
          formattedTlsCert = tlsValidation.formattedCert
        }
      }
    }

    if (!isVoltage && !form.grpc) {
      errors.grpc = 'gRPC port' + additionalText
      isValid = false
    }

    if (!isValid) {
      setFormError(errors)
    }

    return { isValid, formattedTlsCert }
  }

  return (
    <>
      <Modal
        title={t('Add a Node')}
        isOpen={isOpen}
        onClose={onClose}
        size={isMobile ? 'sm' : 'md'}
        contentProps={{
          marginTop: '20px',
          maxHeight: '100%',
        }}
        bodyProps={{
          as: VStack,
          gap: 4,
          paddingX: 0,
        }}
      >
        <VStack
          width="100%"
          paddingBottom="20px"
          marginBottom="20px"
          maxHeight="600px"
          spacing={4}
          paddingX={standardPadding}
          overflowY="auto"
        >
          <VStack spacing={2} alignItems="flex-start">
            <Body size="sm" medium light>
              {t('We currently support LND and clearnet nodes. So Tor nodes will not work at this time.')}
            </Body>

            <Feedback
              variant={FeedBackVariant.WARNING}
              text={
                <>
                  {t('Keep in mind that you are responsible for managing the liquidity of your node.')}{' '}
                  <Link href={WalletCreationFindOutMoreUrl} target="_blank">
                    {t('Find out more')}
                  </Link>
                  .
                </>
              }
            ></Feedback>
          </VStack>
          <VStack width="100%" alignItems="flex-start">
            <Body size="sm">{t('Node Name')}</Body>
            <TextInputBox name="name" onChange={handleTextChange} value={form.name} error={formError.name} />
          </VStack>

          <VStack width="100%" alignItems="flex-start">
            <Checkbox size="lg" colorScheme="green" isChecked={isVoltage} onChange={handleVoltageNodeToggled}>
              <Body size="sm">{t('This is a Voltage Node')}</Body>
            </Checkbox>

            {isVoltage ? (
              <DescriptionLinkWithIconComponent
                title={t('Find our demo here on how to load a Voltage node.')}
                link={VoltageNodeConnectionDemoURL}
                icon={<Avatar bgColor="neutral1.3" color="neutral1.9" icon={<PiQuestion fontSize="36px" />} />}
              />
            ) : null}
          </VStack>

          <VStack width="100%" alignItems="flex-start">
            <Body size="sm">{`${t('Hostname or IP address')} (${t('API endpoint')})`}</Body>

            <TextInputBox
              name="hostname"
              onChange={handleTextChange}
              placeholder={isVoltage ? 'nodename.m.voltageapp.io' : ''}
              value={form.hostname}
              error={formError.hostname}
            />
          </VStack>

          <VStack width="100%" alignItems="flex-start">
            <Body size="sm">{`${t('Public key')} (${t('Identity Pubkey')})`}</Body>
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
            <Body size="sm">{`${t('Invoice Macaroon')} (base64)`}</Body>
            <TextArea
              minHeight={'10em'}
              name="invoiceMacaroon"
              placeholder="AgEDbG5kAlgDChB/+6M8TzkN5U73JwYSTJTZEgEwGhYKB2FkZHJlc3MSBHJlYWQSBXdyaXRlGhcKCGludm9pY2VzEgRyZWFkEgV3cml0ZRoPCgdvbmNoYWluEgRyZWFkAAAGIHCi3WwLBhVswgO+Yiqbwn41AkMmi42RAflN3EOpDCjc"
              onChange={handleTextChange}
              value={form.invoiceMacaroon}
              error={formError.invoiceMacaroon}
            />
          </VStack>

          {isVoltage === false ? (
            <>
              <VStack width="100%" alignItems="flex-start">
                <Body size="sm">{`${t('TLS certificate')} (base64)`}</Body>
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
                <Body size="sm">{t('gRPC port')}</Body>
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
        <VStack spacing="10px" paddingX="20px" w="full">
          <Button variant="solid" colorScheme="primary1" w="full" onClick={handleSubmit}>
            {t('Confirm')}
          </Button>
        </VStack>
      </Modal>
    </>
  )
}

const validateTLSCertificate = (cert: string): { isValid: boolean; formattedCert: string; error?: string } => {
  if (!cert.trim()) {
    return { isValid: false, formattedCert: '', error: 'TLS certificate is required' }
  }

  // Helper function to safely encode string to base64
  const safeBase64Encode = (str: string) => {
    try {
      // Convert string to UTF-8 bytes, then to base64
      return btoa(unescape(encodeURIComponent(str)))
    } catch (error) {
      console.error('Base64 encoding error:', error)
      throw new Error('Failed to encode certificate')
    }
  }

  try {
    // Case 1: Raw certificate starting with MII
    if (cert.startsWith('MII')) {
      const wrapped = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----`
      return { isValid: true, formattedCert: safeBase64Encode(wrapped) }
    }

    // Case 2: Already base64 encoded (starts with LS0tLS1CRUd)
    if (cert.startsWith('LS0tLS1CRUd')) {
      // Attempt to decode and verify it's a valid certificate
      try {
        const decoded = atob(cert)
        if (!decoded.includes('-----BEGIN CERTIFICATE-----') || !decoded.includes('-----END CERTIFICATE-----')) {
          return {
            isValid: false,
            formattedCert: '',
            error: 'Invalid base64 encoded certificate. Missing proper BEGIN/END markers.',
          }
        }

        return { isValid: true, formattedCert: cert }
      } catch (e) {
        return {
          isValid: false,
          formattedCert: '',
          error: 'Invalid base64 encoded certificate.',
        }
      }
    }

    // Case 3: Full certificate with BEGIN/END markers
    const beginMarker = '-----BEGIN CERTIFICATE-----'
    const endMarker = '-----END CERTIFICATE-----'

    if (cert.includes(beginMarker) && cert.includes(endMarker)) {
      // Verify proper format and order
      const beginIndex = cert.indexOf(beginMarker)
      const endIndex = cert.indexOf(endMarker)

      if (beginIndex === -1 || endIndex === -1 || beginIndex > endIndex) {
        return {
          isValid: false,
          formattedCert: '',
          error: 'Certificate markers are not in the correct order.',
        }
      }

      // Check if there's content between markers
      const contentBetweenMarkers = cert.substring(beginIndex + beginMarker.length, endIndex).trim()

      if (!contentBetweenMarkers) {
        return {
          isValid: false,
          formattedCert: '',
          error: 'Certificate is empty between markers.',
        }
      }

      return { isValid: true, formattedCert: safeBase64Encode(cert) }
    }

    return {
      isValid: false,
      formattedCert: '',
      error: 'Invalid TLS certificate format. Please provide a valid certificate with proper BEGIN/END markers.',
    }
  } catch (error) {
    return {
      isValid: false,
      formattedCert: '',
      error: 'Error processing TLS certificate. Please check the format.',
    }
  }
}
