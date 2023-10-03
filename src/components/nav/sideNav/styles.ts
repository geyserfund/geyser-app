export const slideInLeft = {
  '@-webkit-keyframes slide-in-left': {
    from: {
      webkitTransform: 'translateX(-210px)',
      transform: 'translateX(-210px)',
    },
    to: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
    },
  },
  '@keyframes slide-in-left': {
    from: {
      webkitTransform: 'translateX(-210px)',
      transform: 'translateX(-210px)',
    },
    to: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
    },
  },
  slideInLeft: {
    webkitAnimation:
      '$slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    animation:
      '$slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
  },
}

export const slideOutRight = {
  '@-webkit-keyframes slide-out-right': {
    from: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
    },
    to: {
      webkitTransform: 'translateX(210px)',
      transform: 'translateX(210px)',
    },
  },
  '@keyframes slide-out-right': {
    from: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
    },
    to: {
      webkitTransform: 'translateX(210px)',
      transform: 'translateX(210px)',
    },
  },
  slideOutRight: {
    webkitAnimation:
      '$slide-out-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    animation:
      '$slide-out-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
  },
}

export const slideInRight = {
  '@-webkit-keyframes slide-in-right': {
    from: {
      webkitTransform: 'translateX(210px)',
      transform: 'translateX(210px)',
    },
    to: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
    },
  },
  '@keyframes slide-in-right': {
    from: {
      webkitTransform: 'translateX(210px)',
      transform: 'translateX(210px)',
    },
    to: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
    },
  },
  slideInRight: {
    webkitAnimation:
      '$slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
    animation:
      '$slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
  },
}

export const slideOutLeft = {
  '@-webkit-keyframes slide-out-left': {
    from: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
    },
    to: {
      webkitTransform: 'translateX(-210px)',
      transform: 'translateX(-200)',
    },
  },
  '@keyframes slide-out-left': {
    from: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0px)',
    },
    to: {
      webkitTransform: 'translateX(-210px)',
      transform: 'translateX(-210px)',
    },
  },
  slideOutLeft: {
    webkitAnimation:
      '$slide-out-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    animation:
      '$slide-out-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
  },
}
