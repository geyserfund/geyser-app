import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { UseFormReturn } from 'react-hook-form'

import { ProjectValidations } from '../../../constants'
import { MarkdownField } from '../../../forms/components/MarkdownField'
import { FormInputContainer } from './FormInputContainer'

interface Props {
  form: UseFormReturn<{ description: string }>
  isLoading?: boolean
}

export const ProjectStoryForm = ({ form, isLoading }: Props) => {
  return (
    <form style={{ width: '100%' }}>
      <VStack width="100%" alignItems="flex-start" spacing={6}>
        <FormInputContainer
          width="100%"
          subtitle="Write a more in-depth description of the project. You can also add images and videos."
        >
          <Box width="100%" pt={3}>
            <MarkdownField
              initialContentReady={!isLoading}
              initialContent={() => form.watch('description') || ''}
              control={form.control}
              name="description"
            />
            <HStack pt={1} width="100%">
              {form.formState.isValid ? null : (
                <Text pt={1} color="brand.error">
                  Project story is required (max: 4000 characters)
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
    </form>
  )
}
