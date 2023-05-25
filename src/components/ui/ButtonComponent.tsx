import { Button, ButtonProps } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import classNames from 'classnames'
import { forwardRef } from 'react'
import { createUseStyles } from 'react-jss'

import { AppTheme } from '../../context'
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

const useStyles = createUseStyles(({ colors }: AppTheme) => ({
  container: {
    minHeight: '40px',
    position: 'relative',
    '& .chakra-button__icon': {
      position: 'absolute',
      left: 30,
    },
    '&.primary': {
      '& .chakra-button__icon': {
        color: colors.neutral[1000],
      },
    },
  },
  text: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

export const ButtonComponent = forwardRef<HTMLButtonElement, IButtonComponentP>(
  (
    {
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
    },
    ref,
  ) => {
    const classes = useStyles()

    return (
      <Button
        ref={ref}
        className={classNames(
          className,
          { [classes.container]: standard },
          { primary },
        )}
        variant={variant || 'solid'}
        minWidth={standard ? '200px' : ''}
        backgroundColor={
          backgroundColor
            ? backgroundColor
            : primary
            ? 'primary.400'
            : 'neutral.0'
        }
        borderRadius={circular ? '50px' : standard ? '8px' : undefined}
        _hover={_hover ? _hover : primary ? { bg: 'primary.600' } : undefined}
        fontSize="14px"
        fontWeight="medium"
        color={color}
        {...rest}
        sx={!noBorder ? buttonCommon : {}}
      >
        <Box
          as="span"
          className={classes.text}
          textColor={color || 'neutral.1000'}
        >
          {children}
        </Box>
      </Button>
    )
  },
)
