import { Box, HStack, Link, Text, VStack } from '@chakra-ui/react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { BiInfoCircle } from 'react-icons/bi'

import { commonMarkdownUrl, ProjectValidations } from '../../../constants'
import { MarkdownField } from '../../../forms/components/MarkdownField'
import { FormInputContainer } from './FormInputContainer'

interface Props {
  form: UseFormReturn<{ description: string }>
  isLoading?: boolean
}

export const ProjectStoryForm = ({ form, isLoading }: Props) => {
  const formError = form.formState.errors.description?.message
  return (
    <FormProvider {...form}>
      <form>
        <VStack width="100%" alignItems="flex-start" spacing={6}>
          <FormInputContainer subtitle="Write a more in-depth description of the project. You can also add images and videos.">
            <Box width="100%" pt={3}>
              <MarkdownField
                initialContentReady={!isLoading}
                initialContent={() => form.watch('description') || ''}
                name="description"
              />

              {typeof formError === 'string' ? (
                <Text pt={1} color="secondary.red">
                  {formError}
                </Text>
              ) : (
                <HStack pt={1} width="100%" justifyContent="space-between">
                  <HStack>
                    <Text fontSize="12px" color="neutral.700">
                      For **Bold** and *Italic*, see more{' '}
                    </Text>
                    <HStack
                      as={Link}
                      href={commonMarkdownUrl}
                      isExternal
                      spacing="0px"
                    >
                      <BiInfoCircle />
                      <Text fontSize="12px" color="neutral.700">
                        MarkDown
                      </Text>
                    </HStack>
                  </HStack>
                  <Text fontSize="12px" color="neutral.700">
                    <span>{form.watch('description').length}</span>/
                    <span>{ProjectValidations.description.maxLength}</span>
                  </Text>
                </HStack>
              )}
            </Box>
          </FormInputContainer>
        </VStack>
      </form>
    </FormProvider>
  )
}
