import { Button, ButtonProps, HStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiCopy } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'

import { NostrIcon } from '../../../../../../../../../shared/components/icons'
import { copyTextToClipboard } from '../../../../../../../../../utils'

interface NpubDisplayProps extends ButtonProps {
  npub: string
  iconOnly?: boolean
}

export const NpubDisplay = ({ npub, iconOnly, ...rest }: NpubDisplayProps) => {
  const { t } = useTranslation()
  const [copy, setCopy] = useState(false)

  const handleCopyPubkey = () => {
    copyTextToClipboard(npub)
  }

  const handleOnCopy = () => {
    handleCopyPubkey()
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 2000)
  }

  return (
    <HStack w="full">
      <Button
        size="md"
        aria-label="nostr-icon"
        variant={copy ? 'solid' : 'soft'}
        colorScheme="violet"
        leftIcon={<NostrIcon height="18px" width="18px" />}
        onClick={handleOnCopy}
        {...rest}
      >
        <Body size="md" medium isTruncated flex={1}>
          {npub}
        </Body>
      </Button>
      <Button
        minWidth={24}
        size="md"
        variant="solid"
        colorScheme="primary1"
        rightIcon={<PiCopy />}
        onClick={handleOnCopy}
        isTruncated
      >
        {copy ? t('Copied') : t('Copy')}
      </Button>
    </HStack>
  )
}
