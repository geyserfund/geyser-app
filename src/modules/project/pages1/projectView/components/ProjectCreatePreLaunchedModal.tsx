/* eslint-disable no-template-curly-in-string */
import { Button, HStack, Icon, Link, ModalProps, Progress, useClipboard, VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { PiLink, PiShare } from 'react-icons/pi'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { generateTwitterShareUrl } from '@/modules/project/utils/twitterShareTemplate.ts'
import { getPath } from '@/shared/constants/index.ts'
import { centsToDollars } from '@/utils/index.ts'

import { Modal } from '../../../../../shared/components/layouts/Modal'
import { Body } from '../../../../../shared/components/typography'

export const ProjectCreatePreLaunchedModal = (props: Omit<ModalProps, 'children'>) => {
  const { t } = useTranslation()
  const { project } = useProjectAtom()

  const projectLink = `${window.location.origin}${getPath('projectPreLaunch', project.name)}`

  const { onCopy, hasCopied } = useClipboard(projectLink)

  const { followersCount } = project

  return (
    <Modal size="md" title={t("You're live on Geyser Launchpad!")} subtitleProps={{ medium: true }} {...props}>
      <VStack w="100%" spacing={6} pt={2}>
        <VStack w="100%">
          <HStack w="full" justifyContent="space-between">
            <Body>
              <Trans
                i18nKey={'${{countDown}} out of $210'}
                values={{
                  countDown: project?.balanceUsdCent ? Math.round(centsToDollars(project?.balanceUsdCent)) : 0,
                }}
              >
                {'${{countDown}} out of $210'}
              </Trans>
            </Body>
            <Body>🚀</Body>
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
          {t('You have 30 days to raise $210 to officially launch and keep the project alive.')}
        </Body>

        <Body light>
          {t(
            'Your project is now featured on the Geyser Launchpad, where supporters discover bold, early-stage ideas.',
          )}
        </Body>
        <VStack w="full" spacing={0} alignItems="flex-start">
          <Body medium dark>
            {t("What's next?")}
          </Body>
          <Body light>
            {t(
              'Share your project far and wide — post it on social media, text it to friends, or pitch it in your community.',
            )}
          </Body>
        </VStack>

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
