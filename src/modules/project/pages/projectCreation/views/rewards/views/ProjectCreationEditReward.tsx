import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'

import { ProjectRewardForm } from '@/modules/project/forms/rewardForm/ProjectRewardForm.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'

export const ProjectCreationEditReward = () => {
  const { t } = useTranslation()

  const { project, isProjectOwner } = useProjectAtom()

  const params = useParams<{ rewardUUID: string; projectId: string }>()

  if (!project || !isProjectOwner) {
    return null
  }

  return (
    <VStack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      backgroundColor={{ base: 'neutral.0', lg: 'inherit' }}
      spacing={{ base: '10px', lg: '20px' }}
      paddingBottom={'120px'}
    >
      <ProjectRewardForm
        buttonText={t('Update Product')}
        titleText={t('Edit Product')}
        rewardUUID={params.rewardUUID}
        isUpdate={true}
        isLaunch={true}
      />
    </VStack>
  )
}
