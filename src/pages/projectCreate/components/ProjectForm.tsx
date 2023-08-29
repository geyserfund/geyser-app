import {
  FormErrorIcon,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ChangeEventHandler } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { FileUpload } from '../../../components/molecules'
import { TextArea, TextInputBox, UploadBox } from '../../../components/ui'
import { ProjectValidations } from '../../../constants'
import { useAuthContext } from '../../../context'
import { FieldContainer } from '../../../forms/components/FieldContainer'
import { validateImageUrl } from '../../../forms/validations/image'
import { useProjectByNameOrIdLazyQuery } from '../../../types'
import { toMediumImageUrl, validLightningAddress } from '../../../utils'
import { ProjectCreationVariables } from '../types'
import { ProjectFundraisingDeadline } from './ProjectFundraisingDeadline'

const MIN_LENGTH_TO_QUERY_PROJECT = 3

type ProjectFormProps = {
  form: UseFormReturn<ProjectCreationVariables>
  isEdit: boolean
}

export const ProjectForm = ({ form, isEdit }: ProjectFormProps) => {
  const { t } = useTranslation()
  const { user } = useAuthContext()

  const { formState, setValue, watch, setError, control } = form

  const [getProject] = useProjectByNameOrIdLazyQuery({
    variables: {
      where: {
        name: watch('name'),
      },
    },
    onCompleted(data) {
      if (data && data.projectGet && data.projectGet.id) {
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
    <VStack spacing={6} w="100%">
      <FieldContainer
        title={t('Title')}
        subtitle={t('A few words that make your project stand out')}
      >
        <TextInputBox
          name="title"
          onChange={handleChange}
          value={watch('title')}
          error={formState.errors.title?.message}
          onBlur={handleProjectFetch}
        />
      </FieldContainer>

      <FieldContainer
        title={t('Lightning Address Preview')}
        subtitle={t(
          'This is the lightning address for your project. Funds sent to this lightning address will show in your project activity',
        )}
        error={FormErrorIcon.name}
      >
        <InputGroup size="md" borderRadius="8px">
          <Input
            name="name"
            onChange={handleChange}
            value={watch('name')}
            isInvalid={Boolean(formState.errors.name)}
            focusBorderColor={'primary.400'}
            disabled={isEdit}
            onBlur={handleProjectFetch}
          />
          <InputRightAddon>@geyser.fund</InputRightAddon>
        </InputGroup>
      </FieldContainer>

      <FieldContainer
        title={t('Objective')}
        subtitle={t(
          "Add 'one liner' a simple descriptions of what your project is about",
        )}
      >
        <TextArea
          name="shortDescription"
          height="fit-content"
          overflowY="auto"
          value={watch('shortDescription')}
          onChange={({ target, ...event }) => {
            handleChange({
              target: {
                ...target,
                name: target.name,
                value: target.value.replace(/\n/gm, ''),
              },
              ...event,
            })
          }}
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
      </FieldContainer>

      <FieldContainer
        title={t('Image')}
        subtitle={t(
          'Add the main project image that will be displayed in all thumbnails',
        )}
      >
        <FileUpload
          showcase
          containerProps={{ w: '100%' }}
          caption={t(
            'For best fit, pick a square image. Image size limit: 10MB.',
          )}
          src={watch('thumbnailImage')}
          onUploadComplete={handleImageUpload}
          onDeleteClick={handleDeleteThumbnail}
          childrenOnLoading={<UploadBox loading h={10} />}
        >
          <UploadBox
            h={10}
            title={watch('thumbnailImage') ? t('Change image') : undefined}
          />
        </FileUpload>
      </FieldContainer>

      <FieldContainer
        title={t('Header')}
        subtitle={t(
          'Add a header with a video link or by uploading an image to help bring your project to life',
        )}
      >
        <Controller
          name="image"
          control={control}
          render={({ field }) => {
            const isImage = validateImageUrl(field.value)
            return (
              <Stack
                alignItems="start"
                direction={{ base: 'column', lg: 'row' }}
                w={'full'}
              >
                <Input
                  width={{ base: 'full', lg: 'initial' }}
                  type="text"
                  placeholder="www.youtube.com/2ms0j2n93c"
                  {...field}
                />
                <FileUpload
                  containerProps={{ flexGrow: 1, w: 'full' }}
                  showcase={isImage}
                  showcaseW="80px"
                  caption={t(
                    'For best fit, select horizontal 1:3 image. Image size limit: 10MB.',
                  )}
                  src={isImage ? field.value : undefined}
                  onUploadComplete={handleHeaderImageUpload}
                  onDeleteClick={handleDeleteImage}
                  childrenOnLoading={<UploadBox loading h={10} />}
                >
                  <UploadBox
                    h={10}
                    flex={1}
                    title={field.value ? t('Change header') : undefined}
                  />
                </FileUpload>
              </Stack>
            )
          }}
        />
      </FieldContainer>

      <FieldContainer
        title={t('Fundraising deadline')}
        subtitle={t(
          'Add a deadline to your project if you have one, or just keep it as ongoing.',
        )}
      >
        <ProjectFundraisingDeadline setValue={setValue} watch={watch} />
      </FieldContainer>

      <FieldContainer
        title={t('Email')}
        subtitle={t(
          'Project notifications will be sent to your profile email, which you can edit in Profile Settings. Make sure to verify your email to keep your wallet secure.',
        )}
      >
        <TextInputBox
          name="email"
          value={watch('email')}
          onChange={handleEmail}
          error={formState.errors.email?.message}
          isDisabled={Boolean(user.email)}
        />
      </FieldContainer>
    </VStack>
  )
}
