import { Button, ButtonProps, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsFillPatchCheckFill } from 'react-icons/bs'

import { Body2 } from '../../../../components/typography'
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
          leftIcon={<BsFillPatchCheckFill />}
          variant="secondary"
          onClick={handleAddressCopy}
          id="lightning-address"
          border="none"
          {...rest}
        >
          <Body2 xBold isTruncated>
            {name}
          </Body2>
        </Button>
      </Tooltip>
    </>
  )
}
