import { Button, ButtonProps, HStack, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { NostrSvgIcon } from '../../../../../../../components/icons'
import { Body1 } from '../../../../../../../components/typography'
import { Body } from '../../../../../../../shared/components/typography'
import { copyTextToClipboard } from '../../../../../../../utils'

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
      <Button
        size="xs"
        variant="outline"
        colorScheme="neutral1"
        bgColor={copy ? 'primary1.9' : 'transparent'}
        display="flex"
        justifyContent="space-between"
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        _hover={{ bgColor: copy ? 'primary1.9' : undefined }}
        {...rest}
      >
        <HStack spacing="10px">
          {<NostrSvgIcon height="12px" width="12px" onClick={handleOnCopy} color={'social.nostr'} />}
          {!iconOnly && (
            <Body size="xs" medium light onClick={handleOnCopy} width="auto">
              {`npub`}
            </Body>
          )}
        </HStack>
      </Button>
    </Tooltip>
  )
}
