import { Icon, IconProps } from '@chakra-ui/react'

export const SideNavIcon = (props: IconProps) => {
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
        d="M23.334 15.8333C23.334 18.976 23.334 20.5474 22.3577 21.5237C21.3814 22.5 19.81 22.5 16.6673 22.5H13.334C10.1913 22.5 8.6199 22.5 7.64365 21.5237C6.66732 20.5474 6.66732 18.976 6.66732 15.8333V14.1667C6.66732 11.024 6.66732 9.45258 7.64365 8.47633C8.6199 7.5 10.1913 7.5 13.334 7.5H16.6673C19.81 7.5 21.3814 7.5 22.3577 8.47633C23.334 9.45258 23.334 11.024 23.334 14.1667V15.8333Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M12.5 7.5V22.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </Icon>
  )
}
