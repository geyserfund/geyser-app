import React from 'react';
import { ListItem, List, Container } from '@chakra-ui/react';
import { createUseStyles } from 'react-jss';
import { useQuery } from '@apollo/client';

import { isMobileMode } from '../../../utils';
import { QUERY_GET_FUNDING_TXS_LANDING } from '../../../graphql';
import Loader from '../../../components/ui/Loader';
import { ProjectFundingContributionsFeedItem } from '../../../components/molecules';
import { AlertBox } from '../../../components/ui';
import { IProjectContribution } from '../../../interfaces';

type RuleNames = string;

type StyleProps = {
  isMobile?: boolean;
};

const useStyles = createUseStyles<RuleNames, StyleProps>({
  titles: ({ isMobile }: StyleProps) => ({
    fontSize: isMobile ? '12px' : '14px',
    fontWeight: 500,
  }),
});

const ContributionItem = ({
  transactionResponsePayload,
}: {
  transactionResponsePayload: any;
}) => {
  const { sourceResource: project, ...fundingTx } = transactionResponsePayload;

  return (
    <Container
      justifyContent={'center'}
      minWidth={'308'}
      maxWidth={['full', '77%', '67%']}
    >
      <ProjectFundingContributionsFeedItem
        fundingTx={fundingTx}
        project={project}
      />
    </Container>
  );
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
        message="Please try refreshing the page. You may also want to contact support if the problem persists."
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
        title="There are currently no project contributions."
        message="Please try refreshing the page. You may also want to contact support if the problem persists."
      />
    );
  }

  return (
    <>
      {isLoading && <Loader />}

      <List spacing={3}>
        {contributions.map((contribution: any, index: number) => (
          <ListItem key={index} justifyContent="center">
            <ContributionItem transactionResponsePayload={contribution} />
          </ListItem>
        ))}
      </List>
    </>
  );
};
