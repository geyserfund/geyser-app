import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { PiEye, PiEyeSlash } from 'react-icons/pi'

type PasswordVisibilityToggleProps = {
  showPassword: boolean
  onToggle: () => void
} & Omit<IconButtonProps, 'aria-label' | 'icon' | 'onClick'>

/** Toggle button for showing/hiding password in input fields */
export const PasswordVisibilityToggle = ({ showPassword, onToggle, ...props }: PasswordVisibilityToggleProps) => {
  return (
    <IconButton
      aria-label={showPassword ? 'Hide password' : 'Show password'}
      icon={showPassword ? <PiEyeSlash /> : <PiEye />}
      onClick={onToggle}
      variant="ghost"
      colorScheme="neutral1"
      size="lg"
      {...props}
    />
  )
}
