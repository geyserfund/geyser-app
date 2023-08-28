import { Button, HStack, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import { FaBitcoin } from 'react-icons/fa'
import { HiCurrencyDollar } from 'react-icons/hi'

import { SatoshiAmount } from '../../../../../../components/ui'
import { useBTCConverter } from '../../../../../../helpers'
import { Satoshis } from '../../../../../../types'
import { commaFormatted, useCustomTheme } from '../../../../../../utils'

export const BalanceDisplayButton = ({ balance }: { balance: number }) => {
  const { isOpen: isUsd, onToggle: toggleUsd } = useDisclosure()
  const { colors } = useCustomTheme()
  const { getUSDAmount } = useBTCConverter()

  const formattedUsdAmount = () => {
    const amount = getUSDAmount(balance as Satoshis)
    if (amount < 1) return 'less than $1`'
    return commaFormatted(Math.round(amount))
  }

  return (
    <Tooltip
      gutter={4}
      borderRadius="8px"
      backgroundColor="neutral.100"
      label={
        <HStack py="2px">
          {isUsd ? (
            <FaBitcoin color={colors.primary[400]} fontSize={'28px'} />
          ) : (
            <HiCurrencyDollar color={colors.primary[400]} fontSize={'32px'} />
          )}
          <Text color="primary.400" fontSize={'20px'}>
            {'<-'}
          </Text>
        </HStack>
      }
      placement="left"
    >
      <Button
        variant="ghost"
        padding="10px 5px 5px 5px"
        _hover={{
          backgroundColor: 'neutral.100',
          '& div.icon-container': {
            opacity: '1',
          },
        }}
        onClick={toggleUsd}
      >
        {!isUsd ? (
          <SatoshiAmount
            variant="satoshi"
            color="primary.600"
            whiteSpace="pre-wrap"
          >
            {balance}
          </SatoshiAmount>
        ) : (
          <Text variant="satoshi" color="primary.400" textAlign="start">
            $ {formattedUsdAmount()}
          </Text>
        )}
      </Button>
    </Tooltip>
  )
}
