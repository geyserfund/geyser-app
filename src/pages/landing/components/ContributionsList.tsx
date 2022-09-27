import React from 'react';
import { ListItem, List } from '@chakra-ui/react';
import { createUseStyles } from 'react-jss';
import { useQuery } from '@apollo/client';

import { isMobileMode } from '../../../utils';
import { QUERY_GET_FUNDING_TXS_LANDING } from '../../../graphql';
import Loader from '../../../components/ui/Loader';
import { IdBar } from '../../../components/molecules';
import { AlertBox } from '../../../components/ui';

type RuleNames = string;

interface IStyleProps {
  isMobile?: boolean;
}

const useStyles = createUseStyles<RuleNames, IStyleProps>({
  titles: ({ isMobile }: IStyleProps) => ({
    fontSize: isMobile ? '12px' : '14px',
    fontWeight: 500,
  }),
});

const ContributionItem = ({ contribution }: { contribution: any }) => {
  const { sourceResource: project, ...fundingTx } = contribution;

  return <IdBar fundingTx={fundingTx} project={project} maxWidth="60%" />;
};

export const ContributionsList = () => {
  const classes = useStyles({ isMobile: isMobileMode() });

  const {
    loading: isLoading,
    error,
    data: fundingTxsData,
  } = useQuery(QUERY_GET_FUNDING_TXS_LANDING, { variables: {} });

  const contributions = (fundingTxsData && fundingTxsData.getFundingTxs) || [];

  if (error) {
    return (
      <AlertBox
        height="200px"
        status="error"
        title="An error occurred while attempting to fetch contributions."
        message="Please try refreshing the page."
      />
    );
  }

  if (isLoading && !contributions) {
    return <Loader />;
  }

  if (contributions?.length === 0) {
    return (
      <AlertBox
        height="200px"
        status="info"
        colorScheme={'gray'}
        title="No project contributions items could be found."
        // message="Please try refreshing the page."
      />
    );
  }

  return (
    <>
      {isLoading && <Loader />}

      <List spacing={3}>
        {contributions.map((contribution: any, index: number) => (
          <ListItem key={index}>
            <ContributionItem contribution={contribution} />
          </ListItem>
        ))}
      </List>
    </>
  );
};
