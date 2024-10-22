import { Box, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'
import { MarkdownField, MarkdownFieldSkeleton } from '@/shared/markdown/MarkdownField'

import { FieldContainer } from '../../../shared/components/form/FieldContainer'
import { dimensions, ProjectValidations } from '../../../shared/constants'

interface Props {
  autoFocus?: boolean
  form: UseFormReturn<{ description: string }>
  isLoading?: boolean
  toolBarBottom?: string
}

export const ProjectStoryForm = ({ autoFocus, form, isLoading, toolBarBottom }: Props) => {
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
        <FieldContainer
          width="100%"
          flexGrow={1}
          subtitle={t('Write a more in-depth description of the project. You can also add images and videos.')}
          paddingBottom={{ base: 28, lg: 10 }}
        >
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
                  {t(form.getFieldState('description').error?.message || '')}
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
