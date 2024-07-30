import { Box, FormErrorIcon, HStack, Input, Stack, Tooltip, VStack } from '@chakra-ui/react'
import { ChangeEventHandler, useCallback, useEffect } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PiInfo } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'
import { validateImageUrl } from '@/shared/markdown/validations/image'

import { FileUpload } from '../../../components/molecules'
import { TextArea, TextInputBox, UploadBox } from '../../../components/ui'
import { useAuthContext } from '../../../context'
import { FieldContainer } from '../../../shared/components/form/FieldContainer'
import { ProjectValidations } from '../../../shared/constants'
import { useDebounce } from '../../../shared/hooks'
import { ImageCropAspectRatio } from '../../../shared/molecules/ImageCropperModal'
import { useProjectByNameOrIdLazyQuery } from '../../../types'
import { toMediumImageUrl, validLightningAddress } from '../../../utils'
import { ProjectCreationVariables } from '../pages1/projectCreation/types'

const MIN_LENGTH_TO_QUERY_PROJECT = 3

type ProjectFormProps = {
  form: UseFormReturn<ProjectCreationVariables>
  isEdit: boolean
}

export const ProjectForm = ({ form, isEdit }: ProjectFormProps) => {
  const { t } = useTranslation()
  const { user } = useAuthContext()

  const { formState, setValue, watch, setError, control, clearErrors } = form

  const [getProject] = useProjectByNameOrIdLazyQuery({
    onCompleted(data) {
      if (data && data.projectGet && data.projectGet.id && data.projectGet.name !== formState.defaultValues?.name) {
        setError('name', {
          message: 'This lightning address is already taken.',
        })
      } else {
        clearErrors('name')
      }
    },
  })

  const handleProjectFetch = useCallback(() => {
    const projectName = watch('name')
    if (projectName && projectName.length >= MIN_LENGTH_TO_QUERY_PROJECT) {
      getProject({
        variables: {
          where: {
            name: projectName,
          },
        },
      })
    }
  }, [getProject, watch])

  const projectName = watch('name')
  const debouncedProjectName = useDebounce(projectName, 300)

  useEffect(() => {
    if (debouncedProjectName) {
      handleProjectFetch()
    }
  }, [debouncedProjectName, handleProjectFetch])

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

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    if (event) {
      const { name, value } = event.target

      if (name === 'title' && !isEdit) {
        const projectName: string = value.split(' ').join('').toLowerCase()
        const sanitizedName = projectName.replaceAll(validLightningAddress, '')

        setValue('name', sanitizedName, {
          shouldDirty: true,
          shouldValidate: true,
        })
      }

      if (name === 'name') {
        const sanitizedName = `${value}`.toLocaleLowerCase().replaceAll(validLightningAddress, '')

        return setValue(name, sanitizedName, {
          shouldDirty: true,
          shouldValidate: true,
        })
      }

      setValue(name as keyof ProjectCreationVariables, value, {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
  }

  return (
    <VStack spacing={6} w="100%">
      <FieldContainer title={t('Title')} subtitle={t('A few words that make your project stand out')}>
        <TextInputBox
          name="title"
          onChange={handleChange}
          value={watch('title')}
          placeholder={'Run With Bitcoin'}
          error={formState.errors.title?.message}
        />
      </FieldContainer>

      <FieldContainer
        title={t('Project Identifier')}
        subtitle={
          <>
            {t(
              'Set your unique project identifier to create your personalized URL and get a corresponding Lightning address for your Geyser project.',
            )}{' '}
            {isEdit &&
              t('Warning! By changing this identifier your old project links will not send you to your project')}
          </>
        }
        error={FormErrorIcon.name}
      >
        <VStack p="0px" w="full" alignItems="start" spacing="0">
          <TextInputBox
            name="name"
            onChange={handleChange}
            value={watch('name')}
            focusBorderColor={'primary.400'}
            placeholder="runwithbitcoin"
            error={formState.errors.name?.message}
            borderBottomRightRadius={0}
            borderBottomLeftRadius={0}
          />
          <VStack
            w="full"
            backgroundColor="neutral.100"
            border="2px solid"
            borderColor="neutral.200"
            borderTop="none"
            borderRadius="0 0 12px 12px"
            alignItems="start"
            p="10px"
            spacing={2}
          >
            <Body color="neutral1.9">
              {`${t('Project URL')}: `}
              <Box as="span" color="neutral1.11">
                geyser.fund/project/
              </Box>
              <Box as="span" color="primary1.11">
                {watch('name')}
              </Box>
            </Body>
            <HStack w="full" justifyContent="space-between">
              <Body color="neutral1.9">
                {`${t('Lightning Address')}: `}
                <Box as="span" color="primary1.11">
                  {watch('name')}
                </Box>
                <Box as="span" color="neutral1.11">
                  {'@geyser.fund'}
                </Box>
              </Body>
              <Tooltip
                label={t(
                  `Lightning address is a simple way for others to send you funds. When someone sends money to this address, it's instantly routed to your private wallet. This ensures you have full custody and immediate access to your funds.`,
                )}
              >
                <span>
                  <PiInfo color="neutral1.11" fontSize="20px" />
                </span>
              </Tooltip>
            </HStack>
          </VStack>
        </VStack>
      </FieldContainer>

      <FieldContainer
        title={t('Objective')}
        subtitle={t("Add 'one liner' a simple descriptions of what your project is about")}
      >
        <TextArea
          name="shortDescription"
          height="fit-content"
          overflowY="auto"
          placeholder={t('Bitcoin Meetups and Travel Vlogs of Bitcoin Adoption in the Global South!')}
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
            <Body size="xs" muted />
            <Body size="xs" muted>{`${watch('shortDescription') ? watch('shortDescription').length : 0}/${
              ProjectValidations.shortDescription.maxLength
            }`}</Body>
          </HStack>
        )}
      </FieldContainer>

      <FieldContainer
        title={t('Image')}
        subtitle={t('Add the main project image that will be displayed in all thumbnails')}
      >
        <FileUpload
          showcase
          containerProps={{ w: '100%' }}
          caption={t('For best fit, pick a square image. Image size limit: 10MB.')}
          src={watch('thumbnailImage')}
          onUploadComplete={handleImageUpload}
          onDeleteClick={handleDeleteThumbnail}
          childrenOnLoading={<UploadBox loading h={10} />}
          imageCrop={ImageCropAspectRatio.Square}
        >
          <UploadBox h={10} title={watch('thumbnailImage') ? t('Change image') : undefined} />
        </FileUpload>
      </FieldContainer>

      <FieldContainer
        title={t('Header')}
        subtitle={t('Add a header with a video link or by uploading an image to help bring your project to life')}
      >
        <Controller
          name="image"
          control={control}
          render={({ field }) => {
            const isImage = validateImageUrl(field.value)
            return (
              <Stack alignItems="start" direction={{ base: 'column', lg: 'row' }} w={'full'}>
                <Input
                  width={{ base: 'full', lg: 'initial' }}
                  minWidth={{ lg: '250px' }}
                  type="text"
                  placeholder="www.youtube.com/2ms0j2n93c"
                  {...field}
                />
                <FileUpload
                  containerProps={{ flexGrow: 1, w: 'full' }}
                  showcase={isImage}
                  showcaseW="80px"
                  caption={t('For best fit, select horizontal 1:3 image. Image size limit: 10MB.')}
                  src={isImage ? field.value : undefined}
                  onUploadComplete={handleHeaderImageUpload}
                  onDeleteClick={handleDeleteImage}
                  childrenOnLoading={<UploadBox loading h={10} />}
                  imageCrop={ImageCropAspectRatio.Rectangle}
                >
                  <UploadBox h={10} flex={1} title={field.value ? t('Change header') : undefined} />
                </FileUpload>
              </Stack>
            )
          }}
        />
      </FieldContainer>

      {!isEdit && (
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
            placeholder="creator@gmail.com"
            error={formState.errors.email?.message}
            onBlur={() => form.trigger('email')}
            isDisabled={Boolean(user.email)}
          />
        </FieldContainer>
      )}
    </VStack>
  )
}
