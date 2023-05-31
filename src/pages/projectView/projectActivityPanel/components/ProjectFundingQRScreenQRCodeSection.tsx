import {
  Box,
  Button,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BiRefresh } from 'react-icons/bi'
import { BsExclamationCircle } from 'react-icons/bs'
import { FaBitcoin, FaCopy } from 'react-icons/fa'
import { IoMdRefresh } from 'react-icons/io'
import { RiLinkUnlink } from 'react-icons/ri'
import { QRCode } from 'react-qrcode-logo'

import LogoPrimary from '../../../../assets/logo-brand.svg'
import LogoDark from '../../../../assets/logo-dark.svg'
import { Body2 } from '../../../../components/typography'
import Loader from '../../../../components/ui/Loader'
import { UseFundingFlowReturn } from '../../../../hooks'
import {
  FundingStatus,
  InvoiceStatus,
} from '../../../../types/generated/graphql'
import { copyTextToClipboard } from '../../../../utils'
import { getBip21Invoice } from '../../../../utils/lightning/bip21'

const FUNDING_REQUEST_TIMEOUT = 45_000

type Props = {
  fundingFlow: UseFundingFlowReturn
}

enum QRDisplayState {
  REFRESHING = 'REFRESHING',

  AWAITING_PAYMENT = 'AWAITING_PAYMENT',

  AWAITING_PAYMENT_WEB_LN = 'AWAITING_PAYMENT_WEB_LN',

  INVOICE_CANCELLED = 'INVOICE_CANCELLED',

  FUNDING_CANCELED = 'FUNDING_CANCELED',
}

const FundingErrorView = ({ error }: { error?: string }) => {
  return (
    <VStack
      height={248}
      width={252}
      spacing="10px"
      padding={3}
      backgroundColor={'secondary.red'}
      justifyContent="center"
      borderRadius={'md'}
    >
      <BsExclamationCircle fontSize={'2em'} />
      <Body2 bold>Funding failed</Body2>
      {error && <Body2 fontSize="12px">{`Error: ${error}`}</Body2>}
    </VStack>
  )
}

const InvoiceErrorView = ({
  onRefreshSelected,
}: {
  onRefreshSelected: () => void
}) => {
  return (
    <VStack
      height={248}
      width={252}
      spacing="10px"
      padding={3}
      backgroundColor={'primary.100'}
      justifyContent="center"
      borderRadius={'md'}
    >
      <BsExclamationCircle fontSize={'2em'} />

      <Body2 bold>Invoice was cancelled or expired.</Body2>
      <Body2>Click refresh to try again</Body2>

      <Button
        leftIcon={<BiRefresh fontSize={'2em'} />}
        iconSpacing={2}
        backgroundColor={'neutral.0'}
        textTransform={'uppercase'}
        onClick={onRefreshSelected}
        borderRadius={'full'}
        fontSize={'10px'}
      >
        Refresh
      </Button>
    </VStack>
  )
}

