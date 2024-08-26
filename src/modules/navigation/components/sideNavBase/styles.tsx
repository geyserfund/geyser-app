import { createUseStyles } from 'react-jss'

import { dimensions } from '@/shared/constants'

export const slideInRight = {
  '@keyframes slide-in-right': {
    '0%': { right: `-${dimensions.mobileSideNav.width}px` },
    '100%': { right: '0' },
  },
  slideInRight: {
    webkitAnimation: '$slide-in-right .1s cubic-bezier(0.25,0.46,0.45,0.94) both',
    animation: '$slide-in-right .1s cubic-bezier(0.25,0.46,0.45,0.94) both !important',
  },
}

export const slideOutLeft = {
  '@keyframes slide-out-left': {
    '0%': { left: '0' },
    '100%': { left: `-${dimensions.mobileSideNav.width}px` },
  },

  slideOutLeft: {
    webkitAnimation: '$slide-out-left .1s cubic-bezier(0.25,0.46,0.45,0.94) both',
    animation: '$slide-out-left .1s cubic-bezier(0.25,0.46,0.45,0.94) both !important',
  },
}

export const slideInLeft = {
  '@keyframes slide-in-left': {
    '0%': { left: `-${dimensions.mobileSideNav.width}px` },
    '100%': { left: '0' },
  },
  slideInLeft: {
    webkitAnimation: '$slide-in-left .1s cubic-bezier(0.25,0.46,0.45,0.94) both',
    animation: '$slide-in-left .1s cubic-bezier(0.25,0.46,0.45,0.94) both !important',
  },
}

export const slideOutRight = {
  '@keyframes slide-out-right': {
    '0%': { right: '0' },
    '100%': { right: `-${dimensions.mobileSideNav.width}px` },
  },
  slideOutRight: {
    webkitAnimation: '$slide-out-right .1s cubic-bezier(0.25,0.46,0.45,0.94) both',
    animation: '$slide-out-right .1s cubic-bezier(0.25,0.46,0.45,0.94) both !important',
  },
}
export const useNavAnimationStyles = createUseStyles({
  ...slideInLeft,
  ...slideInRight,
  ...slideOutLeft,
  ...slideOutRight,
  barHidden: {
    display: 'none',
  },
  barShow: {
    display: 'block',
  },
})
