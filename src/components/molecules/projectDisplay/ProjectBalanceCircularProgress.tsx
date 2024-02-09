import { Box } from '@chakra-ui/layout'
import { CircularProgress, HStack, Text } from '@chakra-ui/react'
import { Stat, StatLabel, StatNumber } from '@chakra-ui/stat'
import { useState } from 'react'
import { IconBaseProps } from 'react-icons'
import { BsCurrencyBitcoin } from 'react-icons/bs'
import { createUseStyles } from 'react-jss'

import { useDarkMode } from '../../../utils'
import { commaFormatted } from '../../../utils/formatData/helperFunctions'
import { SatoshiIconTilted } from '../../icons'

interface IProjectBalanceCircularProgress {
  balance: number
  goal: number
  rate: number
  loading: boolean
}

const useStyles = createUseStyles({
  circularProgress: {
    borderRadius: '50%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    filter: 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.15))',
    '& .amount-label-sat': {
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
  },
})

const BTCBalance = (params: { balance: number; pixelFontSize?: number; color?: IconBaseProps['color'] }) => {
  const { balance, pixelFontSize } = params
  const displaySatoshis = balance < 1000000

  return displaySatoshis ? (
    <>
      <SatoshiIconTilted scale={pixelFontSize ? pixelFontSize / 26 : 1} />
      {commaFormatted(balance)}
    </>
  ) : (
    <>
      <BsCurrencyBitcoin />
      {parseFloat((balance / 100000000).toFixed(4))}
    </>
  )
}

export const ProjectBalanceCircularProgress = ({ goal, rate, balance, loading }: IProjectBalanceCircularProgress) => {
  const classes = useStyles()
  const isDark = useDarkMode()
  const balanceUSD = (balance * rate).toFixed(2)
  const percentage = (balance / goal) * 100

  const [display, setDisplay] = useState(false)

  const getDisplayPercent = (percent: number) => {
    if (percent < 1) {
      return percent.toFixed(2)
    }

    return percent.toFixed()
  }

  const handleClick = () => {
    setDisplay(!display)
  }

  const handleMouseOver = () => {
    setDisplay(true)
    setTimeout(() => {
      setDisplay(false)
    }, 5000)
  }

  const getStat = () => (
    <Stat textAlign="center" borderRadius="50%">
      <StatLabel fontSize="12px" color={isDark ? 'neutral.0' : 'neutral.600'}>
        Raised
      </StatLabel>
      <StatNumber className="amount-label-sat" position="relative" display={!display ? 'flex' : 'none'}>
        <BTCBalance balance={balance} />
      </StatNumber>
      <StatNumber className="amount-label-usd" display={display ? 'block' : 'none'} position="relative">
        {'$'}
        {balanceUSD}{' '}
      </StatNumber>
      <HStack justify="center" spacing={0} fontSize="12px" color={isDark ? 'neutral.0' : 'neutral.600'}>
        <Text fontSize="12px">{getDisplayPercent(percentage)}% of</Text>
        <BTCBalance balance={goal} pixelFontSize={12} />
      </HStack>
    </Stat>
  )

  return (
    <>
      {percentage < 100 ? (
        <CircularProgress
          onMouseOver={handleMouseOver}
          onMouseOut={handleClick}
          isIndeterminate={loading}
          className={classes.circularProgress}
          value={percentage}
          size="208px"
          thickness="6px"
          color="primary.400"
          filter="drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.15))"
        >
          <Box position="absolute" fontSize="12px">
            {getStat()}
          </Box>
        </CircularProgress>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" width="208px" height="208px" padding="16px">
          <Box
            width="176px"
            height="176px"
            backgroundColor="primary.400"
            borderRadius="50%"
            padding="10px"
            className={classes.circularProgress}
          >
            {getStat()}
          </Box>
        </Box>
      )}
    </>
  )
}
