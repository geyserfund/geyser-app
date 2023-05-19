import { Icon, IconProps } from '@chakra-ui/react'

export const WavlakeIcon = ({
  tilted = true,
  ...props
}: IconProps & { tilted?: boolean }) => {
  return (
    <Icon
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="20.000000pt"
      height="17.000000pt"
      viewBox="0 0 20.000000 17.000000"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <svg>
        <g
          transform="translate(0.000000,17.000000) scale(0.100000,-0.100000)"
          fill="currentColor"
          stroke="none"
        >
          <path d="M2 88 c2 -66 6 -83 18 -83 12 0 16 17 18 83 3 77 2 82 -18 82 -20 0 -21 -5 -18 -82z" />
          <path d="M57 113 c-9 -8 -9 -76 -1 -97 10 -27 27 -18 89 44 59 59 59 60 30 60 -16 0 -39 -10 -52 -22 l-23 -21 0 21 c0 21 -28 31 -43 15z" />
        </g>
      </svg>
    </Icon>
  )
}
