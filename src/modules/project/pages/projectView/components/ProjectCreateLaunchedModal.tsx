import { Button, Image, ModalProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Modal } from '../../../../../shared/components/layouts/Modal'
import { ProjectLaunchedImageUrl } from '../../../../../shared/constants'
import { useProjectAtom } from '../../../hooks/useProjectAtom'
import { isRecoverableGrantProject } from '../../../utils/isRecoverableGrantProject.ts'
import { PromoteOptions } from '../views/body/sections/controlPanel/components/PromoteProjectMenu.tsx'

export const ProjectCreateLaunchedModal = (props: Omit<ModalProps, 'children'>) => {
  const { t } = useTranslation()

  const { project } = useProjectAtom()
  const isRecoverableGrant = isRecoverableGrantProject(project)

  return (
    <Modal
      size="md"
      title={t('Your project is live')}
      subtitle={t('Now it’s time to spread the word about this project to the community.')}
      headerProps={{ fontSize: '2xl' }}
      {...props}
    >
      <VStack w="100%" spacing={6} pt={2}>
        <Image src={ProjectLaunchedImageUrl} alt={'Project successfully launched'} />

        <VStack>
          <PromoteOptions projectName={project?.name} hideAffiliateOptions={isRecoverableGrant} />
        </VStack>

        <VStack spacing="10px" w="full">
          <Button w="100%" variant="surface" colorScheme={'primary1'} onClick={props.onClose}>
            {t('Go to project')}
          </Button>
        </VStack>
      </VStack>
    </Modal>
  )
}
