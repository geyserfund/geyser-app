import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ProjectRewardForm } from '@/modules/project/pages1/projectView/views/rewards/shared'

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
    >
      <ProjectRewardForm
        buttonText={t('Update Reward')}
        titleText={t('Edit Reward')}
        rewardUUID={params.rewardUUID}
        isUpdate={true}
        isLaunch={true}
      />
    </VStack>
  )
}
