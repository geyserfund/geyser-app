import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ProjectRewardForm } from '@/modules/project/pages1/projectView/views/rewards/shared'

export const ProjectCreationCreateReward = () => {
  const { t } = useTranslation()

  const location = useLocation()
  const { project } = useProjectAtom()

  const category = location.state?.category

  if (!project) {
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
        buttonText={t('Save reward')}
        titleText={t('Create Reward')}
        createOrUpdate="create"
        defaultCategory={category}
        isLaunch={true}
      />
    </VStack>
  )
}
