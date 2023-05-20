import { useLazyQuery } from '@apollo/client'
import {
  FormErrorIcon,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ChangeEventHandler } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { FileUpload } from '../../../components/molecules'
import { TextArea, TextInputBox, UploadBox } from '../../../components/ui'
import { ProjectValidations } from '../../../constants'
import { useAuthContext } from '../../../context'
import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../../graphql'
import { colors } from '../../../styles'
import { toMediumImageUrl, validLightningAddress } from '../../../utils'
import { ProjectCreationVariables } from '../types'
import { FormInputContainer } from './FormInputContainer'
import { ProjectFundraisingDeadline } from './ProjectFundraisingDeadline'

const MIN_LENGTH_TO_QUERY_PROJECT = 3

type ProjectFormProps = {
  form: UseFormReturn<ProjectCreationVariables>
  isEdit: boolean
}

export const ProjectForm = ({ form, isEdit }: ProjectFormProps) => {
  const { user } = useAuthContext()

  const { formState, setValue, watch, setError } = form

  const [getProject] = useLazyQuery(QUERY_PROJECT_BY_NAME_OR_ID, {
    variables: {
      where: {
        name: watch('name'),
      },
    },
    onCompleted(data) {
      if (data && data.project && data.project.id) {
        setError('name', new Error('This lightning address is already taken.'))
      }
    },
  })

  const handleProjectFetch = () => {
    if (
      !isEdit &&
      watch('name') &&
      watch('name').length >= MIN_LENGTH_TO_QUERY_PROJECT
    ) {
      getProject()
    }
  }

  const handleImageUpload = (url: string) => {
    setValue('thumbnailImage', toMediumImageUrl(url), { shouldDirty: true })
  }

  const handleHeaderImageUpload = (url: string) => {
    setValue('image', url, { shouldDirty: true })
  }

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('email', event.target.value, { shouldDirty: true })
  }

  const handleDeleteThumbnail = () => {
    setValue('thumbnailImage', '', { shouldDirty: true })
  }

  const handleDeleteImage = () => {
    setValue('image', '', { shouldDirty: true })
  }

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    if (event) {
      const { name, value } = event.target

      if (name === 'title' && !isEdit) {
        const projectName: string = value.split(' ').join('').toLowerCase()
        const sanitizedName = projectName.replaceAll(validLightningAddress, '')

        setValue('name', sanitizedName, { shouldDirty: true })
      }

      if (name === 'name') {
        const sanitizedName = `${value}`
          .toLocaleLowerCase()
          .replaceAll(validLightningAddress, '')

        return setValue(name, sanitizedName, { shouldDirty: true })
      }

      setValue(name as keyof ProjectCreationVariables, value, {
        shouldDirty: true,
      })
    }
  }

  return (
    <VStack spacing={6}>
      <FormInputContainer
        title="Title"
        subtitle="A few words that make your project stand out"
      >
        <TextInputBox
          name="title"
          onChange={handleChange}
          value={watch('title')}
          error={formState.errors.title?.message}
          onBlur={handleProjectFetch}
        />
      </FormInputContainer>

      <FormInputContainer
        title="Lightning Address Preview"
        subtitle="This is the lightning address for your project. Funds sent to this lightning address will show in your project activity"
        error={FormErrorIcon.name}
      >
        <InputGroup size="md" borderRadius="8px">
          <Input
            name="name"
            onChange={handleChange}
            value={watch('name')}
            isInvalid={Boolean(formState.errors.name)}
            focusBorderColor={colors.primary}
            disabled={isEdit}
            onBlur={handleProjectFetch}
          />
          <InputRightAddon>@geyser.fund</InputRightAddon>
        </InputGroup>
      </FormInputContainer>

      <FormInputContainer
        title="Objective"
        subtitle="Add 'one liner' a simple descriptions of what your project is about"
      >
        <TextArea
          name="shortDescription"
          noOfLines={2}
          height="fit-content"
          overflowY="auto"
          value={watch('shortDescription')}
          onChange={handleChange}
          error={formState.errors.shortDescription?.message}
        />
        {!formState.errors.shortDescription && (
          <HStack width="100%" justifyContent="space-between">
            <Text fontSize="12px" color="neutral.700" />
            <Text fontSize="12px" color="neutral.700">{`${
              watch('shortDescription').length
            }/${ProjectValidations.shortDescription.maxLength}`}</Text>
          </HStack>
        )}
      </FormInputContainer>

      <FormInputContainer
        title="Image"
        subtitle="Add the main project image that will be displayed in all thumbnails"
      >
        <FileUpload
          showcase
          caption="For best fit, pick a square image. Image size limit: 10MB."
          src={watch('thumbnailImage')}
          onUploadComplete={handleImageUpload}
          onDeleteClick={handleDeleteThumbnail}
          childrenOnLoading={<UploadBox loading />}
        >
          <UploadBox
            h={10}
            title={watch('image') ? 'Change image' : undefined}
          />
        </FileUpload>
      </FormInputContainer>

      <FormInputContainer
        title="Header"
        subtitle="Add a header with a video link or by uploading an image to help bring your project to life"
      >
        <FileUpload
          showcase
          showcaseW="80px"
          caption="For best fit, pick an image around 800px x 200px. Image size limit:
        10MB."
          src={watch('image')}
          onUploadComplete={handleHeaderImageUpload}
          onDeleteClick={handleDeleteImage}
          childrenOnLoading={<UploadBox loading />}
        >
          <UploadBox
            h={10}
            title={watch('image') ? 'Change header' : undefined}
          />
        </FileUpload>
      </FormInputContainer>

      <FormInputContainer
        title="Fundraising deadline"
        subtitle="Add a deadline to your project if you have one, or just keep it as ongoing."
      >
        <ProjectFundraisingDeadline setValue={setValue} watch={watch} />
      </FormInputContainer>

      <FormInputContainer
        title="Email"
        subtitle="Project notifications will be sent to your profile email, which you can edit in Profile Settings. Make sure to verify your email to keep your wallet secure."
      >
        <TextInputBox
          name="email"
          value={watch('email')}
          onChange={handleEmail}
          error={formState.errors.email?.message}
          isDisabled={Boolean(user.email)}
        />
      </FormInputContainer>
    </VStack>
  )
}
