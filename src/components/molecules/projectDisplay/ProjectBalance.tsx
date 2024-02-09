import { Box, Text } from '@chakra-ui/layout'
import { useState } from 'react'
import { BsCurrencyBitcoin } from 'react-icons/bs'

import { useCustomTheme } from '../../../utils'
import { commaFormatted } from '../../../utils/formatData/helperFunctions'
import { SatoshiIconTilted } from '../../icons'

interface IProjectBalance {
  balance: number
  rate: number
}

const USDBalance = ({ balance }: { balance: number }) => (
  <>
    <Text color="primary.400" fontSize="40px" mr={1}>
      $
    </Text>
    <Text color="primary.400" fontWeight="bold" fontSize="5xl">
      {balance.toFixed(2)}
    </Text>
  </>
)

const BTCBalance = ({ balance }: { balance: number }) => {
  // Let bitcoins = 0;
  const displaySatoshis = balance < 1000000
  const { colors } = useCustomTheme()
  return displaySatoshis ? (
    <>
      <SatoshiIconTilted scale={1.5} color="primary.400" />
      <Text color="primary.400" fontWeight="bold" fontSize="5xl">
        {commaFormatted(balance)}
      </Text>
    </>
  ) : (
    <>
      <BsCurrencyBitcoin fontSize="40px" color={colors.primary[400]} />
      <Text color="primary.400" fontWeight="bold" fontSize="5xl">
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
        {hover ? <USDBalance balance={balance * rate} /> : <BTCBalance balance={balance} />}
      </Box>
      <Text color="neutral.600" fontSize="xs" textAlign="center">
        RAISED
      </Text>
    </Box>
  )
}
