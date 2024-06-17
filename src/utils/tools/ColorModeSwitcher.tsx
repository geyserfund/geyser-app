import { IconButton, IconButtonProps, useColorMode, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'
import { PiCloudMoon, PiSun } from 'react-icons/pi'
import { useTheme } from 'react-jss'

import { AppTheme } from '../../context'

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>

export const UserSetColorMode = 'userSetColorMode'

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(PiCloudMoon, PiSun)

  const handleToggleColorMode = () => {
    toggleColorMode()
    localStorage.setItem(UserSetColorMode, 'true')
  }

  return (
    <IconButton
      variant="soft"
      colorScheme="neutral1"
      fontSize="lg"
      onClick={handleToggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  )
}

export const useCustomTheme = () => useTheme<AppTheme>()
