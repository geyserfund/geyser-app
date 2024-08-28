import { ButtonProps, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { NostrIcon } from '../../../../../../../../../shared/components/icons'
import { copyTextToClipboard } from '../../../../../../../../../utils'

interface NpubDisplayProps extends ButtonProps {
  npub: string
  iconOnly?: boolean
}

export const NpubDisplay = ({ npub, iconOnly, ...rest }: NpubDisplayProps) => {
  const { t } = useTranslation()
  const [copy, setCopy] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleCopyPubkey = () => {
    copyTextToClipboard(npub)
  }

  const handleOnCopy = () => {
    handleCopyPubkey()
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
      onClose()
    }, 2000)
  }

  return (
    <Tooltip label={copy ? t('Copied!') : t('Copy')} placement="top-start" closeOnClick={false} isOpen={isOpen}>
      <IconButton
        size="sm"
        aria-label="nostr-icon"
        variant="soft"
        colorScheme="primary1"
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        _hover={{ bgColor: copy ? 'primary1.9' : undefined }}
        icon={<NostrIcon height="16px" width="16px" />}
        onClick={handleOnCopy}
        {...rest}
      >
        {}
      </IconButton>
    </Tooltip>
  )
}
