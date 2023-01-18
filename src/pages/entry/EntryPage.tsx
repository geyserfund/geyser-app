import { useLazyQuery } from '@apollo/client';
import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Head } from '../../utils/Head';
import Loader from '../../components/ui/Loader';
import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../graphql';
import { NotFoundPage } from '../notFound';
import { ProjectActivityPanel } from '../projectView/ActivityPanel/ProjectActivityPanel';
import { useFundingFlow, useFundingFormState } from '../../hooks';
import { useAuthContext } from '../../context';
import { QUERY_GET_ENTRY } from '../../graphql/queries/entries';
import { EntryContainer } from './EntryContainer';
import {
  Entry,
  FundingResourceType,
  Owner,
  Project,
  ProjectReward,
} from '../../types/generated/graphql';
import GeyserTempImage from '../../assets/images/project-entry-thumbnail-placeholder.svg';
import { compactMap } from '../../utils/compactMap';
import { getPath } from '../../constants';
import { ProjectProvider } from '../projectView';
import { isMobileMode, toInt } from '../../utils';
import { ProjectNav } from '../../components/nav';

export const EntryPage = () => {
  const { entryId } = useParams<{ entryId: string }>();
  const history = useHistory();
  const isMobile = isMobileMode();

  const { setNav } = useAuthContext();

  const [detailOpen, setDetailOpen] = useState(true);
  const fundingFlow = useFundingFlow();

  useEffect(() => {
    if (entryId) {
      getEntry({ variables: { id: toInt(entryId) } });
    }
  }, [entryId]);

  const [getProject, { loading, error: projectError, data: projectData }] =
    useLazyQuery(QUERY_PROJECT_BY_NAME_OR_ID, {
      onCompleted(data) {
        setNav({
          projectName: data.project.name,
          projectTitle: data.project.title,
          projectPath: getPath('project', data.project.name),
          projectOwnerIDs:
            data.project.owners.map((ownerInfo: Owner) => {
              return Number(ownerInfo.user.id || -1);
            }) || [],
        });
      },
    });

  const [getEntry, { loading: loadingPosts, error, data: entryData }] =
    useLazyQuery(QUERY_GET_ENTRY, {
      onCompleted(data) {
        const { entry } = data;

        getProject({ variables: { where: { id: toInt(entry.project.id) } } });
      },
      onError(error) {
        console.error(error);
        history.push(getPath('notFound'));
      },
    });

  if (loadingPosts || loading || !projectData) {
    return <Loader paddingTop="65px" />;
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
        flexDirection={isMobile ? 'column' : 'row'}
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
  const isMobile = isMobileMode();
  const rewards =
    (project.rewards && compactMap<ProjectReward>(project.rewards)) || [];
  const fundForm = useFundingFormState({ rewards });
  const { setFundState } = fundingFlow;
  return (
    <ProjectProvider project={project}>
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
        resourceType={FundingResourceType.Entry}
        resourceId={entry.id}
      />
      {isMobile && <ProjectNav />}
    </ProjectProvider>
  );
};
