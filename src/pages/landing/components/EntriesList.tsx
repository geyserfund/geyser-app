import React, { useEffect } from 'react';
import { ListItem, List } from '@chakra-ui/react';
import { createUseStyles } from 'react-jss';

import { isMobileMode, useNotification } from '../../../utils';
import Loader from '../../../components/ui/Loader';
import { IProjectListEntryItem } from '../../../interfaces';
import { ProjectEntryCard } from '../../../components/molecules/projectDisplay/ProjectEntryCard';
import { useAllProjectEntries } from '../../../hooks';

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

export const EntriesList = () => {
  const { toast } = useNotification();

  const {
    isLoading,
    error,
    data: entries,
  } = useAllProjectEntries({
    usePreviewData: true,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: 'Could not load entries',
        description: 'Please refresh the page',
        status: 'error',
      });
    }
  }, [error]);

  if (error) {
    // return <ErrorState />;
    return <p>Error</p>;
  }

  if (isLoading && !entries) {
    return <Loader />;
  }

  if (entries?.length === 0) {
    // return <EmptyState />;
    return <p>EmptyState</p>;
  }

  return (
    <>
      {isLoading && <Loader />}

      <List spacing={4}>
        {entries.map((entry: IProjectListEntryItem) => (
          <ListItem key={entry.id}>
            <ProjectEntryCard entry={entry} />
          </ListItem>
        ))}
      </List>
    </>
  );
};
