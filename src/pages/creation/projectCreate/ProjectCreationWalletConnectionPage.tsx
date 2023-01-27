import { useQuery } from '@apollo/client'
import { HStack, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { Navigate, useNavigate, useParams } from 'react-router'

import { IconButtonComponent } from '../../../components/ui'
import Loader from '../../../components/ui/Loader'
import { getPath } from '../../../constants'
import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../../graphql'
import { colors } from '../../../styles'
import {
  Project,
  UniqueProjectQueryInput,
} from '../../../types/generated/graphql'
import { toInt, useNotification } from '../../../utils'
import { ProjectCreationWalletConnectionForm } from '.'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'
import { TNodeInput } from './types'

type ResponseDataForGetProject = {
  project: Project
}

type QueryVariablesForGetProject = {
  where: UniqueProjectQueryInput
}

export const ProjectCreationWalletConnectionPage = () => {
  const navigate = useNavigate()
  const params = useParams<{ projectId: string }>()
  const { toast } = useNotification()

  const [nodeInput, setNodeInput] = useState<TNodeInput | undefined>(undefined)
  const [tiggerWalletOpen, setTriggerWalletOpen] = useState(false)

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
        })
      },
    },
  )

  const handleBackButtonTapped = () => {
    navigate(-1)
  }

  const handleProjectLaunch = async () => {
    navigate(getPath('project', responseData?.project.name))
  }

  const handleSavingAsDraft = async () => {
    navigate(getPath('project', responseData?.project.name))
  }

  if (isGetProjectLoading) {
    return <Loader />
  }

  if (projectLoadingError || !responseData || !responseData.project) {
    return <Navigate to={getPath('notFound')} />
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
  )

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
  )
}
