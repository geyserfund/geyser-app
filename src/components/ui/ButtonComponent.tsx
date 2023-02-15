import { Button, ButtonProps } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/system'
import classNames from 'classnames'
import { createUseStyles } from 'react-jss'

import { colors } from '../../styles'
import { buttonCommon } from '../../styles/common'

interface IButtonComponentP extends ButtonProps {
  className?: string
  primary?: boolean
  standard?: boolean
  circular?: boolean
  noBorder?: boolean
  ref?: any
  to?: string
  href?: string
  isExternal?: boolean
}

const useStyles = createUseStyles({
  container: {
    minHeight: '40px',
    position: 'relative',
    '& .chakra-button__icon': {
      position: 'absolute',
      left: 30,
    },
    '&.primary': {
      '& .chakra-button__icon': {
        color: 'black',
      },
    },
  },
  text: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export const ButtonComponent = ({
  className,
  variant,
  primary,
  children,
  standard,
  circular,
  backgroundColor,
  _hover,
  color,
  noBorder,
  ...rest
}: IButtonComponentP) => {
  const classes = useStyles()
  const bgColor = useColorModeValue(colors.bgWhite, colors.bgDark)
  const defaultColor = useColorModeValue(colors.textBlack, colors.textWhite)
  const textColor = color || defaultColor

  return (
    <Button
      className={classNames(
        className,
        { [classes.container]: standard },
        { primary },
      )}
      variant={variant || 'solid'}
      minWidth={standard ? '200px' : ''}
      backgroundColor={
        backgroundColor ? backgroundColor : primary ? 'brand.primary' : bgColor
      }
      borderRadius={circular ? '50px' : standard ? '4px' : undefined}
      _hover={
        _hover ? _hover : primary ? { bg: 'brand.primaryTint' } : undefined
      }
      fontSize="12px"
      fontWeight="medium"
      color={color}
      {...rest}
      sx={!noBorder ? buttonCommon : {}}
    >
      <Box
        as="span"
        className={classes.text}
        textColor={primary ? 'black' : textColor}
      >
        {children}
      </Box>
    </Button>
  )
}
