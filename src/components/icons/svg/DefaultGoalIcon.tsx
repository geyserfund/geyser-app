import { Icon, IconProps } from '@chakra-ui/react'

export interface DefaultGoalIconProps extends IconProps {
  size?: 'sm' | 'md' | 'lg'
}

export const DefaultGoalIcon = ({ size = 'md', ...props }: DefaultGoalIconProps) => {
  return (
    <Icon viewBox="0 0 16 16" width="4" height="4" {...props}>
      <mask
        id="path-1-outside-1_28858_68624"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0.5"
        width="16"
        height="16"
        fill="black"
      >
        <rect fill="white" y="0.5" width="16" height="16" />
        <path d="M15 8.5C15 12.366 11.866 15.5 8 15.5C4.13401 15.5 1 12.366 1 8.5C1 4.63401 4.13401 1.5 8 1.5C11.866 1.5 15 4.63401 15 8.5Z" />
      </mask>
      <path
        d="M14.35 8.5C14.35 12.007 11.507 14.85 8 14.85V16.15C12.225 16.15 15.65 12.725 15.65 8.5H14.35ZM8 14.85C4.49299 14.85 1.65 12.007 1.65 8.5H0.35C0.35 12.725 3.77502 16.15 8 16.15V14.85ZM1.65 8.5C1.65 4.99299 4.49299 2.15 8 2.15V0.85C3.77502 0.85 0.35 4.27502 0.35 8.5H1.65ZM8 2.15C11.507 2.15 14.35 4.99299 14.35 8.5H15.65C15.65 4.27502 12.225 0.85 8 0.85V2.15Z"
        fill="currentColor"
        mask="url(#path-1-outside-1_28858_68624)"
      />
      <path
        d="M5.75 6.75H5.25V10.75C5.25 11.025 5.475 11.25 5.75 11.25H9.75V10.75H5.75V6.75ZM8.5 9.25H9V6.75H8V7.25H8.5V9.25ZM10.25 5.75H6.75C6.475 5.75 6.25 5.975 6.25 6.25V9.75C6.25 10.025 6.475 10.25 6.75 10.25H10.25C10.525 10.25 10.75 10.025 10.75 9.75V6.25C10.75 5.975 10.525 5.75 10.25 5.75ZM10.25 9.75H6.75V6.25H10.25V9.75Z"
        fill="currentColor"
      />
    </Icon>
  )
}