export const ProjectFundingQRScreenQRCodeSection = ({ fundingFlow }: Props) => {
  const [hasCopiedLightning, setHasCopiedLightning] = useState(false)
  const [hasCopiedOnchain, setHasCopiedOnchain] = useState(false)

  const [lightningAddress, setLightningAddress] = useState<string>('')
  const [onchainAddress, setOnchainAddress] = useState<string>('')
  const [fallbackAddress, setFallbackAddress] = useState<string>('')

  const {
    fundingTx,
    fundingRequestErrored,
    invoiceRefreshErrored,
    invoiceRefreshLoading,
    fundingRequestLoading,
    hasWebLN,
    weblnErrored,
    error,
    refreshFundingInvoice,
    retryFundingFlow,
  } = fundingFlow

  const qrDisplayState = useMemo(() => {
    if (invoiceRefreshLoading || fundingRequestLoading) {
      return QRDisplayState.REFRESHING
    }

    if (fundingRequestErrored || fundingTx.status === FundingStatus.Canceled) {
      return QRDisplayState.FUNDING_CANCELED
    }

    if (
      fundingTx.invoiceStatus === InvoiceStatus.Canceled ||
      invoiceRefreshErrored
    ) {
      return QRDisplayState.INVOICE_CANCELLED
    }

    if (hasWebLN && !weblnErrored) {
      return QRDisplayState.AWAITING_PAYMENT_WEB_LN
    }

    return QRDisplayState.AWAITING_PAYMENT
  }, [
    invoiceRefreshLoading,
    fundingRequestLoading,
    fundingRequestErrored,
    fundingTx.status,
    fundingTx.invoiceStatus,
    invoiceRefreshErrored,
    hasWebLN,
    weblnErrored,
  ])

  useEffect(() => {
    const { id, paymentRequest, address, amount } = fundingTx

    if (id === 0) {
      setOnchainAddress('')
      setLightningAddress('')
      setFallbackAddress('')
      return
    }

    setFallbackAddress(getBip21Invoice(amount, address, paymentRequest))
    setOnchainAddress(getBip21Invoice(amount, address))
    setLightningAddress(paymentRequest || '')
  }, [
    fundingTx,
    fundingTx.paymentRequest,
    fundingTx.address,
    refreshFundingInvoice,
  ])

  const onCopyLightning = useCallback(() => {
    copyTextToClipboard(lightningAddress)
    setHasCopiedLightning(true)
    setTimeout(() => {
      setHasCopiedLightning(false)
    }, 500)
  }, [lightningAddress])

  const onCopyOnchain = useCallback(() => {
    copyTextToClipboard(onchainAddress)
    setHasCopiedOnchain(true)
    setTimeout(() => {
      setHasCopiedOnchain(false)
    }, 500)
  }, [onchainAddress])

  const PaymentRequestCopyButton = useCallback(() => {
    return (
      <HStack
        width="100%"
        flexWrap="wrap"
        align="center"
        spacing={1}
        justify="center"
        visibility={
          qrDisplayState === QRDisplayState.AWAITING_PAYMENT
            ? 'visible'
            : 'hidden'
        }
      >
        <Box py={1}>
          <Button
            leftIcon={hasCopiedLightning ? <RiLinkUnlink /> : <FaCopy />}
            onClick={onCopyLightning}
            variant="primary"
          >
            <Text>{hasCopiedLightning ? 'Copied!' : 'Lightning invoice'}</Text>
          </Button>
        </Box>
        <Box py={1}>
          <Button
            leftIcon={hasCopiedOnchain ? <RiLinkUnlink /> : <FaCopy />}
            onClick={onCopyOnchain}
            variant="primary"
          >
            <Text>{hasCopiedOnchain ? 'Copied!' : 'Onchain invoice'}</Text>
          </Button>
        </Box>
      </HStack>
    )
  }, [
    hasCopiedLightning,
    hasCopiedOnchain,
    onCopyLightning,
    onCopyOnchain,
    qrDisplayState,
  ])

  const renderQrBox = useCallback(() => {
    switch (qrDisplayState) {
      case QRDisplayState.AWAITING_PAYMENT:
        return (
          /* This is setting the ground for using overlapping Grid items. Reasoning: the transition from "copied" to "not
            copied" is not smooth because it takes a few milli-seconds to re-render the logo. The idea would be to 
            render both elements in a Grid, make them overlap and hide one of the two based on the value of "hasCopiedQrCode".
            This way the component is already rendered, and the visual effect is smoother.
          */
          <VStack flexWrap="wrap" maxWidth="100%">
            <Box borderRadius={'4px'} borderWidth={'2px'} padding={'2px'}>
              {hasCopiedLightning || hasCopiedOnchain ? (
                <Box borderColor={'primary.400'}>
                  <QRCode
                    value={fallbackAddress}
                    size={208}
                    bgColor={'neutral.0'}
                    fgColor={'primary.400'}
                    qrStyle="dots"
                    logoImage={LogoPrimary}
                    logoHeight={40}
                    logoWidth={40}
                    eyeRadius={2}
                    removeQrCodeBehindLogo={true}
                  />
                </Box>
              ) : (
                <Box borderColor={'neutral.1000'}>
                  <QRCode
                    value={fallbackAddress}
                    size={208}
                    bgColor={'neutral.0'}
                    fgColor={'neutral.1000'}
                    qrStyle="dots"
                    logoImage={LogoDark}
                    logoHeight={40}
                    logoWidth={40}
                    eyeRadius={2}
                    removeQrCodeBehindLogo={true}
                  />
                </Box>
              )}
            </Box>
            <Box marginBottom={4} fontSize={'10px'}>
              <HStack spacing={5}>
                <Loader size="md" />
                <Text color={'neutral.900'} fontWeight={400}>
                  Waiting for payment...
                </Text>
              </HStack>
            </Box>
          </VStack>
        )

      case QRDisplayState.AWAITING_PAYMENT_WEB_LN:
        return (
          <VStack width={'350px'} height={'335px'} justifyContent={'center'}>
            <VStack>
              <Loader />
              <Text>Awaiting Payment</Text>
            </VStack>
          </VStack>
        )
      case QRDisplayState.INVOICE_CANCELLED:
        return <InvoiceErrorView onRefreshSelected={refreshFundingInvoice} />

      case QRDisplayState.FUNDING_CANCELED:
        return <FundingErrorView error={error} />

      default:
        return <GeneratingInvoice refreshInvoice={retryFundingFlow} />
    }
  }, [
    error,
    fallbackAddress,
    hasCopiedLightning,
    hasCopiedOnchain,
    qrDisplayState,
    refreshFundingInvoice,
    retryFundingFlow,
  ])

  return (
    <VStack spacing={4} width="100%">
      <VStack spacing={4}>
        <HStack
          mb={4}
          spacing={4}
          display={
            qrDisplayState === QRDisplayState.AWAITING_PAYMENT ? 'flex' : 'none'
          }
        >
          <Box>
            <FaBitcoin fontSize={'50px'} />
          </Box>
          <Box>
            <Text fontSize={'10px'} fontWeight={700}>
              Fund with any on-chain or lightning wallet.
            </Text>
            <Text fontSize={'10px'} fontWeight={400}>
              If you are paying on-chain, make sure to send the exact amount,
              otherwise it will not be displayed. The transaction will be
              confirmed after 1 confirmation.
            </Text>
          </Box>
        </HStack>
        {renderQrBox()}
      </VStack>
      <PaymentRequestCopyButton />
    </VStack>
  )
}

const GeneratingInvoice = ({
  refreshInvoice,
}: {
  refreshInvoice: () => void
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const timeout = useRef<NodeJS.Timeout | undefined>()

  useEffect(() => {
    timeout.current = setTimeout(onOpen, FUNDING_REQUEST_TIMEOUT)
    return () => clearTimeout(timeout.current)
  }, [onOpen])

  const handleRefresh = () => {
    refreshInvoice()
    onClose()
    timeout.current = setTimeout(onOpen, FUNDING_REQUEST_TIMEOUT)
  }

  return (
    <VStack width={'350px'} height={'335px'} justifyContent={'center'}>
      {isOpen ? (
        <VStack w="full" alignItems="center">
          <Body2 bold textAlign="center">
            Generating an invoice is taking longer than expected
          </Body2>
          <Body2>Click refresh to try again</Body2>
          <Button
            textTransform="uppercase"
            variant="secondary"
            size="sm"
            borderRadius="40px"
            leftIcon={<IoMdRefresh />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </VStack>
      ) : (
        <VStack>
          <Loader />
          <Text>Generating Invoice</Text>
        </VStack>
      )}
    </VStack>
  )
}
