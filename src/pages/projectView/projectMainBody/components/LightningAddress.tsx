import { Button, ButtonProps, Text, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'

import { BoltIcon } from '../../../../components/icons'

interface ILightningQR extends ButtonProps {
  name: string
}

export const LightningAddress = ({ name, ...rest }: ILightningQR) => {
  const [copy, setCopy] = useState(false)

  const handleAddressCopy = () => {
    navigator.clipboard.writeText(name)
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
          {...rest}
        >
          <Text isTruncated>{name}</Text>
        </Button>
      </Tooltip>
    </>
  )
}
