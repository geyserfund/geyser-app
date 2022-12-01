import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  HStack,
  HTMLChakraProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import Loader from '../../../components/ui/Loader';
import { FundingTx, InvoiceStatus } from '../../../types/generated/graphql';
import { QRCode } from 'react-qrcode-logo';
import { RiLinkUnlink } from 'react-icons/ri';
import { colors } from '../../../constants';
import { ButtonComponent } from '../../../components/ui';
import { FaBitcoin, FaCopy } from 'react-icons/fa';
import LogoDark from '../../../assets/logo-dark.svg';
import LogoPrimary from '../../../assets/logo-brand.svg';
import { BiRefresh } from 'react-icons/bi';
import { BsExclamationCircle } from 'react-icons/bs';
// import { useFundingFlow } from '../../../hooks';

type Props = {
  currentFundingTX: FundingTx;
  currentFundingTXInvoiceStatus: InvoiceStatus;
};

type InvoiceRefreshMutationResponseData = {
  fundingTx: FundingTx;
};

type InvoiceRefreshMutationInput = {
  fundingTxID: number;
};

const REFRESH_FUNDING_INVOICE = gql`
  mutation RefreshFundingInvoice($fundingTxID: BigInt!) {
    fundingInvoiceRefresh(fundingTxId: $fundingTxID) {
      id
      paymentRequest
    }
  }
`;

// eslint-disable-next-line no-unused-vars
enum QRDisplayState {
  // eslint-disable-next-line no-unused-vars
  REFRESHING = 'REFRESHING',
  // eslint-disable-next-line no-unused-vars
  AWAITING_PAYMENT = 'AWAITING_PAYMENT',
  // eslint-disable-next-line no-unused-vars
  COPIED = 'COPIED',
  // eslint-disable-next-line no-unused-vars
  INVOICE_FAILED = 'INVOICE_FAILED',
  // eslint-disable-next-line no-unused-vars
  INVOICE_CANCELLED = 'INVOICE_CANCELLED',
}

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
          Invoice failed or was cancelled
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

export const ProjectFundingQRScreenQRCodeSection = ({
  currentFundingTX,
  currentFundingTXInvoiceStatus,
}: Props) => {
  const [isRefreshingInvoice, setIsRefreshingInvoice] = useState(true);
  const [hasCopiedQRCode, setHasCopiedQRCode] = useState(false);
  const [errorFromRefresh, setErrorFromRefresh] = useState<string | null>(null);

  const [refreshInvoice] = useMutation<
    InvoiceRefreshMutationResponseData,
    InvoiceRefreshMutationInput
  >(REFRESH_FUNDING_INVOICE, {
    variables: {
      fundingTxID: currentFundingTX.id,
    },
    onError(error) {
      setErrorFromRefresh(error.message);
    },
  });

  const qrDisplayState = useMemo(() => {
    if (errorFromRefresh !== null) {
      return QRDisplayState.INVOICE_FAILED;
    }

    switch (currentFundingTXInvoiceStatus) {
      case InvoiceStatus.Unpaid:
        return isRefreshingInvoice
          ? QRDisplayState.REFRESHING
          : hasCopiedQRCode
          ? QRDisplayState.COPIED
          : QRDisplayState.AWAITING_PAYMENT;
      case InvoiceStatus.Canceled:
        return QRDisplayState.INVOICE_CANCELLED;
      default:
        return QRDisplayState.AWAITING_PAYMENT;
    }
  }, [
    isRefreshingInvoice,
    hasCopiedQRCode,
    currentFundingTXInvoiceStatus,
    errorFromRefresh,
  ]);

  const paymentRequest = useMemo(() => {
    // QUESTION: What should we do if the `paymentRequest` property returned
    // from the `fundingInvoiceRefresh` mutation is null?
    return currentFundingTX?.paymentRequest || '';
  }, [currentFundingTX, currentFundingTX.paymentRequest]);

  const qrForegroundColor = useMemo(() => {
    return hasCopiedQRCode ? colors.primary : colors.textBlack;
  }, [hasCopiedQRCode, colors]);

  const isShowingInvoiceErrorView = useMemo(() => {
    return [
      QRDisplayState.INVOICE_FAILED,
      QRDisplayState.INVOICE_CANCELLED,
    ].includes(qrDisplayState);
  }, [qrDisplayState]);

  const handleCopyButtonTapped = () => {
    navigator.clipboard.writeText(paymentRequest);

    setHasCopiedQRCode(true);

    setTimeout(() => {
      setHasCopiedQRCode(false);
    }, 2000);
  };

  const handleRefreshButtonTapped = () => {
    setHasCopiedQRCode(false);
    setIsRefreshingInvoice(true);

    refreshInvoice();
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
          <Text>{hasCopiedQRCode ? 'Address Copied' : 'Copy'}</Text>
        </HStack>
      </ButtonComponent>
    );
  };

  if (qrDisplayState === QRDisplayState.REFRESHING) {
    return (
      <VStack width={'350px'} height={'335px'} justifyContent={'center'}>
        <VStack>
          <Loader />
          <Text>Generating Invoice</Text>
        </VStack>
      </VStack>
    );
  }

  return (
    <VStack spacing={4}>
      <VStack spacing={4}>
        <HStack
          spacing={4}
          visibility={isShowingInvoiceErrorView ? 'hidden' : 'visible'}
        >
          <FaBitcoin fontSize={'2.5em'} />

          <Text fontSize={'10px'} fontWeight={400}>
            Scan this QR code to fund with Bitcoin on any wallet (on-chain or
            lightning). If you are paying onchain the transaction will confirm
            after 1 confirmation.
          </Text>
        </HStack>

        {isShowingInvoiceErrorView ? (
          <InvoiceErrorView onRefreshSelected={handleRefreshButtonTapped} />
        ) : (
          <Box
            borderRadius={'4px'}
            borderColor={qrForegroundColor}
            borderWidth={'2px'}
            padding={'2px'}
          >
            <QRCode
              value={paymentRequest!}
              size={208}
              bgColor={colors.bgWhite}
              fgColor={qrForegroundColor}
              qrStyle="dots"
              logoImage={hasCopiedQRCode ? LogoPrimary : LogoDark}
              logoHeight={40}
              logoWidth={40}
              eyeRadius={2}
              removeQrCodeBehindLogo={true}
            />
          </Box>
        )}

        <Box marginBottom={4} fontSize={'10px'}>
          {qrDisplayState === QRDisplayState.AWAITING_PAYMENT ? (
            <HStack spacing={5}>
              <Loader size="md" />
              <Text color={'brand.neutral900'} fontWeight={400}>
                Waiting for payment...
              </Text>
            </HStack>
          ) : qrDisplayState === QRDisplayState.COPIED ? (
            <Text color={'brand.primary'} fontWeight={700}>
              Copied!
            </Text>
          ) : null}
        </Box>
      </VStack>

      <PaymentRequestCopyButton
        disabled={hasCopiedQRCode || isShowingInvoiceErrorView}
      />
    </VStack>
  );
};
