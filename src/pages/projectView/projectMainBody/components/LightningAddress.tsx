import { Button, ButtonProps, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BoltIcon } from '../../../../components/icons'
import { Body1 } from '../../../../components/typography'
import { nostrColorsLight, primaryColorsLight, secondaryColors } from '../../../../styles'
import { copyTextToClipboard } from '../../../../utils'

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
          size="sm"
          color="neutral.600"
          leftIcon={<BoltIcon height="16px" color={nostrColorsLight[400]} />}
          variant="secondary"
          onClick={handleAddressCopy}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          id="lightning-address"
          border="none"
          {...rest}
        >
          <Body1 semiBold isTruncated color={nostrColorsLight[400]} flex={1}>
            {name}
          </Body1>
          {isGeyser && (
            <Body1
              semiBold
              background={`linear-gradient(270deg, ${primaryColorsLight[500]} -0.1%, ${secondaryColors.blue} 40.0%, ${nostrColorsLight[400]} 99.9%)`}
              backgroundClip="text"
            >
              {GEYSER_DOMAIN_POSTFIX}
            </Body1>
          )}
        </Button>
      </Tooltip>
    </>
  )
}
