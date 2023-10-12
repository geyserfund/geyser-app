import { Button, ButtonProps, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BoltIcon } from '../../../../components/icons'
import { Body1 } from '../../../../components/typography'
import { copyTextToClipboard } from '../../../../utils'

interface ILightningQR extends ButtonProps {
  name: string
}

export const LightningAddress = ({ name, ...rest }: ILightningQR) => {
  const { t } = useTranslation()
  const [copy, setCopy] = useState(false)

  const handleAddressCopy = () => {
    copyTextToClipboard(name)
    setCopy(true)
  }

  return (
    <>
      <Tooltip
        label={copy ? t('Copied!') : t('Copy Lightning Address')}
        placement="top"
        closeOnClick={false}
      >
        <Button
          size="sm"
          color="neutral.600"
          leftIcon={<BoltIcon />}
          variant="secondary"
          onClick={handleAddressCopy}
          id="lightning-address"
          border="none"
          {...rest}
        >
          <Body1 semiBold isTruncated>
            {name}
          </Body1>
        </Button>
      </Tooltip>
    </>
  )
}
