import { Box, Button, HStack, Image, Link, ModalProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsTwitter } from 'react-icons/bs'
import { PiSealCheckBold } from 'react-icons/pi'

import { NostrSvgIcon } from '../../../components/icons'
import { Modal } from '../../../components/layouts/Modal'
import { Body1 } from '../../../components/typography'
import { GeyserPrimalUrl, GeyserTwitterUrl, ProjectLaunchedImageUrl } from '../../../constants'
import { useAuthContext, useProjectContext } from '../../../context'
import { lightModeColors, socialColors } from '../../../styles'
import { hasNostrAccount, hasTwitterAccount, useCustomTheme } from '../../../utils'

export const ProjectCreateLaunchedModal = (props: Omit<ModalProps, 'children'>) => {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()
  const { project } = useProjectContext()

  const { user } = useAuthContext()

  const hasTwitter = hasTwitterAccount(user)
  const hasNostr = hasNostrAccount(user)

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
          {hasTwitter && (
            <Button
              as={Link}
              href={GeyserTwitterUrl}
              isExternal
              w="100%"
              variant="primary"
              onClick={props.onClose}
              leftIcon={<BsTwitter />}
              textDecoration={'none'}
            >
              @geyserfund
            </Button>
          )}

          {hasNostr && (
            <Button
              as={Link}
              href={GeyserPrimalUrl}
              isExternal
              w="100%"
              onClick={props.onClose}
              leftIcon={<NostrSvgIcon boxSize={'20px'} />}
              textDecoration={'none'}
              color={lightModeColors.neutral[0]}
              bgColor={socialColors.nostr}
            >
              bitcoinrocket@geyserfund.fund
            </Button>
          )}

          <Button w="100%" variant="secondary" onClick={props.onClose}>
            {t('Go to project')}
          </Button>
        </VStack>
      </VStack>
    </Modal>
  )
}
