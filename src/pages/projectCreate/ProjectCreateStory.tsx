import { HStack, Link, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { BiInfoCircle } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'

import TitleWithProgressBar from '../../components/molecules/TitleWithProgressBar'
import { TextArea } from '../../components/ui'
import { commonMarkdownUrl, getPath, ProjectValidations } from '../../constants'
import { useProjectState } from '../../hooks/graphqlState'
import { useNotification } from '../../utils'
import { FormContinueButton } from './components/FormContinueButton'
import { FormInputContainer } from './components/FormInputContainer'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'

const validateDescription = (description: string) => {
  if (!description) {
    return {
      error: 'Project objective is a required field.',
      isValid: false,
    }
  }

  if (description.length > ProjectValidations.description.maxLength) {
    return {
      error: `Project objective should be shorter than ${ProjectValidations.description.maxLength} characters.`,
      isValid: false,
    }
  }

  return {
    error: null,
    isValid: true,
  }
}

export const ProjectCreateStory = () => {
  const navigate = useNavigate()
  const { toast } = useNotification()
  const params = useParams<{ projectId: string }>()

  const [error, setError] = useState<string | null>(null)

  const { loading, saving, project, saveProject, updateProject } =
    useProjectState(
      Number(params.projectId),
      {
        fetchPolicy: 'network-only',
        onError() {
          toast({
            title: 'Error fetching project',
            status: 'error',
          })
        },
      },
      'id',
    )

  const handleBack = () => {
    if (!project) {
      return navigate(-1)
    }

    navigate(getPath('launchProjectDetails', project?.id))
  }

  const handleNext = async () => {
    const { error } = validateDescription(project?.description)

    if (error) {
      setError(error)
      return
    }

    try {
      await saveProject()
      navigate(getPath('launchProjectWithNode', project?.id))
    } catch (e) {
      toast({
        title: 'Error saving project',
        status: 'error',
      })
    }
  }

  const nextProps = {
    isDisabled: loading || saving,
    onClick: handleNext,
  }

  return (
    <ProjectCreateLayout
      continueButton={<FormContinueButton {...nextProps} flexGrow={1} />}
      onBackClick={handleBack}
      title={
        <TitleWithProgressBar
          title="Project description"
          subtitle="Create a project"
          index={3}
          length={4}
        />
      }
    >
      <VStack width="100%" alignItems="flex-start" spacing={6}>
        <FormInputContainer subtitle="Write a more in-depth description of the project. You can also add images and videos.">
          <TextArea
            isDisabled={loading || saving}
            name="description"
            minHeight="120px"
            maxHeight="800px"
            height="fit-content"
            overflowY="auto"
            value={project?.description || ''}
            onChange={(e) =>
              updateProject({ description: e.target.value || '' })
            }
            error={error}
          />
          {!error && (
            <HStack width="100%" justifyContent="space-between">
              <HStack>
                <Text fontSize="12px" color="brand.neutral700">
                  For **Bold** and *Italic*, see more{' '}
                </Text>
                <HStack
                  as={Link}
                  href={commonMarkdownUrl}
                  isExternal
                  spacing="0px"
                >
                  <BiInfoCircle />
                  <Text fontSize="12px" color="brand.neutral700">
                    MarkDown
                  </Text>
                </HStack>
              </HStack>
              <Text fontSize="12px" color="brand.neutral700">
                {`${project?.description?.length}/${ProjectValidations.description.maxLength}`}
              </Text>
            </HStack>
          )}
        </FormInputContainer>
        <FormContinueButton width="100%" {...nextProps} />
      </VStack>
    </ProjectCreateLayout>
  )
}
