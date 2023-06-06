import { Box, Text } from '@chakra-ui/layout'
import classNames from 'classnames'
import { useState } from 'react'
import { createUseStyles } from 'react-jss'

import { AppTheme } from '../../context'

const useStyles = createUseStyles(({ colors }: AppTheme) => ({
  toggleContainer: {
    width: '100%',
    height: '46px',
    backgroundColor: colors.neutral[100],
    borderRadius: '14px',
    display: 'flex',
    border: '1px solid',
    borderColor: colors.neutral[100],
    alighItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer',
      border: '1px solid',
      borderColor: colors.neutral[100],
      '& $toggleShade': {
        backgroundColor: 'rgba(0,0,0,1)',
        opacity: '0.13',
        transition: 'opacity 300ms',
      },
    },
  },
  toggleShade: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.neutral[1000],
    opacity: '0',
    transition: 'opacity 300ms',
    zIndex: 3,
  },

  basicBox: {
    borderRadius: '14px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    zIndex: 2,
  },
  activeBox: {
    backgroundColor: colors.primary[400],
    zIndex: 4,
  },
}))

interface ICustomToggle {
  value: boolean
  onChange: any
  first: string
  second: string
  name?: string
}

export const CustomToggle = ({
  first,
  second,
  value,
  onChange,
  name,
}: ICustomToggle) => {
  const classes = useStyles()
  const [anonymous, setAnonymous] = useState(value)

  const handleToggle = () => {
    setAnonymous(!anonymous)
    onChange({ target: { name, value: !anonymous } })
  }

  return (
    <Box className={classes.toggleContainer} onClick={handleToggle}>
      <Box className={classes.toggleShade} />
      <Box
        className={classNames(classes.basicBox, {
          [classes.activeBox]: anonymous,
        })}
      >
        <Text>{first}</Text>
      </Box>
      <Box
        className={classNames(classes.basicBox, {
          [classes.activeBox]: !anonymous,
        })}
      >
        <Text>{second}</Text>
      </Box>
    </Box>
  )
}
