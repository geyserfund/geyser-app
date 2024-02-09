import { Button, ButtonProps, HStack, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { NostrSvgIcon } from '../../../../components/icons'
import { Body1 } from '../../../../components/typography'
import { copyTextToClipboard } from '../../../../utils'

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
        size="sm"
        color="neutral.600"
        variant="secondary"
        bgColor={'transparent'}
        display="flex"
        padding="5px 10px"
        justifyContent="space-between"
        border="none"
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        {...rest}
      >
        <HStack spacing="10px">
          {<NostrSvgIcon boxSize={5} onClick={handleOnCopy} color={'neutral.600'} />}
          {!iconOnly && (
            <Body1 semiBold onClick={handleOnCopy} color={'neutral.600'} width="auto">
              {`npub`}
            </Body1>
          )}
        </HStack>
      </Button>
    </Tooltip>
  )
}
