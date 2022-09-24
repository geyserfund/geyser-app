import React, { useEffect } from 'react';
import { ListItem, List } from '@chakra-ui/react';
import { createUseStyles } from 'react-jss';
import { useQuery } from '@apollo/client';

import { isMobileMode, useNotification } from '../../../utils';
import { QUERY_GET_FUNDING_TXS_LANDING } from '../../../graphql';
import Loader from '../../../components/ui/Loader';
import { IdBar } from '../../../components/molecules';

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

const Contribution = ({ contribution }: { contribution: any }) => {
  console.log(contribution);
  const { sourceResource: project, ...fundingTx } = contribution;
  return <IdBar fundingTx={fundingTx} project={project} maxWidth="60%" />;
};

export const ContributionsList = () => {
  const classes = useStyles({ isMobile: isMobileMode() });
  const { toast } = useNotification();

  const {
    loading: isLoading,
    error,
    data: fundingTxsData,
  } = useQuery(QUERY_GET_FUNDING_TXS_LANDING, { variables: {} });

  const contributions = (fundingTxsData && fundingTxsData.getFundingTxs) || [];

  useEffect(() => {
    if (error) {
      toast({
        title: 'Could not load contributions',
        description: 'Please refresh the page',
        status: 'error',
      });
    }
  }, [error]);

  if (error) {
    // return <ErrorState />;
    return <p>Error</p>;
  }

  if (isLoading && !contributions) {
    return <Loader />;
  }

  if (contributions?.length === 0) {
    // return <EmptyState />;
    return <p>EmptyState</p>;
  }

  return (
    <>
      {isLoading && <Loader />}

      <List spacing={3}>
        {contributions.map((contribution: any, index: number) => (
          <ListItem key={index}>
            <Contribution contribution={contribution} />
          </ListItem>
        ))}
      </List>
    </>
  );
};
