import { Box, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ProjectValidations } from '../../../constants'
import { FieldContainer } from '../../../forms/components/FieldContainer'
import { MarkdownField } from '../../../forms/markdown/MarkdownField'
import { useMobileMode } from '../../../utils'

interface Props {
  autoFocus?: boolean
  form: UseFormReturn<{ description: string }>
  isLoading?: boolean
  toolbarTop?: string
}

export const ProjectStoryForm = ({
  autoFocus,
  form,
  isLoading,
  toolbarTop,
}: Props) => {
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
          subtitle={t(
            'Write a more in-depth description of the project. You can also add images and videos.',
          )}
        >
          <Box
            width="100%"
            pt={3}
            flexGrow={1}
            display="flex"
            flexDirection="column"
          >
            {!isStoryLoading && (
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
                <Text pt={1} color="secondary.red">
                  {t(form.getFieldState('description').error?.message || '')}
                </Text>
              )}
              <Text
                fontSize="12px"
                color="neutral.700"
                flexGrow={1}
                textAlign="right"
              >
                <span>{form.watch('description').length}</span>/
                <span>{ProjectValidations.description.maxLength}</span>
              </Text>
            </HStack>
          </Box>
        </FieldContainer>
      </VStack>
    </FormProvider>
  )
}
