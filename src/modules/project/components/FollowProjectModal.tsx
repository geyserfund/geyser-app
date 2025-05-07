import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom } from 'jotai'

import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

import { useProjectAtom } from '../hooks/useProjectAtom.ts'
import { FollowButton } from '../pages1/projectView/views/body/components/FollowButton.tsx'
import { followModalAtom } from '../state/followModalAtom.ts'

export const FollowProjectModal = () => {
  const { project } = useProjectAtom()

  const [isOpen, setIsOpen] = useAtom(followModalAtom)

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={t('Follow project')}
      bodyProps={{ as: VStack, gap: 4 }}
    >
      <Body size="sm">{t('Are you interested in receiving updates from this project?')}</Body>
      <Body size="sm">
        {t('We will send you important updates via your profile email for the projects your follow.')}
      </Body>
      <FollowButton width="100%" size="lg" withLabel project={project} />
    </Modal>
  )
}
