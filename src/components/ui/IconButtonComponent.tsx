import { IconButton, IconButtonProps } from '@chakra-ui/button'
import { useColorModeValue } from '@chakra-ui/system'

import { colors } from '../../styles'
import { buttonCommon } from '../../styles/common'

interface IIconButtonComponentP extends IconButtonProps {
  primary?: boolean
  href?: string
  isExternal?: boolean
}

export const IconButtonComponent = ({
  primary,
  ...rest
}: IIconButtonComponentP) => {
  const backgroundColor = useColorModeValue(colors.bgWhite, colors.bgDark)
  const textColor = useColorModeValue(colors.textBlack, colors.textWhite)

  return (
    <IconButton
      variant="solid"
      backgroundColor={primary ? 'brand.primary' : backgroundColor}
      borderRadius="50%"
      color={primary ? 'black' : textColor}
      _hover={primary ? { bg: 'brand.primaryTint' } : undefined}
      {...rest}
      sx={buttonCommon}
    />
  )
}
