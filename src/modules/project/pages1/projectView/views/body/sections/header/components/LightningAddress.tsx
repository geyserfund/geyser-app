import { Button, ButtonProps, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiLightning } from 'react-icons/pi'

import { Body } from '../../../../../../../../../shared/components/typography'
import { copyTextToClipboard } from '../../../../../../../../../utils'

interface ILightningQR extends ButtonProps {
  name: string
  isGeyser?: boolean
}

export const GEYSER_DOMAIN_POSTFIX = '@geyser.fund'

export const LightningAddress = ({ name, isGeyser, ...rest }: ILightningQR) => {
  const { t } = useTranslation()
  const [copy, setCopy] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleAddressCopy = () => {
    let toCopy = name
    if (isGeyser) {
      toCopy += GEYSER_DOMAIN_POSTFIX
    }

    copyTextToClipboard(toCopy)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
      onClose()
    }, 2000)
  }

  return (
    <>
      <Tooltip
        label={copy ? t('Copied!') : t('Copy Lightning Address / Nostr identifier (NIP-05)')}
        placement="top"
        closeOnClick={false}
        isOpen={isOpen}
      >
        <Button
          id="lightning-address"
          size="xs"
          variant="surface"
          colorScheme="primary1"
          leftIcon={<PiLightning />}
          onClick={handleAddressCopy}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          {...rest}
        >
          <Body size="xs" medium isTruncated flex={1}>
            {name}
          </Body>
          {isGeyser && (
            <Body size="xs" medium>
              {GEYSER_DOMAIN_POSTFIX}
            </Body>
          )}
        </Button>
      </Tooltip>
    </>
  )
}
