import { useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Control, FieldErrors, UseFormWatch } from 'react-hook-form'

import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { MarkdownField } from '@/shared/markdown/MarkdownField.tsx'

import { RewardFormValues } from '../../../hooks/useProjectRewardForm.ts'

type DescriptionFormComponentProps = {
  formLoaded: boolean
  control: Control<RewardFormValues>
  errors: FieldErrors<RewardFormValues>
  watch: UseFormWatch<RewardFormValues>
}

export const DescriptionFormComponent = ({ formLoaded, control, errors, watch }: DescriptionFormComponentProps) => {
  const { isOpen: isEditorMode, onToggle: toggleEditorMode } = useDisclosure()

  const rewardDescription = watch('description')

  return (
    <FieldContainer title={t('Description')} error={errors.description?.message}>
      <VStack
        flexDirection={'column-reverse'}
        flex={1}
        width="100%"
        border="1px solid"
        borderColor="neutral1.6"
        borderRadius="8px"
        overflow="hidden"
        paddingTop={3}
        backgroundColor="utils.pbg"
      >
        {!formLoaded ? null : (
          <MarkdownField
            initialContentReady={formLoaded}
            initialContent={() => rewardDescription || ''}
            content={rewardDescription || ''}
            name="description"
            placeholder={t('Describe your product in detail - features, specifications, and benefits.')}
            flex
            noFloatingToolbar
            control={control}
            isEditorMode={isEditorMode}
            toggleEditorMode={toggleEditorMode}
            toolbarWrapperProps={{
              borderBottom: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              borderRadius: 0,
              marginBottom: 0,
              overflowX: 'auto',
            }}
            toolbarMaxWidth={'100%'}
            enableRawMode
            editorWrapperProps={{
              paddingX: '16px',
              minHeight: '200px',
            }}
            markdownRawEditorProps={{
              minHeight: '200px',
              padding: '0px 16px',
            }}
          />
        )}
      </VStack>
    </FieldContainer>
  )
}
