import { Box, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { MarkdownField, MarkdownFieldSkeleton } from '@/shared/markdown/MarkdownField'

import { FieldContainer, FieldContainerProps } from '../../../shared/components/form/FieldContainer'
import { ProjectValidations } from '../../../shared/constants'

interface Props {
  autoFocus?: boolean
  form: UseFormReturn<{ description: string } & any>
  isLoading?: boolean
  toolBarBottom?: string
  fieldContainerProps?: FieldContainerProps
}

export const ProjectStoryForm = ({ autoFocus, form, isLoading, toolBarBottom, fieldContainerProps }: Props) => {
  const { t } = useTranslation()

  const { isOpen: isEditorMode, onToggle: toggleEditorMode } = useDisclosure()
  const [isStoryLoading, setIsStoryLoading] = useState(false)
  const handleToggleEditorMode = () => {
    toggleEditorMode()
    setIsStoryLoading(true)
    setTimeout(() => {
      setIsStoryLoading(false)
    }, 1)
  }

  useEffect(() => {
    setIsStoryLoading(isLoading || false)
  }, [isLoading])

  return (
    <FormProvider {...form}>
      <VStack width="100%" alignItems="flex-start" spacing={6} flexGrow={1} paddingBottom={{ base: 28, lg: 'unset' }}>
        <FieldContainer width="100%" flexGrow={1} paddingBottom={{ base: 28, lg: 10 }} {...fieldContainerProps}>
          <Box width="100%" pt={3} flexGrow={1} display="flex" flexDirection="column">
            {isStoryLoading ? (
              <MarkdownFieldSkeleton />
            ) : (
              <MarkdownField
                autoFocus={autoFocus}
                initialContentReady={!isLoading}
                initialContent={() => form.watch('description') || ''}
                name="description"
                flex
                control={form.control}
                stickyToolbar={toolBarBottom}
                enableRawMode
                isFloatingToolbar
                toolbarMaxWidth={dimensions.project.posts.view.maxWidth}
                isEditorMode={isEditorMode}
                toggleEditorMode={handleToggleEditorMode}
              />
            )}
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
          </Box>
        </FieldContainer>
      </VStack>
    </FormProvider>
  )
}
