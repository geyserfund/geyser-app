import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'

import { ProjectRewardForm } from '@/modules/project/forms/rewardForm/ProjectRewardForm.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'

export const ProjectCreationCreateReward = () => {
  const { t } = useTranslation()

  const location = useLocation()
  const { project } = useProjectAtom()

  const category = location.state?.category

  console.log('category', category)
  console.log('project', project)

  if (!project) {
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
        buttonText={t('Save product')}
        titleText={t('Create product')}
        isUpdate={false}
        defaultCategory={category}
        isLaunch={true}
      />
    </VStack>
  )
}
