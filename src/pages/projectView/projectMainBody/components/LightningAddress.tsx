import { Button, ButtonProps, Text, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'

import { BoltIcon } from '../../../../components/icons'
import { copyTextToClipboard } from '../../../../utils'

interface ILightningQR extends ButtonProps {
  name: string
}

export const LightningAddress = ({ name, ...rest }: ILightningQR) => {
  const [copy, setCopy] = useState(false)

  const handleAddressCopy = () => {
    copyTextToClipboard(name)
    setCopy(true)
  }

  return (
    <>
      <Tooltip
        label={copy ? 'Copied!' : 'Copy Lightning Address'}
        placement="top"
        closeOnClick={false}
      >
        <Button
          size="sm"
          leftIcon={<BoltIcon />}
          variant="secondary"
          onClick={handleAddressCopy}
          id="lightning-address"
          {...rest}
        >
          <Text isTruncated>{name}</Text>
        </Button>
      </Tooltip>
    </>
  )
}
