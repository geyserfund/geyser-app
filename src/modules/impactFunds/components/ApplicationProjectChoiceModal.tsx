import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

type ApplicationProjectChoiceModalProps = {
  isOpen: boolean
  onClose: () => void
  onExistingProject: () => void
  onNewProject: () => void
  hasAvailableProjects: boolean
  hasOwnedProjects: boolean
}

/** Asks applicants whether to use an existing project or create a new one. */
export const ApplicationProjectChoiceModal = ({
  isOpen,
  onClose,
  onExistingProject,
  onNewProject,
  hasAvailableProjects,
  hasOwnedProjects,
}: ApplicationProjectChoiceModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title={t('Apply for funding')} size="lg">
    <VStack align="stretch" spacing={4} w="full">
      <Body>{t('Would you like to apply with an existing project or create a new one?')}</Body>
      <Button
        variant="outline"
        colorScheme="neutral1"
        size="lg"
        isDisabled={!hasAvailableProjects}
        onClick={onExistingProject}
      >
        {t('Existing project')}
      </Button>
      {!hasAvailableProjects ? (
        <Body size="sm" light>
          {hasOwnedProjects
            ? t('All of your projects have already applied to this impact fund.')
            : t("You don't have any projects yet. Create a project to apply for funding.")}
        </Body>
      ) : null}
      <Button colorScheme="primary1" size="lg" onClick={onNewProject}>
        {t('New project')}
      </Button>
    </VStack>
  </Modal>
)
