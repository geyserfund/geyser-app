/* eslint-disable complexity */
import { Button, HStack, Link, useDisclosure, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import { ChangeEventHandler, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { TextArea } from '@/components/ui/TextArea.tsx'
import { TextInputBox } from '@/components/ui/TextInputBox.tsx'
import { UploadBox } from '@/components/ui/UploadBox.tsx'
import { useAuthContext } from '@/context/auth.tsx'
import { ProjectCreationWalletConnectionForm } from '@/modules/project/forms/ProjectCreationWalletConnectionForm.tsx'
import { ProjectLinks } from '@/modules/project/forms/ProjectLinks.tsx'
import { ProjectRegion } from '@/modules/project/forms/ProjectRegion.tsx'
import { useWalletForm } from '@/modules/project/pages1/projectCreation/hooks/useWalletForm.tsx'
import { ProjectCreationVariables } from '@/modules/project/pages1/projectCreation/types.ts'
import { ProjectState } from '@/modules/project/state/projectAtom.ts'
import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { GeyserTermsUrl } from '@/shared/constants/index.ts'
import { ProjectValidations } from '@/shared/constants/validations/project.ts'
import { useProjectLinksValidation } from '@/shared/hooks/validations/useProjectLinksValidation.tsx'
import { MarkdownField } from '@/shared/markdown/MarkdownField.tsx'
import { FileUpload } from '@/shared/molecules/FileUpload.tsx'
import { ImageCropAspectRatio } from '@/shared/molecules/ImageCropperModal.tsx'
import {
  CreateWalletInput,
  useCreateProjectMutation,
  useCreateWalletMutation,
  useGrantApplyMutation,
  useProjectPublishMutation,
  WalletResourceType,
} from '@/types/index.ts'
import { toMediumImageUrl, useNotification } from '@/utils/index.ts'
import { validLightningAddress } from '@/utils/validations/index.ts'

import { SuccessfullyAppliedToGrant } from './SuccessfullyAppliedToGrant.tsx'
import { grantApplicationTemplateForGrantNo016 } from './template.ts'

type grantApplicationVariables = ProjectCreationVariables & {
  country: {
    name: string
    code: string
  }
  projectLinks: string[]
  description: string
  thumbnailImage: string
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
  projectLinks: yup
    .array()
    .of(yup.string().required().url(t('Please enter a valid URL')))
    .min(1, t('At least one project link is required'))
    .test('has-github', t('At least one link must be a GitHub URL'), function (links) {
      if (!links || links.length === 0) return false
      return links.some((link) => link && link.includes('github.com'))
    })
    .required(t('Project links are required')),
  description: yup
    .string()
    .required(t('Project submission form is required'))
    .min(
      ProjectValidations.description.minLength,
      t(`Description must be at least ${ProjectValidations.description.minLength} characters`),
    )
    .max(
      ProjectValidations.description.maxLength,
      t(`Description must be ${ProjectValidations.description.maxLength} characters or less`),
    ),
  email: yup.string().email(t('Please enter a valid email address')).required(t('Email is required')),
  images: yup
    .array()
    .of(yup.string().required().url(t('Please enter a valid image URL')))
    .required(t('Images are required')),
})

export const GrantsApplyPage = () => {
  const toast = useNotification()
  const { user, queryCurrentUser } = useAuthContext()

  const { isOpen: isEditorMode, onToggle: toggleEditorMode } = useDisclosure()

  const [projectAppliedToGrant, setProjectAppliedToGrant] = useState<boolean>(false)

  const [createProject, { loading: createProjectLoading }] = useCreateProjectMutation()

  const [projectPublish, { loading: projectPublishLoading }] = useProjectPublishMutation()

  const [grantApply, { loading: grantApplyLoading }] = useGrantApplyMutation()

  const [createWallet, { loading: createWalletLoading }] = useCreateWalletMutation()

  const { connectionOption, lightningAddress, node, nwc, setConnectionOption, fee, limits, createWalletInput } =
    useWalletForm({
      onSubmit() {},
    })

  const form = useForm<grantApplicationVariables>({
    resolver: yupResolver(grantApplicationSchema),
    mode: 'onBlur',
    defaultValues: {
      projectLinks: template.fields.projectLinks?.defaultValue || [],
      title: template.fields.title?.defaultValue || '',
      shortDescription: template.fields.shortDescription?.defaultValue || '',
      thumbnailImage: template.fields.thumbnailImage?.defaultValue || '',
      country: {
        name: '',
        code: '',
      },
      description: template.fields.description?.defaultValue || '',
      images: template.fields.images?.defaultValue || [],
      email: user?.email || '',
      name: '',
    },
  })
  const { formState, setValue, watch, control, clearErrors } = form

  const { setLinks, linkError } = useProjectLinksValidation({
    updateProject(project: Partial<ProjectState>) {
      console.log('checking project', project)
      setValue('projectLinks', project.links || [], {
        shouldDirty: true,
        shouldValidate: true,
      })
    },
  })

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

  const onSubmit = (data: grantApplicationVariables) => {
    console.log('checking walletInput', createWalletInput)
    if (!createWalletInput) {
      return
    }

    createProject({
      variables: {
        input: {
          title: data.title,
          description: data.description,
          images: data.images,
          name: data.name,
          shortDescription: data.shortDescription,
          email: data.email,
          //   projectLinks: data.projectLinks,
          thumbnailImage: data.thumbnailImage,
          countryCode: data.country.code,
          //   paidLaunch: data.paidLaunch,
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

  if (projectAppliedToGrant) {
    return <SuccessfullyAppliedToGrant />
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
      <CardLayout maxWidth="700px" spacing={12} maxHeight="100%" overflowY="scroll">
        <VStack alignItems="start" w="full">
          <H2 bold>{template.title}</H2>
          <Body>{template.description}</Body>
        </VStack>
        <VStack w="full" spacing={8}>
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

          <FieldContainer title={t('Email')} subtitle={t('Email we can reach you at')} required>
            <TextInputBox
              name="email"
              onChange={handleChange}
              value={watch('email')}
              placeholder={'ram@example.com'}
              error={formState.errors.email?.message}
            />
          </FieldContainer>

          <ProjectRegion
            location={{
              country: watch('country'),
            }}
            updateProject={(project) => {
              setValue('country', project.location?.country || { name: '', code: '' }, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }}
            error={formState.errors.country?.message}
            clearError={() => clearErrors('country')}
          />
          <ProjectLinks
            title={t('Project links') + '*'}
            links={watch('projectLinks')}
            setLinks={setLinks}
            linkError={linkError}
            formError={formState.errors.projectLinks?.message}
            clearError={() => clearErrors('projectLinks')}
            subtitle={template.fields.projectLinks?.description}
          />

          <FieldContainer
            title={template.fields.description?.label}
            subtitle={template.fields.description?.description}
            error={formState.errors.description?.message}
          >
            <VStack
              flexDirection={'column-reverse'}
              flex={1}
              width="100%"
              border="1px solid"
              borderColor="neutral1.6"
              borderRadius="8px"
              overflow="hidden"
              paddingTop={3}
              backgroundColor="utils.pbg"
            >
              <MarkdownField
                initialContentReady={true}
                initialContent={() => watch('description') || ''}
                content={watch('description') || ''}
                name="description"
                placeholder={t('Describe your product in detail - features, specifications, and benefits.')}
                flex
                noFloatingToolbar
                control={control}
                isEditorMode={isEditorMode}
                toggleEditorMode={toggleEditorMode}
                toolbarWrapperProps={{
                  borderBottom: 'none',
                  borderRight: 'none',
                  borderLeft: 'none',
                  borderRadius: 0,
                  marginBottom: 0,
                  overflowX: 'auto',
                }}
                toolbarMaxWidth={'100%'}
                enableRawMode
                editorWrapperProps={{
                  paddingX: '16px',
                  minHeight: '200px',
                }}
                markdownRawEditorProps={{
                  minHeight: '200px',
                  padding: '0px 16px',
                }}
              />
            </VStack>
          </FieldContainer>
        </VStack>

        <VStack w="full" alignItems="flex-start">
          <H3 bold>{t('Project Wallet')}</H3>

          <ProjectCreationWalletConnectionForm
            {...{ connectionOption, lightningAddress, node, setConnectionOption, fee, limits, nwc }}
            removeSponsors
          />
        </VStack>
      </CardLayout>

      <VStack w="full" paddingTop={8} maxWidth="600px">
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
          isLoading={createProjectLoading || projectPublishLoading || grantApplyLoading || createWalletLoading}
        >
          {t('Apply')}
        </Button>
      </VStack>
    </form>
  )
}
