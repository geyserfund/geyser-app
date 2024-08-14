import { Button, HStack, Image, ModalProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiSealCheckBold } from 'react-icons/pi'

import { Modal } from '../../../../../shared/components/layouts/Modal'
import { Body } from '../../../../../shared/components/typography'
import { ProjectLaunchedImageUrl } from '../../../../../shared/constants'
import { useCustomTheme } from '../../../../../utils'
import { useProjectAtom } from '../../../hooks/useProjectAtom'

export const ProjectCreateLaunchedModal = (props: Omit<ModalProps, 'children'>) => {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()
  const { project } = useProjectAtom()

  return (
    <Modal size="md" title={t('You’re all set!')} {...props}>
      <VStack w="100%" spacing={6} pt={2}>
        <Image src={ProjectLaunchedImageUrl} />

        <HStack spacing="10px" p="10px 16px" bgColor="neutral.100" borderRadius={8}>
          <PiSealCheckBold color={colors.primary[600]} />
          <Body dark>
            {' '}
            {project?.name}
            <Body as="span" dark bold>
              @geyser.fund
            </Body>{' '}
          </Body>
        </HStack>

        <Body medium dark>
          {t('Follow us and tag us on social media at @geyserfund so we can amplify your content.')}
        </Body>
        <VStack spacing="10px" w="full">
          <Button w="100%" variant="outline" colorScheme={'neutral1'} onClick={props.onClose}>
            {t('Go to project')}
          </Button>
        </VStack>
      </VStack>
    </Modal>
  )
}
