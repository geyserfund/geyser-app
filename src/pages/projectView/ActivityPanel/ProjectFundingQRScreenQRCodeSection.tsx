import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  HStack,
  HTMLChakraProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import Loader from '../../../components/ui/Loader';
import { FundingStatus, InvoiceStatus } from '../../../types/generated/graphql';
import { QRCode } from 'react-qrcode-logo';
import { RiLinkUnlink } from 'react-icons/ri';
import { colors } from '../../../constants';
import { ButtonComponent } from '../../../components/ui';
import { FaBitcoin, FaCopy } from 'react-icons/fa';
import LogoDark from '../../../assets/logo-dark.svg';
import LogoPrimary from '../../../assets/logo-brand.svg';
import { BiRefresh } from 'react-icons/bi';
import { BsExclamationCircle } from 'react-icons/bs';

type Props = {
  fundingFlow: any;
};

// eslint-disable-next-line no-unused-vars
enum QRDisplayState {
  // eslint-disable-next-line no-unused-vars
  REFRESHING = 'REFRESHING',
  // eslint-disable-next-line no-unused-vars
  AWAITING_PAYMENT = 'AWAITING_PAYMENT',
  // eslint-disable-next-line no-unused-vars
  AWAITING_PAYMENT_WEB_LN = 'AWAITING_PAYMENT_WEB_LN',
  // eslint-disable-next-line no-unused-vars
  INVOICE_CANCELLED = 'INVOICE_CANCELLED',
  // eslint-disable-next-line no-unused-vars
  FUNDING_CANCELED = 'FUNDING_CANCELED',
}

const FundingErrorView = () => {
  return (
    <VStack
      height={248}
      width={252}
      spacing={4}
      backgroundColor={'brand.bgLightRed'}
      justifyContent="center"
      borderRadius={'md'}
    >
      <BsExclamationCircle fontSize={'2em'} />

      <VStack spacing={1}>
        <Text fontWeight={700} fontSize="14px" padding={5} align="center">
          Funding failed to get initiated or was canceled. Please try again or
          contact the project creator if the error persists.
        </Text>
      </VStack>
    </VStack>
  );
};

const InvoiceErrorView = ({
  onRefreshSelected,
}: {
  onRefreshSelected: () => void;
}) => {
  return (
    <VStack
      height={248}
      width={252}
      spacing={4}
      backgroundColor={'brand.primary100'}
      justifyContent="center"
      borderRadius={'md'}
    >
      <BsExclamationCircle fontSize={'2em'} />

      <VStack spacing={1}>
        <Text fontWeight={700} fontSize="14px">
          Invoice was cancelled or expired.
        </Text>
        <Text>Click refresh to try again</Text>
      </VStack>

      <Button
        leftIcon={<BiRefresh fontSize={'2em'} />}
        iconSpacing={2}
        backgroundColor={'brand.bgWhite'}
        textTransform={'uppercase'}
        onClick={onRefreshSelected}
        borderRadius={'full'}
        fontSize={'10px'}
      >
        Refresh
      </Button>
    </VStack>
  );
};

