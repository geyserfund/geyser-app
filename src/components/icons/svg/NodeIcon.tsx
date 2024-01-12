import { Icon, IconProps } from '@chakra-ui/react'

export const NodeIcon = (props: IconProps) => {
  return (
    <Icon
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.7985 9.92926C16.3547 9.69321 16.7849 9.21802 16.96 8.63269L21.3674 13.0401C20.7821 13.2152 20.3069 13.6454 20.0708 14.2016L15.7985 9.92926ZM20.0708 15.7985L15.7985 20.0709C16.3547 20.3069 16.7849 20.7821 16.96 21.3674L21.3674 16.96C20.7821 16.7849 20.3069 16.3547 20.0708 15.7985ZM14.2019 20.0707L9.92938 15.7982C9.69343 16.3544 9.21833 16.7847 8.63306 16.9599L13.0402 21.367C13.2154 20.7818 13.6457 20.3067 14.2019 20.0707ZM14.2019 9.92942L9.92938 14.202C9.69343 13.6457 9.21833 13.2155 8.63306 13.0403L13.0402 8.6331C13.2154 9.21837 13.6457 9.69347 14.2019 9.92942Z"
        fill="currentColor"
      />
      <circle
        cx="15"
        cy="8.04545"
        r="2.04545"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="15"
        cy="21.9546"
        r="2.04545"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="8.04545"
        cy="15"
        r="2.04545"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="21.9546"
        cy="15"
        r="2.04545"
        stroke="currentColor"
        strokeWidth="2"
      />
    </Icon>
  )
}
