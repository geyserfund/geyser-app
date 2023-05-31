import { Icon, IconProps } from '@chakra-ui/react'

export const SatoshiIcon = ({ ...props }: IconProps) => {
  return (
    <Icon
      viewBox="0 0 360 360"
      fill={props.color || 'neutral.1000'}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="166.06" y="2.83" width="27.89" height="47.65" />
      <rect x="166.06" y="310.35" width="27.89" height="47.65" />
      <rect
        x="166.06"
        y="6.84"
        width="27.89"
        height="198.86"
        transform="translate(286.28 -73.74) rotate(90)"
      />
      <rect
        x="166.06"
        y="80.5"
        width="27.89"
        height="198.86"
        transform="translate(359.94 -0.08) rotate(90)"
      />
      <rect
        x="166.06"
        y="152.08"
        width="27.89"
        height="198.86"
        transform="translate(431.52 71.5) rotate(90)"
      />
    </Icon>
  )
}
