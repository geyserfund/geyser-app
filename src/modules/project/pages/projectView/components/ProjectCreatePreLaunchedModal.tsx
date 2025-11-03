import { Button, HStack, Icon, Image, Link, ModalProps, useClipboard, VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { PiLink, PiShare } from 'react-icons/pi'

import { ProgressBar } from '@/components/ui/ProgressBar.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { generateTwitterShareUrl } from '@/modules/project/utils/twitterShareTemplate.ts'
import {
  getPath,
  GeyserDiscordUrl,
  GeyserNostrUrl,
  GeyserTelegramUrl,
  GeyserTwitterUrl,
  LaunchpadStartedCountdownIllustrationUrl,
} from '@/shared/constants/index.ts'

import { Modal } from '../../../../../shared/components/layouts/Modal'
import { Body } from '../../../../../shared/components/typography'

export const ProjectCreatePreLaunchedModal = (props: Omit<ModalProps, 'children'>) => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()

  const projectLink = `${window.location.origin}${getPath('projectPreLaunch', project.name)}`

  const { onCopy, hasCopied } = useClipboard(projectLink)

  return (
    <Modal size="md" title={t("You're live on the Launchpad!")} subtitleProps={{ medium: true }} {...props}>
      <VStack w="100%" spacing={4} pt={2}>
        <Image
          src={LaunchpadStartedCountdownIllustrationUrl}
          alt="Launchpad started countdown illustration"
          height="160px"
        />
        <VStack w="100%">
          <HStack w="full" justifyContent="space-between">
            <Body size="sm" bold>
              {' '}
              {t('Raise $210 to lift off')}
            </Body>
            <Body>🚀</Body>
          </HStack>
          <ProgressBar
            width="100%"
            height="20px"
            borderRadius="8px"
            min={0}
            max={21}
            current={1}
            progressColor="primary1.11"
          />
        </VStack>

        <Body medium dark>
          {t('You’ve just launched a Bitcoin project - let`s make it fly!')} {t("It's time to raise $210 in 7 days!")}
        </Body>

        <VStack w="full" spacing={0} alignItems="flex-start">
          <Body medium dark>
            {t("What's next?")}
          </Body>
          <Body light>
            {t('Share your project with your friends, community, and people you think will care about your project.')}
          </Body>
        </VStack>
        <Body light>
          <Trans i18nKey="Connect with the Geyser team on <1>Discord</1>, <3>Telegram</3>, <5>Nostr</5>, <7>X</7>.">
            {'Connect with the Geyser team on '}
            <Link href={GeyserDiscordUrl} isExternal textDecoration="underline">
              {'Discord'}
            </Link>
            {', '}
            <Link href={GeyserTelegramUrl} isExternal textDecoration="underline">
              {'Telegram'}
            </Link>
            {', '}
            <Link href={GeyserNostrUrl} isExternal textDecoration="underline">
              {'Nostr'}
            </Link>
            {', '}
            <Link href={GeyserTwitterUrl} isExternal textDecoration="underline">
              {'X'}
            </Link>
            .
          </Trans>
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
