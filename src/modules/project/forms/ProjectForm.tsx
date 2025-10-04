import { Box, FormErrorIcon, HStack, Stack, Tooltip, VStack } from '@chakra-ui/react'
import { ChangeEventHandler, useCallback, useEffect } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PiInfo } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'
import { FileUpload } from '@/shared/molecules'

import { TextArea, TextInputBox, UploadBox } from '../../../components/ui'
import { useAuthContext } from '../../../context'
import { FieldContainer } from '../../../shared/components/form/FieldContainer'
import { ProjectValidations } from '../../../shared/constants'
import { useDebounce } from '../../../shared/hooks'
import { ImageCropAspectRatio } from '../../../shared/molecules/ImageCropperModal'
import { MediaControlWithReorder } from '../../../shared/molecules/MediaControlWithReorder'
import { useProjectByNameForNameCheckLazyQuery } from '../../../types'
import { toMediumImageUrl, validLightningAddress } from '../../../utils'
import { ProjectCreationVariables } from '../pages1/projectCreation/types'
import { AdditionalUrlModal } from './components/AdditionalUrlModal'

const MIN_LENGTH_TO_QUERY_PROJECT = 3

export const MAX_PROJECT_HEADERS = 7

type ProjectFormProps = {
  form: UseFormReturn<ProjectCreationVariables>
  isEdit: boolean
}

export const ProjectForm = ({ form, isEdit }: ProjectFormProps) => {
  const { t } = useTranslation()
  const { user } = useAuthContext()

  const { formState, setValue, watch, setError, control, clearErrors } = form

  const [getProject] = useProjectByNameForNameCheckLazyQuery({
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

  const handleProjectFetch = useCallback(
    (projectName: string) => {
      if (projectName && projectName.length >= MIN_LENGTH_TO_QUERY_PROJECT) {
        getProject({
          variables: {
            where: {
              name: projectName,
            },
          },
        })
      }
    },
    [getProject],
  )

  const projectName = watch('name')
  const debouncedProjectName = useDebounce(projectName, 500)

  useEffect(() => {
    if (debouncedProjectName) {
      handleProjectFetch(debouncedProjectName)
    }
  }, [debouncedProjectName, handleProjectFetch])

  const handleImageUpload = (url: string) => {
    setValue('thumbnailImage', toMediumImageUrl(url), { shouldDirty: true, shouldValidate: true })
  }

  const handleHeaderImageUpload = (url: string) => {
    const currentImages = watch('images')
    if (currentImages.includes(url)) return
    setValue('images', [...currentImages, url], { shouldDirty: true })
  }

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('email', event.target.value, { shouldDirty: true, shouldValidate: true })
  }

  const handleDeleteThumbnail = () => {
    setValue('thumbnailImage', '', { shouldDirty: true, shouldValidate: true })
  }

  const handleDeleteImage = () => {
    setValue('images', [], { shouldDirty: true, shouldValidate: true })
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
      <FieldContainer title={t('Title')} subtitle={t('A few words that make your project stand out')} required>
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
        required
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
        required
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
        required
        subtitle={t('Add the main project image that will be displayed in all thumbnails')}
        error={formState.errors.thumbnailImage?.message}
      >
        <FileUpload
          showcase
          showcaseW="64px"
          showcaseH="64px"
          containerProps={{ w: '100%' }}
          caption={t('For best fit, pick a square image. Image size limit: 10MB.')}
          src={watch('thumbnailImage')}
          onUploadComplete={handleImageUpload}
          onDeleteClick={handleDeleteThumbnail}
          childrenOnLoading={<UploadBox loading h={{ base: '40px', lg: '64px' }} />}
          imageCrop={ImageCropAspectRatio.Square}
        >
          <UploadBox
            h={{ base: '40px', lg: '64px' }}
            title={watch('thumbnailImage') ? t('Change image') : t('Upload image')}
            titleProps={{ fontSize: 'lg', light: true }}
          />
        </FileUpload>
      </FieldContainer>

      <FieldContainer
        title={t('Header')}
        required
        subtitle={t('Add one or multiple images or video links to help bring your project to life')}
      >
        <MediaControlWithReorder
          links={watch('images')}
          altText={'Project header image'}
          updateLinks={(links) => setValue('images', links, { shouldDirty: true })}
          aspectRatio={ImageCropAspectRatio.Header}
        />
        <Controller
          name="images"
          control={control}
          render={({ field }) => {
            const maxReached = field.value.length >= MAX_PROJECT_HEADERS

            return (
              <Stack alignItems="start" direction={{ base: 'column', md: 'row' }} w={'full'} pt={4}>
                <AdditionalUrlModal
                  w="full"
                  onAdd={(url) => field.onChange([...field.value, url])}
                  isDisabled={maxReached}
                />
                <FileUpload
                  containerProps={{ flex: 1, w: { base: 'full', md: 'unset' } }}
                  caption={t('For best fit, select horizontal 16:9 image. Image size limit: 10MB.')}
                  onUploadComplete={handleHeaderImageUpload}
                  onDeleteClick={handleDeleteImage}
                  childrenOnLoading={<UploadBox loading h={{ base: '40px', lg: '64px' }} borderRadius="12px" />}
                  imageCrop={ImageCropAspectRatio.Header}
                  isDisabled={maxReached}
                >
                  <UploadBox
                    h={{ base: '40px', lg: '64px' }}
                    borderRadius="12px"
                    flex={1}
                    title={
                      maxReached
                        ? t('Max items reached')
                        : field.value.length > 0
                        ? t('Upload additional image')
                        : t('Upload image')
                    }
                    opacity={maxReached ? 0.5 : 1}
                    titleProps={{ fontSize: 'lg', light: true }}
                  />
                </FileUpload>
              </Stack>
            )
          }}
        />
      </FieldContainer>

      {!isEdit && (
        <FieldContainer
          title={t('Email')}
          required
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
