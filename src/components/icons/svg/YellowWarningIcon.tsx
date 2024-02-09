import { Icon, IconProps } from '@chakra-ui/react'

export const YellowWarningIcon = ({ ...props }: IconProps) => {
  return (
    <Icon width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="20" height="20" rx="10" fill="currentColor" />
      <circle cx="10" cy="14.75" r="1.25" fill="#212529" />
      <rect x="9" y="4" width="2" height="8" fill="#212529" />
    </Icon>
  )
}
