import { Icon, IconProps } from '@chakra-ui/react'

export interface SatoshiIconCircledProps extends IconProps {
  size?: 'lg' | 'md' | 'sm'
}

export const SatoshiIconCircled = ({ size = 'md', ...props }: SatoshiIconCircledProps) => {
  return (
    <Icon viewBox="0 0 16 16" width="4" height="4" {...props}>
      <mask
        id="path-1-outside-1_28352_68893"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
        fill="black"
      >
        <rect fill="white" width="16" height="16" />
        <path d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" />
      </mask>
      <path
        d="M14.35 8C14.35 11.507 11.507 14.35 8 14.35V15.65C12.225 15.65 15.65 12.225 15.65 8H14.35ZM8 14.35C4.49299 14.35 1.65 11.507 1.65 8H0.35C0.35 12.225 3.77502 15.65 8 15.65V14.35ZM1.65 8C1.65 4.49299 4.49299 1.65 8 1.65V0.35C3.77502 0.35 0.35 3.77502 0.35 8H1.65ZM8 1.65C11.507 1.65 14.35 4.49299 14.35 8H15.65C15.65 3.77502 12.225 0.35 8 0.35V1.65Z"
        fill="currentColor"
        mask="url(#path-1-outside-1_28352_68893)"
      />
      <path d="M5 9.33203L10.093 10.76" stroke="currentColor" strokeWidth="0.599997" />
      <path d="M5.45312 7.28906L10.5461 8.71705" stroke="currentColor" strokeWidth="0.599997" />
      <path d="M7.00133 12.5007L7.27344 11.2734" stroke="currentColor" strokeWidth="0.599997" />
      <path d="M8.7279 4.72728L9 3.5" stroke="currentColor" strokeWidth="0.599997" />
      <path d="M5.90625 5.24219L10.9992 6.67017" stroke="currentColor" strokeWidth="0.599997" />
    </Icon>
  )
}
