import { Icon, IconProps } from '@chakra-ui/react'

export interface SatoshiIconProps extends IconProps {
  size?: 'lg' | 'md' | 'sm'
}

export const SatoshiIcon = ({ size = 'md', ...props }: SatoshiIconProps) => {
  if (size === 'lg') {
    return (
      <Icon width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M11.4877 2.04457L10.3525 1.74316L9.83749 3.68295L10.9727 3.98436L11.4877 2.04457Z"
          fill="currentColor"
        />
        <path d="M8.16105 14.5587L7.02588 14.2573L6.51083 16.1971L7.646 16.4985L8.16105 14.5587Z" fill="currentColor" />
        <path
          d="M13.6942 7.74454L13.9956 6.60938L5.90156 4.46025L5.60016 5.59542L13.6942 7.74454Z"
          fill="currentColor"
        />
        <path
          d="M12.9032 10.7401L13.2046 9.60498L5.11055 7.45586L4.80914 8.59103L12.9032 10.7401Z"
          fill="currentColor"
        />
        <path d="M12.1283 13.6552L12.4297 12.52L4.33564 10.3709L4.03424 11.5061L12.1283 13.6552Z" fill="currentColor" />
      </Icon>
    )
  }

  if (size === 'sm') {
    return (
      <Icon width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.38199 1.13586L5.75134 0.968414L5.4652 2.04607L6.09585 2.21352L6.38199 1.13586Z"
            fill="currentColor"
          />
          <path
            d="M4.53442 8.08798L3.90377 7.92053L3.61763 8.99819L4.24828 9.16564L4.53442 8.08798Z"
            fill="currentColor"
          />
          <path
            d="M7.60814 4.30231L7.77559 3.67166L3.27889 2.47771L3.11145 3.10835L7.60814 4.30231Z"
            fill="currentColor"
          />
          <path
            d="M7.16833 5.96686L7.33578 5.33621L2.83909 4.14226L2.67164 4.7729L7.16833 5.96686Z"
            fill="currentColor"
          />
          <path
            d="M6.73792 7.58676L6.90536 6.95612L2.40867 5.76216L2.24123 6.39281L6.73792 7.58676Z"
            fill="currentColor"
          />
        </svg>
      </Icon>
    )
  }

  return (
    <Icon width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.65767 1.36256L6.90089 1.16162L6.55752 2.45481L7.3143 2.65575L7.65767 1.36256Z" fill="currentColor" />
      <path d="M5.44062 9.70558L4.68385 9.50464L4.34048 10.7978L5.09726 10.9988L5.44062 9.70558Z" fill="currentColor" />
      <path d="M9.1294 5.16303L9.33033 4.40625L3.9343 2.9735L3.73337 3.73028L9.1294 5.16303Z" fill="currentColor" />
      <path d="M8.60132 7.16034L8.80226 6.40356L3.40623 4.97082L3.20529 5.7276L8.60132 7.16034Z" fill="currentColor" />
      <path d="M8.08496 9.10346L8.2859 8.34668L2.88987 6.91393L2.68893 7.67071L8.08496 9.10346Z" fill="currentColor" />
    </Icon>
  )
}
