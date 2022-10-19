import React from 'react';
import { FundingTx } from '../../../types/generated/graphql';
import { ProjectFundingContributionsFeedItem } from '../../../components/molecules/projectActivity/ProjectFundingContributionsFeedItem';
import { gql, useQuery } from '@apollo/client';

type Props = {
  fundingTxID: number;
};

const GET_FUNDING_TX_FOR_USER_CONTRIBUTION = gql`
  query GetFundingTxForUserContribution($fundingTxId: BigInt!) {
    fundingTx(id: $fundingTxId) {
      id
      uuid
      invoiceId
      address
      paymentRequest
      amount
      status
      comment
      media
      paidAt
      onChain
      source
      funder {
        id
      }
      sourceResource {
        ... on Project {
          id
        }
        ... on Entry {
          id
        }
      }
    }
  }
`;

type ResponseData = {
  fundingTx: FundingTx;
};

type QueryVariables = {
  id: BigInt;
};

export const UserProfilePageContributionsListItem = ({
  fundingTxID,
}: Props) => {
  const { data, loading, error } = useQuery<ResponseData, QueryVariables>(
    GET_FUNDING_TX_FOR_USER_CONTRIBUTION,
    { variables: { id: BigInt(fundingTxID) } },
  );

  return data ? (
    <ProjectFundingContributionsFeedItem fundingTx={data.fundingTx} />
  ) : null;
};
