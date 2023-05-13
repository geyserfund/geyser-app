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
import { Dispatch, SetStateAction } from 'react'

import { CharacterLimitError } from '../../../components/errors'
import { FileUpload } from '../../../components/molecules'
import { TextArea, TextInputBox, UploadBox } from '../../../components/ui'
import { ProjectValidations } from '../../../constants'
import { useAuthContext } from '../../../context'
import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../../graphql'
import { colors } from '../../../styles'
import { FormError, Project } from '../../../types'
import { toMediumImageUrl, validLightningAddress } from '../../../utils'
import { ProjectCreationVariables, ProjectUpdateVariables } from '../types'
import { FormInputContainer } from './FormInputContainer'
import { ProjectFundraisingDeadline } from './ProjectFundraisingDeadline'

interface ProjectCreateFormProps {
  isEdit?: boolean
  form: ProjectCreationVariables | ProjectUpdateVariables
  formError: FormError<ProjectCreationVariables>
  setFormError: any
  setForm: Dispatch<
    SetStateAction<ProjectCreationVariables | ProjectUpdateVariables>
  >
}

const MIN_LENGTH_TO_QUERY_PROJECT = 3

export const ProjectCreateFormValidation = (form: Partial<Project>) => {
  const errors = {} as { [key: string]: string }
  let isValid = true
  if (!form.title) {
    errors.title = 'Title is a required field.'
    isValid = false
  } else if (form.title.length > ProjectValidations.title.maxLength) {
    errors.title = `Title should be shorter than ${ProjectValidations.title.maxLength} characters.`
    isValid = false
  }

  if (!form.name) {
    errors.name = 'Project name is a required field.'
    isValid = false
  } else if (
    form.name.length < ProjectValidations.name.minLength ||
    form.name.length > ProjectValidations.name.maxLength
  ) {
    errors.name = `Project name should be between ${ProjectValidations.name.minLength} and ${ProjectValidations.name.maxLength} characters.`
    isValid = false
  }

  if (!form.shortDescription) {
    errors.shortDescription = 'Project objective is a required field.'
    isValid = false
  } else if (
    JSON.stringify(form.shortDescription).length >
    ProjectValidations.shortDescription.maxLength
  ) {
    errors.shortDescription = `Project objective should be shorter than ${ProjectValidations.shortDescription.maxLength} characters.`
    isValid = false
  }

  // if (!form.description) {
  //   errors.description = 'Project objective is a required field.'
  //   isValid = false
  // } else if (
  //   JSON.stringify(form.description).length >
  //   ProjectValidations.description.maxLength
  // ) {
  //   errors.description = `Project objective should be shorter than ${ProjectValidations.description.maxLength} characters.`
  //   isValid = false
  // }

  return { isValid, errors }
}

export const ProjectCreateForm = ({
  isEdit,
  form,
  setForm,
  formError,
  setFormError,
}: ProjectCreateFormProps) => {
  const { user } = useAuthContext()

  const [getProject] = useLazyQuery(QUERY_PROJECT_BY_NAME_OR_ID, {
    variables: {
      where: {
        name: form.name,
      },
    },
    onCompleted(data) {
      if (data && data.project && data.project.id) {
        setFormError({
          ...formError,
          name: 'This lightning address is already taken.',
        })
      }
    },
  })

  const handleProjectFetch = () => {
    if (
      !isEdit &&
      form?.name &&
      form.name.length >= MIN_LENGTH_TO_QUERY_PROJECT
    ) {
      getProject()
    }
  }

  const handleImageUpload = (url: string) => {
    setForm((current) => ({
      ...current,
      thumbnailImage: toMediumImageUrl(url),
    }))
  }

  const handleHeaderImageUpload = (url: string) => {
    setForm((current) => ({ ...current, image: url }))
  }

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, email: event.target.value }))
  }

  const deleteThumbnnailHandler = () => {
    setForm((current) => ({ ...current, thumbnailImage: '' }))
  }

  const deleteImageHandler = () => {
    setForm((current) => ({ ...current, image: '' }))
  }

  const handleChange = (event: any) => {
    if (event) {
      const { name, value } = event.target

      const newForm = { ...form, [name]: value || '' }

      if (name === 'title' && !isEdit) {
        const projectName: string = value.split(' ').join('').toLowerCase()
        const sanitizedName = projectName.replaceAll(validLightningAddress, '')

        newForm.name = sanitizedName
      }

      if (name === 'name') {
        const sanitizedName = `${value}`
          .toLocaleLowerCase()
          .replaceAll(validLightningAddress, '')
        newForm.name = sanitizedName
      }

      setForm(newForm)

      const valueLength = JSON.stringify(value).length

      if (
        name === 'title' &&
        valueLength > ProjectValidations.title.maxLength
      ) {
        setFormError({
          title: (
            <CharacterLimitError
              length={valueLength}
              limit={ProjectValidations.title.maxLength}
            />
          ),
        })
      } else if (
        name === 'description' &&
        valueLength > ProjectValidations.description.maxLength
      ) {
        setFormError({
          description: (
            <CharacterLimitError
              length={valueLength}
              limit={ProjectValidations.description.maxLength}
            />
          ),
        })
      } else if (
        name === 'shortDescription' &&
        valueLength > ProjectValidations.shortDescription.maxLength
      ) {
        setFormError({
          shortDescription: (
            <CharacterLimitError
              length={valueLength}
              limit={ProjectValidations.shortDescription.maxLength}
            />
          ),
        })
      } else {
        setFormError({})
      }
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
          value={form.title}
          error={formError.title}
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
            value={form.name || ''}
            isInvalid={Boolean(formError.name)}
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
          value={form.shortDescription || ''}
          onChange={handleChange}
          error={formError.shortDescription}
        />
        {!formError.shortDescription && (
          <HStack width="100%" justifyContent="space-between">
            <Text fontSize="12px" color="brand.neutral700" />
            <Text fontSize="12px" color="brand.neutral700">{`${
              JSON.stringify(form?.shortDescription).length
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
          src={form.thumbnailImage}
          onUploadComplete={handleImageUpload}
          onDeleteClick={deleteThumbnnailHandler}
          childrenOnLoading={<UploadBox loading />}
        >
          <UploadBox h={10} title={form.image ? 'Change image' : undefined} />
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
          src={form.image}
          onUploadComplete={handleHeaderImageUpload}
          onDeleteClick={deleteImageHandler}
          childrenOnLoading={<UploadBox loading />}
        >
          <UploadBox h={10} title={form.image ? 'Change header' : undefined} />
        </FileUpload>
      </FormInputContainer>

      <FormInputContainer
        title="Fundraising deadline"
        subtitle="Add a deadline to your project if you have one, or just keep it as ongoing."
      >
        <ProjectFundraisingDeadline form={form} setForm={setForm} />
      </FormInputContainer>

      <FormInputContainer
        title="Email"
        subtitle="Project notifications will be sent to your profile email, which you can edit in Profile Settings. Make sure to verify your email to keep your wallet secure."
      >
        <TextInputBox
          name="email"
          value={user.email || ('email' in form ? form.email : '')}
          onChange={handleEmail}
          error={formError.email}
          isDisabled={Boolean(user.email)}
        />
      </FormInputContainer>
    </VStack>
  )
}
