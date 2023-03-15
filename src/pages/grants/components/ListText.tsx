import { Box, BoxProps, IconProps, Text, TextProps } from '@chakra-ui/react'
import { PropsWithChildren, ReactNode } from 'react'

import { SatSymbolIcon } from '../../../components/icons/svg/SatSymbolIcon'
import { colors, fonts } from '../../../styles'

export type Props = {
  isSatLogo?: boolean
  subtitle?: ReactNode
  titleProps?: TextProps
  subtitleProps?: TextProps
  satLogoProps?: IconProps
}

export const ListText = ({
  subtitle,
  isSatLogo,
  titleProps = {},
  subtitleProps = {},
  satLogoProps = {},
  children,
  ...props
}: PropsWithChildren<Props & BoxProps>) => {
  return (
    <Box display={'flex'} alignItems="center" flexDirection="column" {...props}>
      <Box display={'flex'} alignItems="center" pt={1}>
        {isSatLogo ? (
          <Box mr={1}>
            <SatSymbolIcon {...satLogoProps} />
          </Box>
        ) : null}
        {typeof children === 'string' ? (
          <Text
            fontWeight={'700'}
            fontSize={'19px'}
            fontFamily={fonts.interBlack}
            {...titleProps}
          >
            {children || '-'}
          </Text>
        ) : (
          children
        )}
      </Box>
      {subtitle && (
        <Text
          fontWeight={'700'}
          fontSize="13px"
          fontFamily={fonts.interBlack}
          color={colors.gray500}
          {...subtitleProps}
        >
          {subtitle}
        </Text>
      )}
    </Box>
  )
}
