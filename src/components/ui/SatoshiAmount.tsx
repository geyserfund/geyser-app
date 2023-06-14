import { HStack, Text, TextProps } from '@chakra-ui/react'

import { numberWithCommas } from '../../utils'
import { SatoshiIconTilted } from '../icons'

type Props = TextProps & {
  label?: string
  extra?: string
  isLoading?: boolean
  wrapperClassName?: string
  scale?: number
}

export const SatoshiAmount = ({
  label,
  extra,
  fontSize,
  isLoading = false,
  wrapperClassName,
  children,
  scale,
  ...rest
}: Props) => {
  const getScale = () => {
    if (fontSize) {
      let size = 0

      if (typeof fontSize === 'string') {
        size = Number(fontSize.split('px')[0])
      }

      return (size / 14) * (scale || 0.4)
    }

    return 0.8
  }

  return (
    <HStack alignItems="center" className={wrapperClassName} spacing={0}>
      {label ? (
        <Text fontSize={fontSize} {...rest}>
          {`${label}: `}
        </Text>
      ) : null}

      {isLoading === false ? (
        <SatoshiIconTilted color={rest.color} scale={getScale()} />
      ) : null}

      <Text fontSize={fontSize} {...rest}>
        {`${numberWithCommas(`${children}`)} ${
          extra ? '( ' + extra + ' )' : ''
        }`}
      </Text>
    </HStack>
  )
}
