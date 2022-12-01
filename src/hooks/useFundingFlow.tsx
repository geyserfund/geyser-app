import { useContext, useEffect, useState } from 'react';
import { fundingStages, stageList } from '../constants';
import { AuthContext } from '../context';

import { IFundingAmounts } from '../interfaces';

import { IFundingStages } from '../constants';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { MUTATION_FUND } from '../graphql';
import { sha256, useNotification } from '../utils';
import { RejectionError, WebLNProvider } from 'webln';

import {
  FundingTx,
  FundingStatus,
  FundingInput,
} from '../types/generated/graphql';

type FundingTXQueryResponseData = {
  fundingTx: FundingTx;
};

type FundingTXQueryInput = {
  fundingTxID: number;
};

const QUERY_GET_FUNDING_TX_STATUS_AND_INVOICE_STATUS = gql`
  query GetFundingTxStatusAndInvoiceStatus($fundingTxID: BigInt!) {
    fundingTx(id: $fundingTxID) {
      status
      invoiceStatus
    }
  }
`;

const initialAmounts = {
  total: 0,
  donationAmount: 0,
  shippingCost: 0,
  rewardsCost: 0,
};

const initialFunding = {
  id: 0,
  uuid: '',
  invoiceId: '',
  status: FundingStatus.Unpaid,
  amount: 0,
  paymentRequest: '',
  address: '',
  canceled: false,
  comment: '',
  media: '',
  paidAt: '',
  onChain: false,
  source: '',
  funder: {
    id: 0,
    amountFunded: 0,
    timesFunded: 0,
    confirmed: false,
    confirmedAt: '',
    badges: [],
    rewards: [],
  },
};

let fundInterval: any;

interface IFundingFlowOptions {
  hasBolt11?: boolean;
  hasWebLN?: boolean;
}

export const useFundingFlow = (options?: IFundingFlowOptions) => {
  const { hasBolt11 = true, hasWebLN = true } = options || {
    hasBolt11: true,
    hasWebLN: true,
  };

  const { user } = useContext(AuthContext);
  const { toast } = useNotification();

  const [fundState, setFundState] = useState<IFundingStages>(
    fundingStages.initial,
  );

  const [fundingTx, setFundingTx] = useState<FundingTx>({
    ...initialFunding,
    funder: { ...initialFunding.funder, user },
  });

  const [amounts, setAmounts] = useState<IFundingAmounts>(initialAmounts);

  const [getFundingStatus, { data: fundingStatus }] = useLazyQuery<
    FundingTXQueryResponseData,
    FundingTXQueryInput
  >(QUERY_GET_FUNDING_TX_STATUS_AND_INVOICE_STATUS, {
    variables: {
      fundingTxID: fundingTx.id,
    },
    fetchPolicy: 'network-only',
  });

  const startWebLNFlow = async () => {
    let succeeded = false;

    const requestWebLNPayment = async () => {
      const { webln }: { webln: WebLNProvider } = window as any;
      if (!webln) {
        throw new Error('no provider');
      }

      await webln.enable();

      if (!fundingTx.paymentRequest) {
        throw new Error('payment request not found');
      }

      const { preimage } = await webln.sendPayment(fundingTx.paymentRequest);
      const paymentHash = await sha256(preimage);
      return paymentHash;
    };

    return requestWebLNPayment()
      .then((paymentHash) => {
        // Check preimage
        if (paymentHash === fundingTx.invoiceId) {
          gotoNextStage();
          succeeded = true;
          return succeeded;
        }

        throw new Error('wrong preimage');
      })
      .catch((error) => {
        if (error.message === 'no provider') {
          //
        } else if (error.message === 'wrong preimage') {
          toast({
            title: 'Wrong payment preimage',
            description:
              'The payment preimage returned by the WebLN provider did not match the payment hash.',
            status: 'error',
          });
        } else if (
          error.constructor === RejectionError ||
          error.message === 'User rejected'
        ) {
          toast({
            title: 'Requested operation declined',
            description: 'Please use the invoice instead.',
            status: 'info',
          });
        } else {
          toast({
            title: 'Oops! Something went wrong with WebLN.',
            description: 'Please use the invoice instead.',
            status: 'error',
          });
        }

        return succeeded;
      });
  };

  const [fundProject, { data, loading: fundLoading }] =
    useMutation(MUTATION_FUND);

  useEffect(() => {
    if (
      fundingStatus &&
      fundingStatus.fundingTx &&
      (fundingStatus.fundingTx.status === FundingStatus.Paid ||
        (fundingStatus.fundingTx.status === FundingStatus.Pending &&
          fundingTx.onChain))
    ) {
      const newTx = { ...fundingTx, status: fundingStatus.fundingTx.status };

      setFundingTx(newTx);
      clearInterval(fundInterval);
      gotoNextStage();
    }
  }, [fundingStatus]);

  useEffect(() => {
    if (
      fundState === fundingStages.completed ||
      fundState === fundingStages.canceled ||
      fundState
    ) {
      clearInterval(fundInterval);
    }

    if (fundState === fundingStages.started) {
      if (hasBolt11 && hasWebLN) {
        startWebLNFlow().then((success) => {
          if (!success) {
            fundInterval = setInterval(getFundingStatus, 1500);
          }
        });
      } else {
        fundInterval = setInterval(getFundingStatus, 1500);
      }
    }
  }, [fundState]);

  useEffect(() => {
    if (data && fundState === fundingStages.form) {
      if (data.fund && data.fund.fundingTx && data.fund.amountSummary) {
        setFundingTx(data.fund.fundingTx);
        setAmounts(data.fund.amountSummary);
        gotoNextStage();
      }
    }
  }, [data]);

  const gotoNextStage = () => {
    const currentIndex = stageList.indexOf(fundState);
    const nextState = stageList[currentIndex + 1];
    setFundState(nextState);
  };

  const requestFunding = async (input: FundingInput) => {
    try {
      gotoNextStage();
      await fundProject({ variables: { input } });
    } catch (_) {
      toast({
        title: 'Something went wrong',
        description: 'Please refresh the page and try again',
        status: 'error',
      });
    }
  };

  const resetFundingFlow = () => {
    setFundState(fundingStages.initial);
    setFundingTx({
      ...initialFunding,
      funder: { ...initialFunding.funder, user },
    });
    setAmounts(initialAmounts);
  };

  return {
    fundState,
    amounts,
    fundLoading,
    fundingTx,
    gotoNextStage,
    resetFundingFlow,
    requestFunding,
    setFundState,
  };
};
