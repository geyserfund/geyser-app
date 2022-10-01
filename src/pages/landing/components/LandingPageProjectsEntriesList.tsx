import React, { useMemo, useState } from 'react';
import { ListItem, List, Button, VStack, Divider } from '@chakra-ui/react';
import { createUseStyles } from 'react-jss';

import Loader from '../../../components/ui/Loader';
import { IProjectListEntryItem } from '../../../interfaces';
import { ProjectEntryCard } from '../../../components/molecules/projectDisplay/ProjectEntryCard';
import { useAllProjectEntries } from '../../../hooks';
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

export const LandingPageProjectsEntriesList = () => {
  const {
    isLoading,
    error,
    data: entries,
  } = useAllProjectEntries({
    // usePreviewData: true,
  });

  const [shouldShowAllEntries, setShouldShowAllEntries] = useState(false);

  const maxItemCount: number = useMemo(() => {
    return shouldShowAllEntries ? Infinity : 10;
  }, [shouldShowAllEntries, entries]);

  const entriesToShow: IProjectListEntryItem[] = useMemo(() => {
    return entries.slice(0, maxItemCount);
  }, [maxItemCount, entries]);

  const isShowingAllEntries: boolean = useMemo(() => {
    return shouldShowAllEntries || entriesToShow.length <= maxItemCount;
  }, [shouldShowAllEntries, entriesToShow]);

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
        {entriesToShow.map((entry: IProjectListEntryItem) => (
          <ListItem key={entry.id}>
            <ProjectEntryCard entry={entry} />
          </ListItem>
        ))}
      </List>

      {isShowingAllEntries === false ? (
        <>
          <Divider />

          <Button
            onClick={() => {
              setShouldShowAllEntries(true);
            }}
          >
            View More
          </Button>
        </>
      ) : null}
    </VStack>
  );
};
