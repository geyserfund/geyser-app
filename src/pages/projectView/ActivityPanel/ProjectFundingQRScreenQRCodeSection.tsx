import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import Loader from '../../../components/ui/Loader';
import { FundingTx } from '../../../types/generated/graphql';
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
  fundingTxID: number;
};

type InvoiceRefreshMutationResponseData = {
  fundingTx: FundingTx;
};

type InvoiceRefreshMutationInput = {
  fundingTxId: number;
};

const REFRESH_FUNDING_INVOICE = gql`
  mutation RefreshFundingInvoice($fundingTxId: BigInt!) {
    fundingInvoiceRefresh(fundingTxId: $fundingTxId) {
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

const ProjectFundingQRScreenQRCodeSection = ({ fundingTxID }: Props) => {
  const [qrDisplayState, setQRDisplayState] = useState<QRDisplayState>(
    QRDisplayState.REFRESHING,
  );

  const [hasCopiedQRCode, setHasCopiedQRCode] = useState(false);

  const [currentFundingTX, setCurrentFundingTX] = useState<FundingTx | null>(
    null,
  );

  const [refreshInvoice] = useMutation<
    InvoiceRefreshMutationResponseData,
    InvoiceRefreshMutationInput
  >(REFRESH_FUNDING_INVOICE, {
    variables: {
      fundingTxId: fundingTxID,
    },
    onCompleted({ fundingTx }) {
      setCurrentFundingTX(fundingTx);
      setQRDisplayState(QRDisplayState.AWAITING_PAYMENT);
    },
    onError(error) {
      setQRDisplayState(QRDisplayState.INVOICE_FAILED);
    },
  });

  const paymentRequest = useMemo(() => {
    // QUESTION: What should we do if the `paymentRequest` property returned
    // from the `fundingInvoiceRefresh` mutation is null?
    return currentFundingTX?.paymentRequest || '';
  }, [currentFundingTX]);

  const qrForegroundColor = useMemo(() => {
    return hasCopiedQRCode ? colors.primary : colors.textBlack;
  }, [hasCopiedQRCode, colors]);

  const handleCopyButtonTapped = () => {
    setHasCopiedQRCode(true);
    setQRDisplayState(QRDisplayState.COPIED);

    navigator.clipboard.writeText(paymentRequest);
  };

  const handleRefreshButtonTapped = () => {
    setHasCopiedQRCode(false);
    setQRDisplayState(QRDisplayState.REFRESHING);

    refreshInvoice();
  };

  const PaymentRequestCopyButton = () => {
    return (
      <ButtonComponent
        isFullWidth
        onClick={handleCopyButtonTapped}
        disabled={hasCopiedQRCode}
        _disabled={{
          opacity: 1,
          pointerEvents: 'none',
        }}
        backgroundColor={hasCopiedQRCode ? 'brand.bgWhite' : 'brand.primary400'}
        borderColor={hasCopiedQRCode ? 'brand.neutral200' : 'none'}
        borderWidth={hasCopiedQRCode ? '1px' : '0'}
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

  useEffect(() => {
    refreshInvoice();
  }, [refreshInvoice]);

  if (qrDisplayState === QRDisplayState.REFRESHING) {
    return (
      <VStack>
        <Loader />
        <Text>Generating Invoice</Text>
      </VStack>
    );
  }

  if (
    [QRDisplayState.INVOICE_FAILED, QRDisplayState.INVOICE_CANCELLED].includes(
      qrDisplayState,
    )
  ) {
    return (
      <VStack spacing={4}>
        <BsExclamationCircle fontSize={'3rem'} />

        <VStack spacing={1}>
          <Text>Invoice failed or was cancelled</Text>
          <Text>Click refresh to try again</Text>
        </VStack>

        <Button
          leftIcon={<BiRefresh />}
          backgroundColor={'brand.bgWhite'}
          textTransform={'uppercase'}
          onClick={handleRefreshButtonTapped}
          borderRadius={'full'}
        >
          Refresh
        </Button>
      </VStack>
    );
  }

  return (
    <VStack spacing={4}>
      <HStack spacing={4}>
        <FaBitcoin fontSize={'2rem'} />
        <Text fontSize={'10px'} fontWeight={400}>
          Scan this QR code to fund with Bitcoin on any wallet (on-chain or
          lightning).
        </Text>
      </HStack>

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
          logoHeight={60}
          logoWidth={60}
          eyeRadius={4}
          removeQrCodeBehindLogo={true}
        />
      </Box>

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

      {[QRDisplayState.AWAITING_PAYMENT, QRDisplayState.COPIED].includes(
        qrDisplayState,
      ) ? (
        <PaymentRequestCopyButton />
      ) : null}
    </VStack>
  );
};

export default ProjectFundingQRScreenQRCodeSection;
