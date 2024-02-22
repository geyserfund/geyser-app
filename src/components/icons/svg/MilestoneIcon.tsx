import { Icon, IconProps } from '@chakra-ui/react'

import { useCustomTheme } from '../../../utils'

export const MilestoneIcon = (props: IconProps) => {
  const { colors } = useCustomTheme()
  return (
    <Icon viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M30.0001 14.9865C30.0001 23.2634 23.2844 29.9731 15.0001 29.9731C6.71588 29.9731 0.000160217 23.2634 0.000160217 14.9865C0.000160217 6.7097 6.71588 0 15.0001 0C23.2844 0 30.0001 6.7097 30.0001 14.9865ZM6.00016 14.9865C6.00016 19.9526 10.0296 23.9785 15.0001 23.9785C19.9707 23.9785 24.0001 19.9526 24.0001 14.9865C24.0001 10.0204 19.9707 5.99461 15.0001 5.99461C10.0296 5.99461 6.00016 10.0204 6.00016 14.9865Z"
        fill={colors.neutral[400]}
      />
      <path
        d="M15 0.0269158C18.6391 0.0269163 22.1541 1.34869 24.8902 3.74598C27.6262 6.14327 29.3967 9.45256 29.8717 13.0573C30.3467 16.6621 29.4938 20.3164 27.472 23.3395C26.0093 25.5266 24.007 27.2754 21.6803 28.4317C20.1983 29.1683 18.5348 28.1939 18.1062 26.5955C17.6772 24.996 18.6733 23.3875 20.045 22.4598C21.0011 21.8132 21.8314 20.9837 22.4832 20.0091C23.6963 18.1952 24.208 16.0026 23.923 13.8398C23.638 11.6769 22.5757 9.69134 20.9341 8.25297C19.2925 6.81459 17.1835 6.02153 15 6.02153L15 0.0269158Z"
        fill={colors.neutral[800]}
      />
    </Icon>
  )
}
