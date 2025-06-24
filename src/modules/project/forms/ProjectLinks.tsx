import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useFieldArray, UseFormReturn } from 'react-hook-form'

import { getIconForLink } from '../../../helpers/getIconForLinks'
import { FieldContainer } from '../../../shared/components/form/FieldContainer'
import { ProjectCreationVariables } from '../pages1/projectCreation/types.ts'
import { ProjectLinkInput } from './components/ProjectLinkInput'

interface ProjectLinksProps {
  form: UseFormReturn<ProjectCreationVariables>
}

export const ProjectLinks = ({ form }: ProjectLinksProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'links' as never,
  })

  /** Add a new empty link to the links array */
  const addNewLink = () => {
    append('')
  }

  /** Remove a link from the links array */
  const handleLinkClose = (index: number) => {
    remove(index)
  }

  /** Handle link input changes */
  const handleLinkChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue(`links.${index}`, event.target.value, { shouldDirty: true, shouldValidate: true })
  }

  return (
    <VStack w="full" spacing={3}>
      <FieldContainer
        title={t('Project links')}
        subtitle={t('Connect your sites so viewers can see more proof of your work')}
        info={t('Please provide secure links, starting with https://')}
        error={form.formState.errors.links?.[0]?.message}
      >
        <VStack w="full" spacing={2}>
          {fields.map((field, index) => {
            const linkValue = form.watch(`links.${index}`)
            const linkError = form.formState.errors.links?.[index]?.message

            return (
              <ProjectLinkInput
                key={field.id}
                leftIcon={getIconForLink(linkValue)}
                handleClose={() => handleLinkClose(index)}
                value={linkValue || ''}
                isError={Boolean(linkError)}
                onChange={(event) => handleLinkChange(index, event)}
              />
            )
          })}
        </VStack>
      </FieldContainer>
      <Button
        size="lg"
        variant="soft"
        colorScheme="neutral1"
        w="full"
        onClick={addNewLink}
        isDisabled={fields.length >= 7}
      >
        {t('Add Project Link')}
      </Button>
    </VStack>
  )
}
