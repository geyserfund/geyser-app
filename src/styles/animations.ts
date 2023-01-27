export const slideInRight = {
  '@-webkit-keyframes slide-in-right': {
    from: {
      webkitTransform: 'translateX(1000px)',
      transform: 'translateX(1000px)',
      opacity: 0,
    },
    to: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
      opacity: 1,
    },
  },
  '@keyframes slide-in-right': {
    from: {
      webkitTransform: 'translateX(1000px)',
      transform: 'translateX(1000px)',
      opacity: 0,
    },
    to: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
      opacity: 1,
    },
  },
  slideInRight: {
    webkitAnimation:
      '$slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    animation:
      '$slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
  },
}

export const slideInLeft = {
  '@-webkit-keyframes slide-in-left': {
    from: {
      webkitTransform: 'translateX(-1000px)',
      transform: 'translateX(-1000px)',
      opacity: 0,
    },
    to: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
      opacity: 1,
    },
  },
  '@keyframes slide-in-left': {
    from: {
      webkitTransform: 'translateX(-1000px)',
      transform: 'translateX(-1000px)',
      opacity: 0,
    },
    to: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
      opacity: 1,
    },
  },
  slideInLeft: {
    webkitAnimation:
      '$slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    animation:
      '$slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
  },
}

export const slideInLeftDynamic = (distance: number, time: number) => ({
  '@-webkit-keyframes slide-in-left-dynamic': {
    from: {
      webkitTransform: `translateX(-${distance}px)`,
      transform: `translateX(-${distance}px)`,
      opacity: 0,
    },
    to: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
      opacity: 1,
    },
  },
  '@keyframes slide-in-left-dynamic': {
    from: {
      webkitTransform: `translateX(-${distance}px)`,
      transform: `translateX(-${distance}px)`,
      opacity: 0,
    },
    to: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
      opacity: 1,
    },
  },
  slideInLeftDynamic: {
    webkitAnimation: `$slide-in-left-dynamic ${time}s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
    animation: `$slide-in-left-dynamic ${time}s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
  },
})

export const slideOutRight = {
  '@-webkit-keyframes slide-out-right': {
    from: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
      opacity: 1,
    },
    to: {
      webkitTransform: 'translateX(1000px)',
      transform: 'translateX(1000px)',
      opacity: 0,
    },
  },
  '@keyframes slide-out-right': {
    from: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
      opacity: 1,
    },
    to: {
      webkitTransform: 'translateX(1000px)',
      transform: 'translateX(1000px)',
      opacity: 0,
    },
  },
  slideOutRight: {
    webkitAnimation:
      '$slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
    animation:
      '$slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
  },
}

export const slideOutRightDynamic = (distance: number, time: number) => ({
  '@-webkit-keyframes slide-out-right-dynamic': {
    from: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
      opacity: 1,
    },
    to: {
      webkitTransform: `translateX(${distance}px)`,
      transform: `translateX(${distance}px)`,
      opacity: 0,
    },
  },
  '@keyframes slide-out-right-dynamic': {
    from: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
      opacity: 1,
    },
    to: {
      webkitTransform: `translateX(${distance}px)`,
      transform: `translateX(${distance}px)`,
      opacity: 0,
    },
  },
  slideOutRightDynamic: {
    webkitAnimation: `$slide-out-right-dynamic ${time}s cubic-bezier(0.550, 0.085, 0.680, 0.530) both`,
    animation: `$slide-out-right-dynamic ${time}s cubic-bezier(0.550, 0.085, 0.680, 0.530) both`,
  },
})

export const slideOutLeft = {
  '@-webkit-keyframes slide-out-left': {
    from: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
      opacity: 1,
    },
    to: {
      webkitTransform: 'translateX(-1000px)',
      transform: 'translateX(-1000px)',
      opacity: 0,
    },
  },
  '@keyframes slide-out-left': {
    from: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
      opacity: 1,
    },
    to: {
      webkitTransform: 'translateX(-1000px)',
      transform: 'translateX(-1000px)',
      opacity: 0,
    },
  },
  slideOutLeft: {
    webkitAnimation:
      '$slide-out-left 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
    animation:
      '$slide-out-left 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
  },
}

export const fadeOut = {
  '@-webkit-keyframes fade-out': {
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
  },
  '@keyframes fade-out': {
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
  },
  fadeOut: {
    webkitAnimation: '$fade-out 0.5s ease-out both',
    animation: '$fade-out 0.5s ease-out both',
  },
}

export const fadeIn = {
  '@-webkit-keyframes fade-in': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
  '@keyframes fade-in': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
  fadeIn: {
    webkitAnimation: '$fade-in 0.5s ease-out both',
    animation: '$fade-in 0.5s ease-out both',
  },
}

export const slideUpBottomDynamic = (distance: number, time: number) => ({
  '@-webkit-keyframes slide-up-bottom-dynamic': {
    from: {
      webkitTransform: `translateY(${distance}px)`,
      transform: `translateY(${distance}px)`,
      opacity: 0,
    },
    to: {
      webkitTransform: 'translateY(0)',
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
  '@keyframes slide-up-bottom-dynamic': {
    from: {
      webkitTransform: `translateY(${distance}px)`,
      transform: `translateY(${distance}px)`,
      opacity: 0,
    },
    to: {
      webkitTransform: 'translateY(0)',
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
  slideOutRightDynamic: {
    webkitAnimation: `$slide-up-bottom-dynamic ${time}s cubic-bezier(0.550, 0.085, 0.680, 0.530) both`,
    animation: `$slide-up-bottom-dynamic ${time}s cubic-bezier(0.550, 0.085, 0.680, 0.530) both`,
  },
})
