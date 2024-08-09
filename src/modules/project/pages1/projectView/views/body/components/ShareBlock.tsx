import { Button, HStack, Link, StackProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiLink, PiXLogo } from 'react-icons/pi'

import { getAppEndPoint } from '../../../../../../../config/domain'
import { copyTextToClipboard } from '../../../../../../../utils'
import { shareOnTwitter } from '../../../../../utils/twitterShareTemplate'

interface ShareBlockProps extends StackProps {
  projectName: string
}

export const ShareBlock = ({ projectName, ...rest }: ShareBlockProps) => {
  const { t } = useTranslation()
  const endPoint = getAppEndPoint()

  const projectUrl = `${endPoint}/project/${projectName}`

  return (
    <HStack w="full" {...rest}>
      <Button
        flex={1}
        variant="soft"
        colorScheme="neutral1"
        rightIcon={<PiLink />}
        onClick={() => copyTextToClipboard(projectUrl)}
      >
        {t('Copy')}
      </Button>
      <Button
        flex={1}
        variant="soft"
        colorScheme="neutral1"
        rightIcon={<PiXLogo />}
        as={Link}
        isExternal
        href={shareOnTwitter(projectName, t)}
        textDecoration="none"
      >
        {t('Post')}
      </Button>
    </HStack>
  )
}
