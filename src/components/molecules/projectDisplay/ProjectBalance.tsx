import { Box, Text } from '@chakra-ui/layout'
import { useState } from 'react'
import { BsCurrencyBitcoin } from 'react-icons/bs'

import { commaFormatted } from '../../../utils/formatData/helperFunctions'
import { SatoshiIconTilted } from '../../icons'

interface IProjectBalance {
  balance: number
  rate: number
}

const USDBalance = ({ balance }: { balance: number }) => (
  <>
    <Text color="brand.primary" fontSize="40px" mr={1}>
      $
    </Text>
    <Text color="brand.primary" fontWeight="bold" fontSize="5xl">
      {balance.toFixed(2)}
    </Text>
  </>
)

const BTCBalance = ({ balance }: { balance: number }) => {
  // Let bitcoins = 0;
  const displaySatoshis = balance < 1000000

  return displaySatoshis ? (
    <>
      <SatoshiIconTilted scale={1.5} color="brand.primary" />
      <Text color="brand.primary" fontWeight="bold" fontSize="5xl">
        {commaFormatted(balance)}
      </Text>
    </>
  ) : (
    <>
      <BsCurrencyBitcoin fontSize="40px" color="#20ECC7" />
      <Text color="brand.primary" fontWeight="bold" fontSize="5xl">
        {parseFloat((balance / 100000000).toFixed(4))}
      </Text>
    </>
  )
}

export const ProjectBalance = ({ balance, rate }: IProjectBalance) => {
  const [hover, setHover] = useState(false)

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover ? (
          <USDBalance balance={balance * rate} />
        ) : (
          <BTCBalance balance={balance} />
        )}
      </Box>
      <Text color="brand.textGrey" fontSize="xs" textAlign="center">
        RAISED
      </Text>
    </Box>
  )
}
