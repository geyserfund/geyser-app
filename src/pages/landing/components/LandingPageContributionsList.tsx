import React, { useMemo, useState } from 'react';
import {
  ListItem,
  List,
  Container,
  Button,
  Divider,
  VStack,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';

import { QUERY_GET_FUNDING_TXS_LANDING } from '../../../graphql';
import Loader from '../../../components/ui/Loader';
import { ProjectFundingContributionsFeedItem } from '../../../components/molecules';
import { AlertBox } from '../../../components/ui';

const ContributionItem = ({
  transactionResponsePayload,
}: {
  transactionResponsePayload: any;
}) => {
  const { sourceResource: project, ...fundingTx } = transactionResponsePayload;

  return (
    <Container justifyContent={'center'} width={['308px', '536px']}>
      <ProjectFundingContributionsFeedItem
        fundingTx={fundingTx}
        project={project}
        width="full"
      />
    </Container>
  );
};

type Props = {
  itemLimit?: number;
};

export const LandingPageContributionsList = ({ itemLimit = 10 }: Props) => {
  const {
    loading: isLoading,
    error,
    data: responseData,
    fetchMore,
  } = useQuery(QUERY_GET_FUNDING_TXS_LANDING, {
    variables: { input: { pagination: { take: itemLimit } } },
  });

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const contributions = (responseData && responseData.getFundingTxs) || [];

  const isShowingAllContributions: boolean = useMemo(() => {
    // return contributions.length <= itemLimit;
    return false;
  }, [responseData, itemLimit]);

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
    <VStack flexDirection={'column'} spacing={6}>
      {isLoading && <Loader />}

      <List spacing={3}>
        {contributions.map((contribution: any, index: number) => (
          <ListItem key={index} justifyContent="center">
            <ContributionItem transactionResponsePayload={contribution} />
          </ListItem>
        ))}
      </List>

      {isShowingAllContributions === false ? (
        <>
          <Divider />

          {isLoadingMore === false ? (
            <Button
              onClick={async () => {
                setIsLoadingMore(true);
                await fetchMore({
                  variables: {
                    input: { pagination: { take: itemLimit } },
                    // offset: fundingTxsData.getFundingTxs.length,
                  },
                });
                console.log(contributions);

                setIsLoadingMore(false);
              }}
            >
              View More
            </Button>
          ) : (
            <Loader />
          )}
        </>
      ) : null}
    </VStack>
  );
};
