import React from 'react';
import { ListItem, List } from '@chakra-ui/react';
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
    usePreviewData: false,
  });

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
    <>
      {isLoading && <Loader />}

      <List spacing={4}>
        {entries.map((entry: IProjectListEntryItem) => (
          <ListItem key={entry.id}>
            <ProjectEntryCard entry={entry} onEdit={() => {}} />
          </ListItem>
        ))}
      </List>
    </>
  );
};
