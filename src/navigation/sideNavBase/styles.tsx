import { createUseStyles } from 'react-jss'

export const slideInRight = {
  '@-webkit-keyframes slide-in-right': {
    from: { right: '-210px' },
    to: { right: '0' },
  },
  '@keyframes slide-in-right': {
    from: { right: '-210px' },
    to: { right: '0' },
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
    from: { left: '0' },
    to: { left: '-210px' },
  },
  '@keyframes slide-out-left': {
    from: { left: '0' },
    to: { left: '-210px' },
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
    from: { left: '-210px' },
    to: { left: '0' },
  },
  '@keyframes slide-in-left': {
    from: { left: '-210px' },
    to: { left: '0' },
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
    from: { right: '0' },
    to: { right: '-210px' },
  },
  '@keyframes slide-out-right': {
    from: { right: '0' },
    to: { right: '-210px' },
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