export const ProjectFundingQRScreenQRCodeSection = ({ fundingFlow }: Props) => {
  const [hasCopiedQRCode, setHasCopiedQRCode] = useState(false);
  const [errorFromRefresh, setErrorFromRefresh] = useState<string | null>(null);

  const {
    fundingTx,
    fundingRequestErrored,
    refreshFundingInvoice,
    invoiceRefreshErrored,
    invoiceRefreshLoading,
    fundingRequestLoading,
    hasWebLN,
    weblnErrored,
  } = fundingFlow;

  const qrDisplayState = useMemo(() => {
    if (invoiceRefreshLoading || fundingRequestLoading) {
      return QRDisplayState.REFRESHING;
    }

    if (fundingRequestErrored || fundingTx.status === FundingStatus.Canceled) {
      return QRDisplayState.FUNDING_CANCELED;
    }

    if (
      fundingTx.invoiceStatus === InvoiceStatus.Canceled ||
      invoiceRefreshErrored
    ) {
      return QRDisplayState.INVOICE_CANCELLED;
    }

    if (hasWebLN && !weblnErrored) {
      return QRDisplayState.AWAITING_PAYMENT_WEB_LN;
    }

    return QRDisplayState.AWAITING_PAYMENT;
  }, [
    invoiceRefreshLoading,
    fundingRequestLoading,
    fundingTx.invoiceStatus,
    fundingTx.status,
    weblnErrored,
    errorFromRefresh,
    invoiceRefreshErrored,
    fundingRequestErrored,
  ]);

  const value = useMemo(() => {
    // QUESTION: What should we do if the `paymentRequest` property returned
    // from the `fundingInvoiceRefresh` mutation is null?

    const { id, paymentRequest, address, amount } = fundingTx;

    if (id === 0) {
      return '';
    }

    let value;
    if ((!address && !paymentRequest) || !amount) {
      setErrorFromRefresh('Could not fetch funding data');
    }

    const btcAmount = amount / 10 ** 8;

    // If no on-chain address could be generated, only show the payment request
    if (!address) {
      value = paymentRequest;
    }

    // If no payment request could be generated, only show the on-chain option
    if (!paymentRequest) {
      value = `bitcoin:${address}?amount=${btcAmount}`;
    }

    value = `bitcoin:${address}?amount=${btcAmount}&lightning=${paymentRequest}`;
    return value;
  }, [fundingTx, fundingTx.paymentRequest, fundingTx.address]);

  const handleCopyButtonTapped = () => {
    navigator.clipboard.writeText(value!);

    setHasCopiedQRCode(true);

    setTimeout(() => {
      setHasCopiedQRCode(false);
    }, 500);
  };

  const PaymentRequestCopyButton = ({ ...rest }: HTMLChakraProps<'button'>) => {
    return (
      <ButtonComponent
        isFullWidth
        onClick={handleCopyButtonTapped}
        _disabled={{
          opacity: hasCopiedQRCode ? '1' : '0.4',
          pointerEvents: 'none',
        }}
        backgroundColor={hasCopiedQRCode ? 'brand.bgWhite' : 'brand.primary400'}
        borderColor={hasCopiedQRCode ? 'brand.neutral200' : 'none'}
        borderWidth={hasCopiedQRCode ? '1px' : '0'}
        {...rest}
      >
        <HStack spacing={4}>
          {hasCopiedQRCode ? (
            <RiLinkUnlink fontSize={'2em'} />
          ) : (
            <FaCopy fontSize={'2em'} />
          )}
          <Text>{hasCopiedQRCode ? 'Copied' : 'Copy'}</Text>
        </HStack>
      </ButtonComponent>
    );
  };

  const renderQrBox = () => {
    switch (qrDisplayState) {
      case QRDisplayState.AWAITING_PAYMENT:
        return (
          /* This is setting the ground for using overlapping Grid items. Reasoning: the transition from "copied" to "not
            copied" is not smooth because it takes a few milli-seconds to re-render the logo. The idea would be to 
            render both elements in a Grid, make them overlap and hide one of the two based on the value of "hasCopiedQrCode".
            This way the component is already rendered, and the visual effect is smoother.
          */
          <VStack>
            <Box borderRadius={'4px'} borderWidth={'2px'} padding={'2px'}>
              {hasCopiedQRCode ? (
                <Box borderColor={colors.primary}>
                  <QRCode
                    value={value!}
                    size={208}
                    bgColor={colors.bgWhite}
                    fgColor={colors.primary}
                    qrStyle="dots"
                    logoImage={LogoPrimary}
                    logoHeight={40}
                    logoWidth={40}
                    eyeRadius={2}
                    removeQrCodeBehindLogo={true}
                  />
                </Box>
              ) : (
                <Box
                  visibility={!hasCopiedQRCode ? 'visible' : 'hidden'}
                  borderColor={colors.textBlack}
                >
                  <QRCode
                    value={value!}
                    size={208}
                    bgColor={colors.bgWhite}
                    fgColor={colors.textBlack}
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
                <Text color={'brand.neutral900'} fontWeight={400}>
                  Waiting for payment...
                </Text>
              </HStack>
            </Box>
          </VStack>
        );

      case QRDisplayState.AWAITING_PAYMENT_WEB_LN:
        return (
          <VStack width={'350px'} height={'335px'} justifyContent={'center'}>
            <VStack>
              <Loader />
              <Text>Awaiting Payment</Text>
            </VStack>
          </VStack>
        );
      case QRDisplayState.INVOICE_CANCELLED:
        return <InvoiceErrorView onRefreshSelected={refreshFundingInvoice} />;

      case QRDisplayState.FUNDING_CANCELED:
        return <FundingErrorView />;

      default:
        return (
          <VStack width={'350px'} height={'335px'} justifyContent={'center'}>
            <VStack>
              <Loader />
              <Text>Generating Invoice</Text>
            </VStack>
          </VStack>
        );
    }
  };

  return (
    <VStack spacing={4}>
      <VStack spacing={4}>
        <HStack
          spacing={4}
          visibility={
            qrDisplayState === QRDisplayState.AWAITING_PAYMENT
              ? 'visible'
              : 'hidden'
          }
        >
          <FaBitcoin fontSize={'2.5em'} />
          <Text fontSize={'10px'} fontWeight={400}>
            Scan this QR code to fund with Bitcoin on any wallet (on-chain or
            lightning). If you are paying onchain the transaction will confirm
            after 1 confirmation.
          </Text>
        </HStack>
        {renderQrBox()}
      </VStack>

      <PaymentRequestCopyButton
        visibility={
          qrDisplayState === QRDisplayState.AWAITING_PAYMENT
            ? 'visible'
            : 'hidden'
        }
      />
    </VStack>
  );
};
