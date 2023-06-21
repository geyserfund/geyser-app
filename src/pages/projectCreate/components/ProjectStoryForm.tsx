import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { FormProvider, UseFormReturn } from 'react-hook-form'

import { ProjectValidations } from '../../../constants'
import { FieldContainer } from '../../../forms/components/FieldContainer'
import { MarkdownField } from '../../../forms/markdown/MarkdownField'
import { useMobileMode } from '../../../utils'

interface Props {
  form: UseFormReturn<{ description: string }>
  isLoading?: boolean
  toolbarTop?: string
}

export const ProjectStoryForm = ({ form, isLoading, toolbarTop }: Props) => {
  const isMobile = useMobileMode()
  return (
    <FormProvider {...form}>
      <VStack width="100%" alignItems="flex-start" spacing={6} flexGrow={1}>
        <FieldContainer
          width="100%"
          flexGrow={1}
          subtitle="Write a more in-depth description of the project. You can also add images and videos."
        >
          <Box
            width="100%"
            pt={3}
            flexGrow={1}
            display="flex"
            flexDirection="column"
          >
            <MarkdownField
              initialContentReady={!isLoading}
              initialContent={() => form.watch('description') || ''}
              name="description"
              flex
              stickyToolbar={isMobile ? toolbarTop : undefined}
            />
            <HStack pt={1} width="100%">
              {form.formState.isValid ? null : (
                <Text pt={1} color="secondary.red">
                  {form.getFieldState('description').error?.message}
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
