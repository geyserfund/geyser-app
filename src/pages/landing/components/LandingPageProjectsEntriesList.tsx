import React, { useMemo, useState } from 'react';
import { Button, VStack, Divider } from '@chakra-ui/react';

import Loader from '../../../components/ui/Loader';
import { IProjectListEntryItem } from '../../../interfaces';
import { useProjectEntries } from '../../../hooks';
import { AlertBox } from '../../../components/ui';
import { ProjectEntryCard } from '../../../components/molecules';

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
    itemLimit,
  });

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const isShowingAllEntries: boolean = useMemo(() => {
    // TODO: Implement the right logic for this
    // based upon data returned
    // from fetching (and fetching more).
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
    <VStack flexDirection={'column'} spacing={6} width="full">
      {isLoading && <Loader />}

      <VStack alignItems={'flex-start'} width="full" spacing={'24px'}>
        {entries.map((entry: IProjectListEntryItem) => (
          <ProjectEntryCard entry={entry} key={entry.id} />
        ))}
      </VStack>

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
                  },
                });

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
