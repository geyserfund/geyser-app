import { Box, Image, ImageProps, Text, TextProps } from '@chakra-ui/react'

import satsymbol from '../../../assets/satoshi.png'
import { colors, fonts } from '../../../styles'

export type Props = {
  isSatLogo?: boolean
  title?: string
  subtitle: string
  titleProps?: TextProps
  subtitleProps?: TextProps
  satLogoProps?: ImageProps
}

export const ListText = ({
  title,
  subtitle,
  isSatLogo,
  titleProps = {},
  subtitleProps = {},
  satLogoProps = {},
}: Props) => {
  return (
    <Box display={'flex'} alignItems="center" flexDirection="column">
      <Box display={'flex'} alignItems="center" height="34px">
        {isSatLogo ? (
          <Box mr={1}>
            <Image
              src={satsymbol}
              height="18px"
              alt="satsymbol"
              {...satLogoProps}
            />
          </Box>
        ) : null}
        <Text
          fontWeight={'700'}
          fontSize={'19px'}
          fontFamily={fonts.interBlack}
          {...titleProps}
        >
          {title || '-'}
        </Text>
      </Box>
      <Text
        fontWeight={'700'}
        fontSize="13px"
        fontFamily={fonts.interBlack}
        color={colors.gray500}
        {...subtitleProps}
      >
        {subtitle}
      </Text>
    </Box>
  )
}
