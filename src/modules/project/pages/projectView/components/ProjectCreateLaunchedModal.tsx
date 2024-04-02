import { Box, Button, HStack, Image, ModalProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiSealCheckBold } from 'react-icons/pi'

import { Modal } from '../../../../../components/layouts/Modal'
import { Body1 } from '../../../../../components/typography'
import { ProjectLaunchedImageUrl } from '../../../../../constants'
import { useProjectContext } from '../../../../../context'
import { useCustomTheme } from '../../../../../utils'

export const ProjectCreateLaunchedModal = (props: Omit<ModalProps, 'children'>) => {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()
  const { project } = useProjectContext()

  return (
    <Modal size="md" title={t('You’re all set!')} {...props}>
      <VStack w="100%" spacing={6} pt={2}>
        <Image src={ProjectLaunchedImageUrl} />

        <HStack spacing="10px" p="10px 16px" bgColor="neutral.100" borderRadius={8}>
          <PiSealCheckBold color={colors.primary[600]} />
          <Body1 color="neutral.800">
            {' '}
            {project?.name}
            <Box as="span" fontWeight="700">
              @geyser.fund
            </Box>{' '}
          </Body1>
        </HStack>

        <Body1 color="primary.1000" semiBold>
          {t('Follow us and tag us on social media at @geyserfund so we can amplify your content.')}
        </Body1>
        <VStack spacing="10px" w="full">
          <Button w="100%" variant="secondary" onClick={props.onClose}>
            {t('Go to project')}
          </Button>
        </VStack>
      </VStack>
    </Modal>
  )
}
