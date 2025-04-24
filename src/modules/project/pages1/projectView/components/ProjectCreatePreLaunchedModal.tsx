import { Button, HStack, Icon, Link, ModalProps, Progress, useClipboard, VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { PiLink, PiShare } from 'react-icons/pi'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { generateTwitterShareUrl } from '@/modules/project/utils/twitterShareTemplate.ts'
import { getPath } from '@/shared/constants/index.ts'

import { Modal } from '../../../../../shared/components/layouts/Modal'
import { Body } from '../../../../../shared/components/typography'

export const ProjectCreatePreLaunchedModal = (props: Omit<ModalProps, 'children'>) => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()

  const projectLink = `${window.location.origin}${getPath('projectPreLaunch', project.name)}`

  const { onCopy, hasCopied } = useClipboard(projectLink)

  const { followersCount } = project

  return (
    <Modal size="md" title={t("You're live on Geyser Launchpad!")} {...props}>
      <VStack w="100%" spacing={6} pt={2}>
        <VStack w="100%">
          <HStack w="full" justifyContent="space-between">
            <Body>
              <Trans i18nKey={'{{countDown}} out of 21 followers'} values={{ countDown: followersCount ?? 0 }}>
                {'{{countDown}} out of 21 followers'}
              </Trans>
            </Body>
            <Body>⛳️ {t('Launch')}</Body>
          </HStack>
          <Progress
            borderRadius="8px"
            width="100%"
            height="20px"
            value={followersCount ?? 0}
            min={0}
            max={21}
            isAnimated
            colorScheme="teal"
          />
        </VStack>
        <Body medium dark>
          {t('You have 30 days to reach 21 followers to officially launch and start raising funds.')}
        </Body>

        <Body light>
          {t(
            'Your project is now live on the Geyser Launchpad, where contributors discover and support promising new ideas.',
          )}
        </Body>
        <Body light>
          {t(
            'Spread the word — share your project on social media, send it to friends and family, or get it featured on the Launchpad to boost your visibility.',
          )}
        </Body>

        <HStack w="full" gap={2}>
          <Button
            flex={1}
            size="lg"
            variant={hasCopied ? 'solid' : 'surface'}
            colorScheme="primary1"
            onClick={onCopy}
            leftIcon={<Icon as={PiLink} />}
          >
            {hasCopied ? t('Copied') : t('Copy link')}
          </Button>
          <Button
            as={Link}
            isExternal
            href={generateTwitterShareUrl(projectLink)}
            flex={1}
            size="lg"
            variant="outline"
            colorScheme="neutral1"
            leftIcon={<Icon as={PiShare} />}
          >
            {t('Share on X')}
          </Button>
        </HStack>
      </VStack>
    </Modal>
  )
}
