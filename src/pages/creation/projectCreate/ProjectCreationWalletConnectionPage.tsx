import { Box } from '@chakra-ui/react';
import React from 'react';
import { useNotification } from '../../../utils';
import { getPath } from '../../../constants';
import { useHistory, useParams } from 'react-router';
import { useMutation, useQuery } from '@apollo/client';
import {
  MUTATION_CREATE_WALLET,
  MUTATION_UPDATE_PROJECT,
} from '../../../graphql/mutations';
import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../../graphql';
import {
  CreateWalletInput,
  Project,
  UniqueProjectQueryInput,
} from '../../../types/generated/graphql';
import Loader from '../../../components/ui/Loader';
import { ProjectCreationWalletConnectionForm } from '.';

type ResponseDataForGetProject = {
  project: Project;
};

type QueryVariablesForGetProject = {
  where: UniqueProjectQueryInput;
};

export const ProjectCreationWalletConnectionPage = () => {
  const history = useHistory();
  const params = useParams<{ projectId: string }>();
  const { toast } = useNotification();

  const {
    loading: isGetProjectLoading,
    error: projectLoadingError,
    data: responseData,
  } = useQuery<ResponseDataForGetProject, QueryVariablesForGetProject>(
    QUERY_PROJECT_BY_NAME_OR_ID,
    {
      variables: { where: { id: params.projectId } },
      onError() {
        toast({
          title: 'Error fetching project',
          status: 'error',
        });
      },
    },
  );

  const [createWallet, { loading: isCreateWalletLoading }] = useMutation(
    MUTATION_CREATE_WALLET,
  );

  const [updateProject, { loading: isUpdatingProject }] = useMutation(
    MUTATION_UPDATE_PROJECT,
    {
      onError(error) {
        toast({
          title: 'Something went wrong',
          description: `${error}`,
          status: 'error',
        });
      },
    },
  );

  const handleBackButtonTapped = () => {
    history.push(
      getPath('launchProjectWithMilestonesAndRewards', params.projectId),
    );
  };

  const handleProjectLaunch = async (input: CreateWalletInput) => {
    try {
      await createWallet({ variables: { input } });

      history.push(getPath('project', responseData?.project.name));
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `${error}`,
        status: 'error',
      });
    }
  };

  const handleSavingAsDraft = async () => {
    try {
      await updateProject({
        variables: {
          input: {
            projectId: responseData?.project.id,
            draft: true,
          },
        },
      });

      history.push(getPath('project', responseData?.project.name));
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `${error}`,
        status: 'error',
      });
    }
  };

  if (isGetProjectLoading) {
    return <Loader />;
  }

  if (projectLoadingError || !responseData || !responseData.project) {
    return history.replace(getPath('notFound'));
  }

  return (
    <Box
      background={'brand.bgGrey4'}
      position="relative"
      paddingTop="60px"
      height="100%"
      justifyContent="space-between"
    >
      <ProjectCreationWalletConnectionForm
        project={responseData.project}
        onProjectLaunchSelected={handleProjectLaunch}
        onSaveAsDraftSelected={handleSavingAsDraft}
        onBackButtonTapped={handleBackButtonTapped}
        isProcessingSubmission={isCreateWalletLoading || isUpdatingProject}
      />
    </Box>
  );
};
