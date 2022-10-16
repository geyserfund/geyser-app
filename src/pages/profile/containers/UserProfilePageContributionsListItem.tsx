import React from 'react';
import {
  FundingStatus,
  FundingTx,
  UserProjectContribution,
} from '../../../types/generated/graphql';
import { ProjectFundingContributionsFeedItem } from '../../../components/molecules/projectActivity/ProjectFundingContributionsFeedItem';

type Props = {
  contribution: UserProjectContribution;
};

export const UserProfilePageContributionsListItem = ({
  contribution,
}: Props) => {
  const { funder, project } = contribution;

  if (funder && project) {
    // TODO: We need a way to get the actual transaction info from the
    // database, given a `UserProjectContribution` instance.
    // (See: https://discord.com/channels/940363862723690546/940371255658418226/1030922471735574588)
    const transactionInfo: FundingTx = {
      amount: 21000,
      funder,
      onChain: Math.random() > 0.5,
      source: '',
      status: FundingStatus.Paid,
      uuid: '',
      id: undefined,
      invoiceId: '',
    };

    return (
      <ProjectFundingContributionsFeedItem
        funder={funder}
        project={project}
        transactionInfo={transactionInfo}
      />
    );
  }

  return null;
};
