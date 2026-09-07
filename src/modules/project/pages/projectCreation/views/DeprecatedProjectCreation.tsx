import { Button, Image, VStack } from '@chakra-ui/react'
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
    <ProjectCreationPageWrapper
      title={t('Project creation is no longer available')}
      hideHeader
      removeBottomContainer
      width="full"
      maxWidth="none"
    >
      <VStack
        w="full"
        flex={1}
        justifyContent="center"
        alignItems="center"
        spacing={4}
        textAlign="center"
        paddingX={{ base: 4, md: 8 }}
        paddingBottom={{ base: 8, md: 16 }}
      >
        <Image
          src="/images/removed-page-illustration.png"
          alt={t('Project creation is no longer available')}
          width={{ base: '260px', md: '380px' }}
          maxWidth="100%"
          height="auto"
          objectFit="contain"
        />
        <H2>{t('This project uses a retired creation flow.')}</H2>
        <Body maxWidth="620px">
          {t(
            'Paid launches and legacy project creation are no longer supported. Existing records are preserved for historical purposes.',
          )}
        </Body>
        <Button marginTop={2} variant="soft" colorScheme="neutral1" onClick={() => navigate(projectPath)}>
          {t('View project')}
        </Button>
      </VStack>
    </ProjectCreationPageWrapper>
  )
}
