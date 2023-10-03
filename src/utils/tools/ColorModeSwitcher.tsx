import {
  IconButton,
  IconButtonProps,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { BsFillBrightnessLowFill, BsFillMoonStarsFill } from 'react-icons/bs'
import { useTheme } from 'react-jss'

import { AppTheme } from '../../context'

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>

export const UserSetColorMode = 'userSetColorMode'

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(
    BsFillMoonStarsFill,
    BsFillBrightnessLowFill,
  )

  const handleToggleColorMode = () => {
    toggleColorMode()
    localStorage.setItem(UserSetColorMode, 'true')
  }

  return (
    <IconButton
      size={{ base: 'sm', lg: 'md' }}
      fontSize="lg"
      bg="neutral.50"
      color="neutral.600"
      onClick={handleToggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  )
}

export const useCustomTheme = () => useTheme<AppTheme>()
