import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Control, FieldErrors } from 'react-hook-form'

import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { MdxMarkdownEditor } from '@/shared/markdown/MdxMarkdownEditor.tsx'

import { RewardFormValues } from '../../../pages/projectView/views/rewards/hooks/useProjectRewardForm.ts'

type DescriptionFormComponentProps = {
  formLoaded: boolean
  control: Control<RewardFormValues>
  errors: FieldErrors<RewardFormValues>
}

export const DescriptionFormComponent = ({ formLoaded, control, errors }: DescriptionFormComponentProps) => {
  return (
    <FieldContainer title={t('Description')} error={errors.description?.message}>
      <VStack flex={1} width="100%" backgroundColor="utils.pbg">
        {!formLoaded ? null : (
          <MdxMarkdownEditor
            mode="edit"
            name="description"
            control={control}
            minHeight="200px"
            placeholder={t('Describe your product in detail - features, specifications, and benefits.')}
          />
        )}
      </VStack>
    </FieldContainer>
  )
}
