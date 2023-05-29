import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { FormProvider, UseFormReturn } from 'react-hook-form'

import { ProjectValidations } from '../../../constants'
import { MarkdownField } from '../../../forms/components/MarkdownField'
import { useMobileMode } from '../../../utils'
import { FormInputContainer } from './FormInputContainer'

interface Props {
  form: UseFormReturn<{ description: string }>
  isLoading?: boolean
}

export const ProjectStoryForm = ({ form, isLoading }: Props) => {
  const isMobile = useMobileMode()
  return (
    <FormProvider {...form}>
      <VStack width="100%" alignItems="flex-start" spacing={6} flexGrow={1}>
        <FormInputContainer
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
              stickyToolbar={isMobile}
            />
            <HStack pt={1} width="100%">
              {form.formState.isValid ? null : (
                <Text pt={1} color="brand.error">
                  {form.getFieldState('description').error?.message}
                </Text>
              )}
              <Text
                fontSize="12px"
                color="brand.neutral700"
                flexGrow={1}
                textAlign="right"
              >
                <span>{form.watch('description').length}</span>/
                <span>{ProjectValidations.description.maxLength}</span>
              </Text>
            </HStack>
          </Box>
        </FormInputContainer>
      </VStack>
    </FormProvider>
  )
}
