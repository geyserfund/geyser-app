import { useLazyQuery } from '@apollo/client'
import {
  FormErrorIcon,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import { AiOutlineUpload } from 'react-icons/ai'
import { BiInfoCircle } from 'react-icons/bi'

import { CharacterLimitError } from '../../../../components/errors'
import { FileUpload } from '../../../../components/molecules'
import { Body2 } from '../../../../components/typography'
import { TextArea, TextInputBox } from '../../../../components/ui'
import { commonMarkdownUrl, ProjectValidations } from '../../../../constants'
import { QUERY_PROJECT_BY_NAME_OR_ID } from '../../../../graphql'
import { colors } from '../../../../styles'
import { FormError } from '../../../../types'
import { validLightningAddress } from '../../../../utils'

type ProjectCreate = {
  title: string
  name: string
  description: string
  image?: string
  headerImage?: string
}

interface ProjectCreateFormProps {
  isEdit?: boolean
  form: ProjectCreate
  setForm: (_: any) => void
  formError: FormError<ProjectCreate>
  setFormError: any
}

export const ProjectCreateFormValidation = (form: ProjectCreate) => {
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

  if (!form.description) {
    errors.description = 'Project objective is a required field.'
    isValid = false
  } else if (
    form.description.length > ProjectValidations.description.maxLength
  ) {
    errors.description = `Project objective should be shorter than ${ProjectValidations.description.maxLength} characters.`
    isValid = false
  }

  return { isValid, errors }
}

export const ProjectCreateForm = ({
  isEdit,
  form,
  setForm,
  formError,
  setFormError,
}: ProjectCreateFormProps) => {
  const rowStyles = { width: '100%', alignItems: 'flex-start', spacing: '5px' }

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

  const handleImageUpload = (url: string) => setForm({ ...form, image: url })
  const handleHeaderImageUpload = (url: string) =>
    setForm({ ...form, headerImage: url })

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

      if (
        name === 'title' &&
        value.length > ProjectValidations.title.maxLength
      ) {
        setFormError({
          title: (
            <CharacterLimitError
              length={value.length}
              limit={ProjectValidations.title.maxLength}
            />
          ),
        })
      } else if (
        name === 'description' &&
        value.length > ProjectValidations.description.maxLength
      ) {
        setFormError({
          description: (
            <CharacterLimitError
              length={value.length}
              limit={ProjectValidations.description.maxLength}
            />
          ),
        })
      } else {
        setFormError({})
      }
    }
  }

  return (
    <>
      <VStack {...rowStyles}>
        <Body2>Project Title</Body2>
        <TextInputBox
          name="title"
          onChange={handleChange}
          value={form.title}
          error={formError.title}
          onBlur={() => !isEdit && getProject()}
        />
      </VStack>
      <VStack {...rowStyles}>
        <Body2>Lightning Address Preview</Body2>
        <InputGroup size="md" borderRadius="4px">
          <Input
            name="name"
            onChange={handleChange}
            value={form.name}
            isInvalid={Boolean(formError.name)}
            focusBorderColor={colors.primary}
            disabled={isEdit}
            onBlur={() => !isEdit && getProject()}
          />
          <InputRightAddon>@geyser.fund</InputRightAddon>
        </InputGroup>
        {FormErrorIcon.name && (
          <Text color="brand.error" fontSize="12px">
            {FormErrorIcon.name}
          </Text>
        )}
      </VStack>
      <VStack width="100%" alignItems="flex-start" spacing="5px">
        <Body2>Project Image</Body2>
        <FileUpload onUploadComplete={handleImageUpload}>
          <HStack
            borderRadius="4px"
            backgroundColor="brand.bgGrey"
            width="100%"
            height="70px"
            justifyContent="center"
            alignItems="center"
            _hover={{ backgroundColor: 'brand.gray300' }}
          >
            <AiOutlineUpload />
            <Text>Select an image</Text>
          </HStack>
        </FileUpload>
        <Text fontSize="10px" color="brand.neutral700">
          For best fit, pick a square image. Image size limit: 10MB.
        </Text>
      </VStack>
      <VStack width="100%" alignItems="flex-start" spacing="5px">
        <Body2>Header Image</Body2>
        <FileUpload onUploadComplete={handleHeaderImageUpload}>
          <HStack
            borderRadius="4px"
            backgroundColor="brand.bgGrey"
            width="100%"
            height="70px"
            justifyContent="center"
            alignItems="center"
            _hover={{ backgroundColor: 'brand.gray300' }}
          >
            <AiOutlineUpload />
            <Text>Select an image</Text>
          </HStack>
        </FileUpload>
        <Text fontSize="10px" color="brand.neutral700">
          For best fit, pick an image around 800px x 200px. Image size limit:
          10MB.
        </Text>
      </VStack>
      <VStack {...rowStyles}>
        <Body2>Main Objective</Body2>
        <TextArea
          name="description"
          minHeight="120px"
          maxHeight="800px"
          height="fit-content"
          overflowY="auto"
          value={form.description}
          onChange={handleChange}
          error={formError.description}
        />
        {!formError.description && (
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
                _focus={{}}
              >
                <BiInfoCircle />
                <Text fontSize="12px" color="brand.neutral700">
                  MarkDown
                </Text>
              </HStack>
            </HStack>

            <Text
              fontSize="12px"
              color="brand.neutral700"
            >{`${form.description.length}/${ProjectValidations.description.maxLength}`}</Text>
          </HStack>
        )}
      </VStack>
    </>
  )
}
