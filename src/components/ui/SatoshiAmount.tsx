import { HStack, Text, TextProps } from '@chakra-ui/react'

import { commaFormatted, getShortAmountLabel } from '../../utils'
import { SatoshiIconTilted } from '../icons'

type Props = TextProps & {
  label?: string
  isLoading?: boolean
  wrapperClassName?: string
  isShortened?: boolean
  isDecimal?: boolean
}

export const SatoshiAmount = ({
  label,
  isLoading = false,
  isShortened = false,
  isDecimal = false,
  wrapperClassName,
  children,
  ...rest
}: Props) => {
  return (
    <HStack alignItems="center" spacing={0} className={wrapperClassName}>
      {label ? <Text variant="satoshi" {...rest}>{`${label}: `}</Text> : null}

      {isLoading === false ? (
        <Text variant="satoshi" {...rest}>
          <SatoshiIconTilted pb="0.2em" color={rest.color} />
        </Text>
      ) : null}

      <Text variant="satoshi" {...rest}>
        {isShortened ? getShortAmountLabel(Number(children), isDecimal) : commaFormatted(Number(children))}
      </Text>
    </HStack>
  )
}
