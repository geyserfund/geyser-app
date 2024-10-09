import { Button, ButtonProps, HStack, Icon } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiCopy, PiLightning } from 'react-icons/pi'

import { GEYSER_DOMAIN_POSTFIX } from '@/shared/constants/platform/domain'

import { Body } from '../../../../../../../../../shared/components/typography'
import { copyTextToClipboard } from '../../../../../../../../../utils'

interface ILightningQR extends ButtonProps {
  name: string
  isGeyser?: boolean
}

export const LightningAddress = ({ name, isGeyser = true, ...rest }: ILightningQR) => {
  const { t } = useTranslation()
  const [copy, setCopy] = useState(false)

  const handleAddressCopy = () => {
    let toCopy = name
    if (isGeyser) {
      toCopy += GEYSER_DOMAIN_POSTFIX
    }

    copyTextToClipboard(toCopy)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 2000)
  }

  return (
    <HStack w="full">
      <Button
        id="lightning-address"
        size="md"
        variant={copy ? 'solid' : 'soft'}
        colorScheme="primary1"
        leftIcon={<Icon as={PiLightning} fontSize={'18px'} />}
        onClick={handleAddressCopy}
        {...rest}
      >
        <Body size="md" medium isTruncated>
          {name}
        </Body>
        {isGeyser && (
          <Body size="md" medium>
            {GEYSER_DOMAIN_POSTFIX}
          </Body>
        )}
      </Button>
      <Button
        minWidth={24}
        size="md"
        variant="solid"
        colorScheme="primary1"
        rightIcon={<PiCopy />}
        onClick={handleAddressCopy}
      >
        {copy ? t('Copied') : t('Copy')}
      </Button>
    </HStack>
  )
}
