import React, { useMemo, useState } from 'react';
import { ListItem, List, Button, VStack, Divider } from '@chakra-ui/react';

import Loader from '../../../components/ui/Loader';
import { IProjectListEntryItem } from '../../../interfaces';
import { ProjectEntryCard } from '../../../components/molecules/projectDisplay/ProjectEntryCard';
import { useProjectEntries } from '../../../hooks';
import { AlertBox } from '../../../components/ui';

type Props = {
  itemLimit?: number;
};

export const LandingPageProjectsEntriesList = ({ itemLimit = 10 }: Props) => {
  const {
    isLoading,
    error,
    data: entries,
    fetchMore,
  } = useProjectEntries({
    // usePreviewData: true,
    itemLimit,
  });

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const isShowingAllEntries: boolean = useMemo(() => {
    // return entries.length <= itemLimit;
    return false;
  }, [entries, itemLimit]);

  if (error) {
    return (
      <AlertBox
        height="200px"
        status="error"
        title="An error occurred while attempting to fetch entries."
        message="Please try refreshing the page. You may also want to contact support if the problem persists."
      />
    );
  }

  if (isLoading && !entries) {
    return <Loader />;
  }

  if (entries?.length === 0) {
    return (
      <AlertBox
        height="200px"
        status="info"
        colorScheme={'gray'}
        title="There are currently no project entries."
        message="Please try refreshing the page. You may also want to contact support if the problem persists."
      />
    );
  }

  return (
    <VStack flexDirection={'column'} spacing={6}>
      {isLoading && <Loader />}

      <List spacing={6}>
        {entries.map((entry: IProjectListEntryItem) => (
          <ListItem key={entry.id}>
            <ProjectEntryCard entry={entry} />
          </ListItem>
        ))}
      </List>

      {isShowingAllEntries === false ? (
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
                console.log(entries);

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
