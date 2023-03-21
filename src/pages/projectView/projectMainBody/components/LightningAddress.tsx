import { Button, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'

import { BoltIcon } from '../../../../components/icons'

interface ILightningQR {
  name: string
}

export const LightningAddress = ({ name }: ILightningQR) => {
  const [copy, setCopy] = useState(false)

  const handleAddressCopy = () => {
    navigator.clipboard.writeText(`${name}@geyser.fund`)
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
          leftIcon={<BoltIcon scale={0.8} />}
          border="1px solid"
          borderColor="transparent"
          _hover={{ backgroundColor: 'none', borderColor: '#20ECC7' }}
          _active={{ backgroundColor: 'brand.primary' }}
          bg="none"
          fontWeight="medium"
          onClick={handleAddressCopy}
          color="#2F423E"
          id="lightning-address"
        >
          {name}@geyser.fund
        </Button>
      </Tooltip>
    </>
  )
}
