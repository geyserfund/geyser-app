import { createUseStyles } from 'react-jss'

export const slideInRight = {
  '@-webkit-keyframes slide-in-right': {
    '0%': { right: '-210px' },
    '100%': { right: '0' },
  },
  '@keyframes slide-in-right': {
    '0%': { right: '-210px' },
    '100%': { right: '0' },
  },
  slideInRight: {
    webkitAnimation:
      '$slide-in-right .2s cubic-bezier(0.25,0.46,0.45,0.94) both',
    animation:
      '$slide-in-right .2s cubic-bezier(0.25,0.46,0.45,0.94) both !important',
  },
}

export const slideOutLeft = {
  '@-webkit-keyframes slide-out-left': {
    '0%': { left: '0' },
    '100%': { left: '-210px' },
  },
  '@keyframes slide-out-left': {
    '0%': { left: '0' },
    '100%': { left: '-210px' },
  },

  slideOutLeft: {
    webkitAnimation:
      '$slide-out-left .2s cubic-bezier(0.25,0.46,0.45,0.94) both',
    animation:
      '$slide-out-left .2s cubic-bezier(0.25,0.46,0.45,0.94) both !important',
  },
}

export const slideInLeft = {
  '@-webkit-keyframes slide-in-left': {
    '0%': { left: '-210px' },
    '100%': { left: '0' },
  },
  '@keyframes slide-in-left': {
    '0%': { left: '-210px' },
    '100%': { left: '0' },
  },
  slideInLeft: {
    webkitAnimation:
      '$slide-in-left .2s cubic-bezier(0.25,0.46,0.45,0.94) both',
    animation:
      '$slide-in-left .2s cubic-bezier(0.25,0.46,0.45,0.94) both !important',
  },
}

export const slideOutRight = {
  '@-webkit-keyframes slide-out-right': {
    '0%': { right: '0' },
    '100%': { right: '-210px' },
  },
  '@keyframes slide-out-right': {
    '0%': { right: '0' },
    '100%': { right: '-210px' },
  },
  slideOutRight: {
    webkitAnimation:
      '$slide-out-right .2s cubic-bezier(0.25,0.46,0.45,0.94) both',
    animation:
      '$slide-out-right .2s cubic-bezier(0.25,0.46,0.45,0.94) both !important',
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
