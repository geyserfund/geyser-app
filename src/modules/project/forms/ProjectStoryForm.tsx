import { HStack, VStack } from '@chakra-ui/react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { MarkdownFieldSkeleton } from '@/shared/markdown/MarkdownField'
import { MdxMarkdownEditor } from '@/shared/markdown/MdxMarkdownEditor.tsx'

import { FieldContainer, FieldContainerProps } from '../../../shared/components/form/FieldContainer'
import { ProjectValidations } from '../../../shared/constants'

interface Props {
  autoFocus?: boolean
  form: UseFormReturn<{ description: string } & any>
  isLoading?: boolean
  fieldContainerProps?: FieldContainerProps
}

export const ProjectStoryForm = ({ autoFocus, form, isLoading, fieldContainerProps }: Props) => {
  const { t } = useTranslation()

  return (
    <FormProvider {...form}>
      <VStack width="100%" alignItems="flex-start" spacing={6} flexGrow={1} paddingBottom={{ base: 28, lg: 'unset' }}>
        <FieldContainer width="100%" flexGrow={1} paddingBottom={{ base: 28, lg: 10 }} {...fieldContainerProps}>
          <VStack width="100%" pt={3} flexGrow={1} alignItems="stretch" spacing={1}>
            <CardLayout width="100%" flexGrow={1} backgroundColor="utils.surface" overflowY="auto">
              {isLoading ? (
                <MarkdownFieldSkeleton />
              ) : (
                <MdxMarkdownEditor
                  mode="edit"
                  autoFocus={autoFocus}
                  minHeight="120px"
                  name="description"
                  control={form.control}
                />
              )}
            </CardLayout>
            <HStack pt={1} width="100%">
              {form.formState.isValid ? null : (
                <Body size="xs" pt={1} color="error.9">
                  {t(form.formState.errors.description?.message?.toString() || '')}
                </Body>
              )}
              <Body size="xs" light flexGrow={1} textAlign="right">
                <span>{form.watch('description').length}</span>/<span>{ProjectValidations.description.maxLength}</span>
              </Body>
            </HStack>
          </VStack>
        </FieldContainer>
      </VStack>
    </FormProvider>
  )
}
