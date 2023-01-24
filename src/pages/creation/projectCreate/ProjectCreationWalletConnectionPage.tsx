import {
  Box,
  Grid,
  GridItem,
  HStack,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { isMobileMode, toInt, useNotification } from '../../../utils';
import { colors, getPath } from '../../../constants';
import { useHistory, useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../../graphql';
import {
  Project,
  UniqueProjectQueryInput,
} from '../../../types/generated/graphql';
import Loader from '../../../components/ui/Loader';
import { ProjectCreationWalletConnectionForm } from '.';
import { Redirect } from 'react-router-dom';
import { ButtonComponent, IconButtonComponent } from '../../../components/ui';
import TitleWithProgressBar from '../../../components/molecules/TitleWithProgressBar';
import { BiLeftArrowAlt, BiPencil } from 'react-icons/bi';
import { TNodeInput } from './types';
import { ProjectCreateLayout } from './components/ProjectCreateLayout';

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

  const isMobile = isMobileMode();
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

  const [nodeInput, setNodeInput] = useState<TNodeInput | undefined>(undefined);
  const [tiggerWalletOpen, setTriggerWalletOpen] = useState(false);

  const {
    loading: isGetProjectLoading,
    error: projectLoadingError,
    data: responseData,
  } = useQuery<ResponseDataForGetProject, QueryVariablesForGetProject>(
    QUERY_PROJECT_BY_NAME_OR_ID,
    {
      variables: { where: { id: toInt(params.projectId) } },
      onError() {
        toast({
          title: 'Error fetching project',
          status: 'error',
        });
      },
    },
  );

  const handleBackButtonTapped = () => {
    history.goBack();
  };

  const handleProjectLaunch = async () => {
    history.push(getPath('project', responseData?.project.name));
  };

  const handleSavingAsDraft = async () => {
    history.push(getPath('project', responseData?.project.name));
  };

  if (isGetProjectLoading) {
    return <Loader />;
  }

  if (projectLoadingError || !responseData || !responseData.project) {
    return <Redirect to={getPath('notFound')} />;
  }

  const sideView = (
    <VStack
      justifyContent="flex-start"
      alignItems="flex-start"
      maxWidth="370px"
      width="100%"
      spacing="10px"
      paddingY="80px"
    >
      {nodeInput && nodeInput.name && (
        <VStack
          width="100%"
          border="1px solid"
          borderColor={colors.gray300}
          borderRadius="4px"
          alignItems="flex-start"
          padding="10px"
        >
          <HStack width="100%" justifyContent="space-between">
            <Text fontWeight={500}>{nodeInput?.name}</Text>
            <IconButtonComponent
              aria-label="edit-node"
              icon={<BiPencil />}
              onClick={() => setTriggerWalletOpen(true)}
            />
          </HStack>

          <VStack width="100%" alignItems="flex-start">
            <Text color="brand.textGray">Hostname or IP address</Text>
            <Text>{nodeInput?.hostname}</Text>
          </VStack>
        </VStack>
      )}
    </VStack>
  );

  return (
    <ProjectCreateLayout
      handleBack={handleBackButtonTapped}
      sideView={sideView}
      title="Connect Wallet"
      subtitle="Step 3 of 3"
      percentage={100}
    >
      <ProjectCreationWalletConnectionForm
        project={responseData.project}
        onProjectLaunchSelected={handleProjectLaunch}
        onSaveAsDraftSelected={handleSavingAsDraft}
        triggerWallet={tiggerWalletOpen}
        setNodeInput={setNodeInput}
      />
    </ProjectCreateLayout>
  );
};
