import { Button, HStack, Link, StackProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiLink, PiXLogo } from 'react-icons/pi'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'

import { shareOnTwitterWithLink } from '../../../../../utils/twitterShareTemplate'
import { CampaignContent, useProjectShare } from '../../../hooks'

interface ShareBlockProps extends StackProps {
  projectName: string
}

export const ShareBlock = ({ projectName, ...rest }: ShareBlockProps) => {
  const { t } = useTranslation()

  const { isProjectOwner } = useProjectAtom()

  const { getShareProjectUrl } = useProjectShare()
  const projectUrl = getShareProjectUrl({ clickedFrom: CampaignContent.projectShareModal })
  const { onCopy, hasCopied } = useCopyToClipboard(projectUrl)

  const shareLink = shareOnTwitterWithLink(projectUrl, t, !isProjectOwner)

  return (
    <HStack w="full" {...rest}>
      <Button
        flex={1}
        variant="soft"
        colorScheme={hasCopied ? 'primary1' : 'neutral1'}
        rightIcon={<PiLink />}
        onClick={onCopy}
      >
        {hasCopied ? t('Copied!') : t('Copy')}
      </Button>
      <Button
        flex={1}
        variant="soft"
        colorScheme="neutral1"
        rightIcon={<PiXLogo />}
        as={Link}
        isExternal
        href={shareLink}
        textDecoration="none"
      >
        {t('Post')}
      </Button>
    </HStack>
  )
}
