import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants/index.ts'

import { ProjectCreationPageWrapper } from '../components/ProjectCreationPageWrapper.tsx'

export const DeprecatedProjectCreation = () => {
  const navigate = useNavigate()
  const { project } = useProjectAtom()
  const projectPath = project.launchedAt
    ? getPath('project', project.name || '')
    : getPath('projectDraft', project.name || '')

  return (
    <ProjectCreationPageWrapper title={t('Project creation is no longer available')} hideContinueButton>
      <VStack w="full" alignItems="start" spacing={4}>
        <H2>{t('This project uses a retired creation flow.')}</H2>
        <Body>
          {t('Paid launches and legacy project creation are no longer supported. Existing records are preserved for historical purposes.')}
        </Body>
        <Button onClick={() => navigate(projectPath)}>
          {t('View project')}
        </Button>
      </VStack>
    </ProjectCreationPageWrapper>
  )
}
