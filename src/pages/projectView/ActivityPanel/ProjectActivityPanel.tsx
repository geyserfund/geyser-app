import React, { useContext, useEffect, useState } from 'react';
import { AuthModal } from '../../../components/molecules';
import {
  IFundingTx,
  IProject,
  IFundingInput,
  IRewardFundingInput,
  IFunder,
} from '../../../interfaces';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECT_FUNDING_DATA } from '../../../graphql';
import { SuccessScreen } from './SuccessScreen';
import { QRPage } from './QRPage';
import { isMobileMode, useNotification } from '../../../utils';
import { PaymentPage } from './PaymentPage';
import { AuthContext } from '../../../context';
import { Box, Text, useDisclosure } from '@chakra-ui/react';
import classNames from 'classnames';
import { useStyles } from './styles';
import { InfoPage, InfoPageSkeleton } from './InfoPage';
import { fundingStages } from '../../../constants';
import { IFundForm, IFundFormState } from '../../../hooks';
import { useBtcContext } from '../../../context/btc';

interface IActivityProps {
  project: IProject;
  detailOpen: boolean;
  fundingFlow: any;
  setDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resourceType?: string;
  resourceId?: number;
  fundForm: IFundFormState;
}

export const ProjectActivityPanel = ({
  project,
  detailOpen,
  setDetailOpen,
  fundingFlow,
  fundForm,
  resourceType,
  resourceId,
}: IActivityProps) => {
  const { user } = useContext(AuthContext);

  const { btcRate } = useBtcContext();
  const { toast } = useNotification();
  const isMobile = isMobileMode();

  // Required for activity (recent and leaderboard) visibility
  const [fundingTxs, setFundingTxs] = useState<IFundingTx[]>([]);
  const [funders, setFunders] = useState<IFunder[]>([]);

  // required for knowing the rewards and the funds
  const { state, setTarget, setState, updateReward, resetForm } = fundForm;

  const {
    fundState,
    amounts,
    fundLoading,
    fundingTx,
    gotoNextStage,
    resetFundingFlow,
    requestFunding,
  } = fundingFlow;
  const {
    isOpen: loginIsOpen,
    onOpen: loginOnOpen,
    onClose: loginOnClose,
  } = useDisclosure();

  const [fadeStarted, setFadeStarted] = useState(false);

  const classes = useStyles({ isMobile, detailOpen, fadeStarted });

  const {
    loading,
    error,
    data: fundingData,
  } = useQuery(QUERY_PROJECT_FUNDING_DATA, {
    variables: { where: { id: project.id } },
  });

  useEffect(() => {
    if (fundingData && fundingData.project.fundingTxs) {
      setFundingTxs(fundingData.project.fundingTxs);
      setFunders(fundingData.project.funders);
    }
  }, [fundingData]);

  useEffect(() => {
    if (fundingTx && fundingTx.id && fundingTx.status === 'paid') {
      setFundingTxs([fundingTx, ...fundingTxs]);
    }
  }, [fundingTx]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please refresh the page',
        status: 'error',
      });
    }
  }, [error]);

  useEffect(() => {
    if (user && user.id) {
      setState('anonymous', false);
    }
  }, [user]);

  useEffect(() => {
    if (!state.anonymous && (!user || !user.id)) {
      loginOnOpen();
      setState('anonymous', true);
    }
  }, [state.anonymous]);

  const handleFundProject = () => {
    gotoNextStage();
  };

  const handleCloseButton = () => {
    resetFundingFlow();
    resetForm();
  };

  const formatFundingInput = (state: IFundForm) => {
    const {
      donationAmount,
      rewardsCost,
      shippingCost: cost,
      shippingDestination: destination,
      rewards,
      email,
      anonymous,
      comment,
      media,
    } = state;

    const input: IFundingInput = {
      projectId: Number(project.id),
      anonymous,
      ...(donationAmount !== 0 && { donationInput: { donationAmount } }),
      metadataInput: {
        ...(email && { email }),
        ...(media && { media }),
        ...(comment && { comment }),
      },
      sourceResourceInput: {
        resourceId: resourceId || Number(project.id),
        resourceType: resourceType || 'project',
      },
    };

    if (Object.entries(state.rewards).length > 0) {
      const rewardsArray = Object.keys(rewards).map((key) => ({
        id: parseInt(key, 10),
        quantity: rewards[key],
      }));
      const filteredRewards = rewardsArray.filter(
        (reward) => reward.quantity !== 0,
      );
      const rewardInput: IRewardFundingInput = {
        shipping: { cost, destination },
        rewards: filteredRewards,
        rewardsCost: Math.round(rewardsCost / btcRate),
      };
      input.rewardInput = rewardInput;
    }

    return input;
  };

  const handleFund = async () => {
    const input = formatFundingInput(state);
    requestFunding(input);
  };

  const handleViewClick = () => {
    setFadeStarted(true);
    setDetailOpen(true);
    setTimeout(() => {
      setFadeStarted(false);
    }, 500);
  };

  const renderPanelContent = () => {
    if (loading) {
      return <InfoPageSkeleton />;
    }

    switch (fundState) {
      case fundingStages.initial:
        return (
          <InfoPage
            {...{
              project,
              handleViewClick,
              handleFundProject,
              loading,
              btcRate,
              fundingTxs,
              funders,
              test: false,
            }}
          />
        );
      case fundingStages.form:
        return (
          <PaymentPage
            {...{
              fundLoading,
              isMobile,
              handleCloseButton,
              btcRate,
              state,
              setState,
              setTarget,
              updateReward,
              handleFund,
              rewards: project.rewards,
              type: project.type,
              name: project.name,
            }}
          />
        );
      case fundingStages.started:
        return (
          <QRPage
            state={state}
            project={project}
            fundingTx={fundingTx}
            amounts={amounts}
            handleCloseButton={handleCloseButton}
          />
        );
      case fundingStages.completed:
        return (
          <SuccessScreen
            fundingState={state}
            project={project}
            fundingTx={fundingTx}
            handleCloseButton={handleCloseButton}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Text>Panel Content</Text>

      <Box
        overflow="auto"
        className={classNames(classes.container, {
          [classes.slideInRight]: isMobile && !detailOpen,
          [classes.fadeOut]: isMobile && fadeStarted,
        })}
        flex={!isMobile ? 2 : undefined}
        maxWidth={isMobile ? 'auto' : '450px'}
        width={isMobile ? '100%' : undefined}
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        backgroundColor="#FFFFFF"
        marginTop={isMobile ? '61px' : '90px'}
        height={isMobile ? 'calc(100% - 61px)' : 'calc(100% - 90px)'}
        borderTopLeftRadius={isMobile ? '' : '22px'}
        boxShadow="0px 3px 12px rgba(0, 0, 0, 0.1)"
      >
        {renderPanelContent()}
      </Box>

      <AuthModal isOpen={loginIsOpen} onClose={loginOnClose} />
    </>
  );
};
