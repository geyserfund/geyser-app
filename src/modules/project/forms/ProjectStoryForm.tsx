import { Box, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'

import { MarkdownField, MarkdownFieldSkeleton } from '../../../forms/markdown/MarkdownField'
import { FieldContainer } from '../../../shared/components/form/FieldContainer'
import { ProjectValidations } from '../../../shared/constants'
import { useMobileMode } from '../../../utils'

interface Props {
  autoFocus?: boolean
  form: UseFormReturn<{ description: string }>
  isLoading?: boolean
  toolbarTop?: string
}

export const ProjectStoryForm = ({ autoFocus, form, isLoading, toolbarTop }: Props) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()

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
      <VStack width="100%" alignItems="flex-start" spacing={6} flexGrow={1}>
        <FieldContainer
          width="100%"
          flexGrow={1}
          subtitle={t('Write a more in-depth description of the project. You can also add images and videos.')}
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
                stickyToolbar={isMobile ? toolbarTop : undefined}
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
