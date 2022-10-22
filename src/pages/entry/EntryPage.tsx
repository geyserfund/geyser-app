import { useLazyQuery } from '@apollo/client';
import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Head } from '../../utils/Head';
import Loader from '../../components/ui/Loader';
import { QUERY_PROJECT_BY_NAME } from '../../graphql';
import { NotFoundPage } from '../notFound';
import { ProjectActivityPanel } from '../projectView/ActivityPanel/ProjectActivityPanel';
import { useFundingFlow, useFundState } from '../../hooks';
import { useAuthContext } from '../../context';
import { QUERY_GET_ENTRY } from '../../graphql/queries/entries';
import { EntryContainer } from './EntryContainer';
import { Entry, Project, ProjectReward } from '../../types/generated/graphql';
import GeyserTempImage from '../../assets/images/project-entry-thumbnail-placeholder.svg';
import { compactMap } from '../../utils/compactMap';

export const EntryPage = () => {
  const { entryId } = useParams<{ entryId: string }>();
  const history = useHistory();

  const { setNav } = useAuthContext();

  const [detailOpen, setDetailOpen] = useState(true);
  const fundingFlow = useFundingFlow();

  useEffect(() => {
    if (entryId) {
      getEntry({ variables: { id: entryId } });
    }
  }, [entryId]);

  const [getProject, { loading, error: projectError, data: projectData }] =
    useLazyQuery(QUERY_PROJECT_BY_NAME, {
      onCompleted(data) {
        setNav({
          title: data.project.title,
          path: `/projects/${data.project.name}`,
        });
      },
    });

  const [getEntry, { loading: loadingPosts, error, data: entryData }] =
    useLazyQuery(QUERY_GET_ENTRY, {
      onCompleted(data) {
        const { entry } = data;

        getProject({ variables: { where: { id: entry.project.id } } });
      },
      onError(error) {
        console.error(error);
        history.push('/404');
      },
    });

  if (loadingPosts || loading || !projectData) {
    return <Loader />;
  }

  if (error || !entryData || !entryData.entry || projectError) {
    return <NotFoundPage />;
  }

  const project = projectData && projectData.project;
  const entry = entryData && entryData.entry;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        overflow="hidden"
        position="relative"
        bg="brand.bgGrey4"
      >
        <EntryViewWrapper
          {...{ project, entry, detailOpen, setDetailOpen, fundingFlow }}
        />
      </Box>
    </Box>
  );
};

interface IEntryViewWrapper {
  project: Project;
  entry: Entry;
  detailOpen: boolean;
  fundingFlow: any;
  setDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resourceType?: string;
  resourceId?: number;
}

const EntryViewWrapper = ({
  project,
  entry,
  detailOpen,
  setDetailOpen,
  fundingFlow,
}: IEntryViewWrapper) => {
  const rewards =
    (project.rewards && compactMap<ProjectReward>(project.rewards)) || [];
  const fundForm = useFundState({ rewards });
  const { setFundState } = fundingFlow;
  return (
    <>
      <Head
        title={`${entry.title} - ${project.title}`}
        description={entry.description}
        image={entry.image || entry.project?.image || GeyserTempImage}
      />
      <EntryContainer
        entry={entry}
        {...{ detailOpen, setDetailOpen, setFundState }}
      />
      <ProjectActivityPanel
        {...{ detailOpen, setDetailOpen, project, fundingFlow, fundForm }}
        resourceType="entry"
        resourceId={entry.id}
      />
    </>
  );
};
