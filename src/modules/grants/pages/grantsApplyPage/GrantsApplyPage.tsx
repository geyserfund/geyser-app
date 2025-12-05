/* eslint-disable complexity */
import { Button, HStack, Link, Stack, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { DateTime } from 'luxon'
import { ChangeEventHandler, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { CustomSelect } from '@/components/ui/CustomSelect.tsx'
import { TextArea } from '@/components/ui/TextArea.tsx'
import { TextInputBox } from '@/components/ui/TextInputBox.tsx'
import { UploadBox } from '@/components/ui/UploadBox.tsx'
import { useAuthContext } from '@/context/auth.tsx'
import { AdditionalUrlModal } from '@/modules/project/forms/components/AdditionalUrlModal.tsx'
import { MAX_PROJECT_HEADERS } from '@/modules/project/forms/ProjectForm.tsx'
import { useWalletForm } from '@/modules/project/pages/projectCreation/hooks/useWalletForm.tsx'
import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { GeyserTermsUrl } from '@/shared/constants/index.ts'
import { ProjectValidations } from '@/shared/constants/validations/project.ts'
import { FileUpload } from '@/shared/molecules/FileUpload.tsx'
import { LightningAddressInputField } from '@/shared/molecules/forms/WalletConnectionForm.tsx'
import { ImageCropAspectRatio } from '@/shared/molecules/ImageCropperModal.tsx'
import { MediaControlWithReorder } from '@/shared/molecules/MediaControlWithReorder.tsx'
import { countriesAtom } from '@/shared/state/countriesAtom.ts'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'
import {
  Country,
  CreateWalletInput,
  ProjectCategory,
  ProjectSubCategory,
  useCreateProjectMutation,
  useCreateWalletMutation,
  useGrantApplyMutation,
  useProjectPublishMutation,
  useUserEmailUpdateMutation,
  WalletResourceType,
} from '@/types/index.ts'
import { toMediumImageUrl, useNotification } from '@/utils/index.ts'
import { validLightningAddress } from '@/utils/validations/index.ts'

import { SuccessfullyAppliedToGrant } from './SuccessfullyAppliedToGrant.tsx'
import { getDescriptionFromValues, grantApplicationTemplateForGrantNo016 } from './template.ts'

type grantApplicationVariables = {
  title: string
  name: string
  images: string[]
  shortDescription: string
  email: string
  githubLink: string
  description: string
  team: string
  leanings: string
  anythingElse: string
  thumbnailImage: string
  country: {
    name: string
    code: string
  }
}

const template = grantApplicationTemplateForGrantNo016

/** Yup validation schema for grant application form */
const grantApplicationSchema = yup.object({
  title: yup
    .string()
    .required(t('Title is required'))
    .max(
      ProjectValidations.title.maxLength,
      t(`Title must be ${ProjectValidations.title.maxLength} characters or less`),
    ),
  name: yup
    .string()
    .required(t('Name is required'))
    .min(ProjectValidations.name.minLength, t(`Name must be at least ${ProjectValidations.name.minLength} characters`))
    .max(ProjectValidations.name.maxLength, t(`Name must be ${ProjectValidations.name.maxLength} characters or less`)),
  shortDescription: yup
    .string()
    .required(t('Project description is required'))
    .max(
      ProjectValidations.shortDescription.maxLength,
      t(`Description must be ${ProjectValidations.shortDescription.maxLength} characters or less`),
    ),
  thumbnailImage: yup.string().required(t('Project image is required')),
  country: yup
    .object()
    .required(t('Country is required'))
    .shape({
      name: yup.string().required(t('Country name is required')),
      code: yup.string().required(t('Country code is required')),
    }),

  githubLink: yup.string().url(t('Please enter a valid URL')).required(t('GitHub link is required')),
  description: yup.string().required(t('Description is required')),
  team: yup.string().required(t('Team is required')),
  leanings: yup.string().required(t('Learnings are required')),
  anythingElse: yup.string().required(t('Anything else is required')),

  email: yup.string().email(t('Please enter a valid email address')).required(t('Email is required')),
  images: yup
    .array()
    .of(yup.string().required().url(t('Please enter a valid image URL')))
    .required(t('Images are required')),
})

export const GrantsApplyPage = () => {
  const toast = useNotification()
  const { user, queryCurrentUser } = useAuthContext()

  const countriesData = useAtomValue(countriesAtom)

  const [projectAppliedToGrant, setProjectAppliedToGrant] = useState<boolean>(false)

  const [createProject, { loading: createProjectLoading, data: createProjectData }] = useCreateProjectMutation()

  const [updateUserEmail, { loading: updateUserEmailLoading }] = useUserEmailUpdateMutation()

  const [projectPublish, { loading: projectPublishLoading }] = useProjectPublishMutation()

  const [grantApply, { loading: grantApplyLoading }] = useGrantApplyMutation()

  const [createWallet, { loading: createWalletLoading }] = useCreateWalletMutation()

  const { lightningAddress, limits, createWalletInput } = useWalletForm({
    onSubmit() {},
  })

  const form = useForm<grantApplicationVariables>({
    resolver: yupResolver(grantApplicationSchema),
    mode: 'onBlur',
    defaultValues: {
      title: template.fields.title?.defaultValue || '',
      shortDescription: template.fields.shortDescription?.defaultValue || '',
      thumbnailImage: template.fields.thumbnailImage?.defaultValue || '',
      country: {
        name: '',
        code: '',
      },
      description: '',
      images: template.fields.images?.defaultValue || [],
      email: user?.email || '',
      name: '',
    },
  })
  const { formState, setValue, watch, control, clearErrors } = form

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    if (event) {
      const { name, value } = event.target

      if (name === 'title') {
        const projectName: string = value.split(' ').join('').toLowerCase()
        const sanitizedName = projectName.replaceAll(validLightningAddress, '')
        const DateTimeStamp = DateTime.now().toFormat('yyyyMMddHHmmss')

        setValue('name', `${sanitizedName}-${DateTimeStamp}`, {
          shouldDirty: true,
          shouldValidate: true,
        })
      }

      setValue(name as keyof grantApplicationVariables, value, {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
  }

  const handleImageUpload = (url: string) => {
    setValue('thumbnailImage', toMediumImageUrl(url), { shouldDirty: true, shouldValidate: true })
  }

  const handleDeleteThumbnail = () => {
    setValue('thumbnailImage', '', { shouldDirty: true, shouldValidate: true })
  }

  const onSubmit = async (data: grantApplicationVariables) => {
    console.log('checking walletInput', createWalletInput)
    if (!createWalletInput) {
      return
    }

    const description = getDescriptionFromValues({
      githubLink: data.githubLink,
      description: data.description,
      team: data.team,
      learnings: data.leanings,
      anythingElse: data.anythingElse,
    })

    if (data.email && !user?.email) {
      await updateUserEmail({
        variables: {
          input: { email: data.email },
        },
        onError() {
          toast.error({
            title: 'Error updating email',
            description: 'Please update and verify your email in your profile settings prior to applying to grants.',
          })
        },
      })
    }

    createProject({
      variables: {
        input: {
          title: data.title,
          description,
          images: data.images,
          name: data.name,
          shortDescription: data.shortDescription,
          thumbnailImage: data.thumbnailImage,
          countryCode: data.country.code,
          category: ProjectCategory.Tool,
          subCategory: ProjectSubCategory.OsSoftware,
        },
      },
      onCompleted(data) {
        console.log(data)
        createWallet({
          variables: {
            input: {
              ...createWalletInput,
              resourceInput: { resourceId: data.createProject.id, resourceType: WalletResourceType.Project },
            } as CreateWalletInput,
          },
          onError() {
            toast.error({
              title: 'Error creating wallet',
            })
          },
          onCompleted(createWalletData) {
            console.log(createWalletData)
            projectPublish({
              variables: { input: { projectId: data.createProject.id } },
              onCompleted() {
                grantApply({
                  variables: {
                    input: {
                      grantId: 20,
                      projectId: data.createProject.id,
                    },
                  },
                  onCompleted(grantApplyData) {
                    console.log(grantApplyData)
                    setProjectAppliedToGrant(true)
                    queryCurrentUser()
                  },
                  onError(error) {
                    toast.error({
                      title: 'Error applying to grant',
                      description: error.message,
                    })
                  },
                })
              },
              onError(error) {
                toast.error({
                  title: 'Error publishing project',
                  description: error.message,
                })
              },
            })
          },
        })
      },
      onError(error) {
        toast.error({
          title: t('Something went wrong.'),
          description: error.message,
        })
      },
    })
  }

  const onFail = (errors: any) => {
    console.log('checking errors', errors)
  }

  const handleDeleteImage = () => {
    setValue('images', [], { shouldDirty: true, shouldValidate: true })
  }

  const handleHeaderImageUpload = (url: string) => {
    const currentImages = watch('images')
    if (currentImages.includes(url)) return
    setValue('images', [...currentImages, url], { shouldDirty: true })
  }

  if (projectAppliedToGrant) {
    return <SuccessfullyAppliedToGrant projectName={createProjectData?.createProject?.name} />
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, onFail)}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '40px',
        height: '100%',
      }}
    >
      <CardLayout maxWidth="700px" width="100%" noMobileBorder spacing={12} maxHeight="100%" overflowY="scroll">
        <VStack alignItems="start" w="full">
          <H2 bold>{template.title}</H2>
          <Body>{template.description}</Body>
        </VStack>
        <VStack w="full" spacing={8}>
          <FieldContainer
            title={template.fields.title?.label || t('Title')}
            subtitle={template.fields.title?.description || t('A few words that make your project stand out')}
            required
          >
            <TextInputBox
              name="title"
              onChange={handleChange}
              value={watch('title')}
              placeholder={'Run With Bitcoin'}
              error={formState.errors.title?.message}
            />
          </FieldContainer>
          <FieldContainer
            title={template.fields.shortDescription?.label || t('Objective')}
            required
            subtitle={
              template.fields.shortDescription?.description ||
              t("Add 'one liner' a simple descriptions of what your project is about")
            }
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
            title={template.fields.thumbnailImage?.label || t('Image')}
            required
            subtitle={
              template.fields.thumbnailImage?.description ||
              t('Add the main project image that will be displayed in all thumbnails')
            }
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

          <FieldContainer title={t('Email')} subtitle={t('Email we can reach you at')} required>
            <TextInputBox
              name="email"
              onChange={handleChange}
              value={watch('email')}
              placeholder={'ram@example.com'}
              error={formState.errors.email?.message}
              isDisabled={Boolean(user?.email)}
            />
          </FieldContainer>

          <FieldContainer
            title={t('Country')}
            subtitle={t('Get found more easily by putting your project on the map. Select a country')}
            required
          >
            <CustomSelect<Country, false>
              width="100%"
              name="location"
              placeholder={t('Select country')}
              required
              options={countriesData}
              getOptionLabel={(option: Country) => option.name}
              getOptionValue={(option: Country) => option.code}
              onChange={(value) => {
                setValue('country', value || { name: '', code: '' }, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }}
              onFocus={() => clearErrors('country')}
            />
          </FieldContainer>

          <FieldContainer
            title={t('Link to Github PR')}
            subtitle={t('Direct link to the pull request with Breez SDK integration, and any other relevant links')}
            required
          >
            <TextInputBox
              name="githubLink"
              onChange={handleChange}
              value={watch('githubLink')}
              placeholder={'https://github.com/your-username/your-repo/pull/1'}
              error={formState.errors.githubLink?.message}
            />
          </FieldContainer>

          <FieldContainer
            title={t('Project Description')}
            subtitle={t(
              'Brief explanation of what the project is and what Bitcoin functionality you added with the Breez SDK. \n Why did you choose to integrate this?',
            )}
            required
          >
            <TextArea
              name="description"
              onChange={handleChange}
              value={watch('description')}
              placeholder={''}
              error={formState.errors.description?.message}
            />
          </FieldContainer>

          <FieldContainer
            title={t('Team')}
            subtitle={
              <>
                <Body>{t('List all the contributors to this integration with their GitHub and/or social links.')}</Body>
                <Body>{t(' \n Format: Name – GitHub / Twitter / Nostr')}</Body>
              </>
            }
            required
          >
            <TextArea
              name="team"
              onChange={handleChange}
              value={watch('team')}
              placeholder={'Nick Blakely - blakely77 / @blakely77 / nostr:npub1...'}
              error={formState.errors.team?.message}
            />
          </FieldContainer>

          <FieldContainer
            title={t('Learnings and Challenges')}
            subtitle={
              <>
                <Body>{t('What did you learn during the implementation?')}</Body>
                <Body>{t('What challenges did you face and how did you solve them?')}</Body>
              </>
            }
            required
          >
            <TextArea
              name="leanings"
              onChange={handleChange}
              value={watch('leanings')}
              placeholder={'I learned about the Breez SDK and how to integrate it into a project.'}
              error={formState.errors.leanings?.message}
            />
          </FieldContainer>
          <FieldContainer
            title={t('Anything Else Judges Should Know')}
            subtitle={t(
              'Space for context: community size, impact, future plans, or any other details that strengthen your submission.',
            )}
            required
          >
            <TextArea
              name="anythingElse"
              onChange={handleChange}
              value={watch('anythingElse')}
              placeholder={'I learned about the Breez SDK and how to integrate it into a project.'}
              error={formState.errors.anythingElse?.message}
            />
          </FieldContainer>

          <FieldContainer title={t('Lightning Address & Wallet')} subtitle={t('')} required>
            <LightningAddressInputField
              readOnly={false}
              lightningAddress={lightningAddress}
              limits={limits}
              showPromoText={false}
              removeSponsors={true}
              border="none"
              padding={0}
              secondaryText={t('')}
              width="full"
            />
          </FieldContainer>
        </VStack>
      </CardLayout>

      <VStack w="full" paddingTop={4} maxWidth="600px" paddingX={standardPadding}>
        <Body>
          {' '}
          {t('By submitting this project, you agree to our')}{' '}
          <Link isExternal href={GeyserTermsUrl}>
            {t('T&Cs')}
          </Link>
        </Body>
        <Button
          variant="solid"
          colorScheme="primary1"
          w="full"
          type="submit"
          isLoading={
            createProjectLoading ||
            projectPublishLoading ||
            grantApplyLoading ||
            createWalletLoading ||
            updateUserEmailLoading
          }
        >
          {t('Apply')}
        </Button>
      </VStack>
    </form>
  )
}
