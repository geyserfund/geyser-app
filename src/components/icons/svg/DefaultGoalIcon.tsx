import { Icon, IconProps } from '@chakra-ui/react'

export interface DefaultGoalIconProps extends IconProps {
  size?: 'sm' | 'md' | 'lg'
}

export const DefaultGoalIcon = ({ size = 'md', ...props }: DefaultGoalIconProps) => {
  return (
    <Icon viewBox="0 0 24 18" width="28px" height="28px" {...props}>
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
        d="M5.125 5.875H4.375V11.875C4.375 12.2875 4.7125 12.625 5.125 12.625H11.125V11.875H5.125V5.875ZM9.25 9.625H10V5.875H8.5V6.625H9.25V9.625ZM11.875 4.375H6.625C6.2125 4.375 5.875 4.7125 5.875 5.125V10.375C5.875 10.7875 6.2125 11.125 6.625 11.125H11.875C12.2875 11.125 12.625 10.7875 12.625 10.375V5.125C12.625 4.7125 12.2875 4.375 11.875 4.375ZM11.875 10.375H6.625V5.125H11.875V10.375Z"
        fill="currentColor"
      />
    </Icon>
  )
}
