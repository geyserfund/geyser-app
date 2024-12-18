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
    webkitAnimation: '$slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    animation: '$slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
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
    webkitAnimation: '$slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    animation: '$slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
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
    webkitAnimation: '$slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
    animation: '$slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
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
    webkitAnimation: '$slide-out-left 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
    animation: '$slide-out-left 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
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
    webkitAnimation: '$fade-out 0.2s ease-out both',
    animation: '$fade-out 0.2s ease-out both',
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
    webkitAnimation: '$fade-in 0.2s ease-out both',
    animation: '$fade-in 0.2s ease-out both',
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

export const flipInRight = {
  '@-webkit-keyframes flip-in-ver-right': {
    from: {
      webkitTransform: 'rotateY(-80deg)',
      transform: 'rotateY(-80deg)',
      opacity: 0,
    },
    to: {
      webkitTransform: 'rotateY(0)',
      transform: 'rotateY(0)',
      opacity: 1,
    },
  },
  '@keyframes flip-in-ver-right': {
    from: {
      webkitTransform: 'rotateY(-80deg)',
      transform: 'rotateY(-80deg)',
      opacity: 0,
    },
    to: {
      webkitTransform: 'rotateY(0)',
      transform: 'rotateY(0)',
      opacity: 1,
    },
  },
  flipInVerticalRight: {
    webkitAnimation: '$flip-in-ver-right 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    animation: '$flip-in-ver-right 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
  },
}

export const flipOutRight = {
  '@-webkit-keyframes flip-out-ver-right': {
    from: {
      webkitTransform: 'rotateY(0)',
      transform: 'rotateY(0)',
      opacity: 1,
    },
    to: {
      webkitTransform: 'rotateY(70deg)',
      transform: 'rotateY(70deg)',
      opacity: 0,
    },
  },
  '@keyframes flip-out-ver-right': {
    from: {
      webkitTransform: 'rotateY(0)',
      transform: 'rotateY(0)',
      opacity: 1,
    },
    to: {
      webkitTransform: 'rotateY(70deg)',
      transform: 'rotateY(70deg)',
      opacity: 0,
    },
  },
  flipOutVerticalRight: {
    webkitAnimation: '$flip-out-ver-right 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
    animation: '$flip-out-ver-right 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
  },
}

export const SlideInFrontLeft = {
  '@-webkit-keyframes slide-in-front-left': {
    from: {
      webkitTransform: `translateX(0)`,
      transform: `translateX(0)`,
      opacity: 0.2,
    },
    to: {
      webkitTransform: `translateX(-48%)`,
      transform: `translateX(-48%)`,
      opacity: 1,
    },
  },
  '@keyframes slide-in-front-left': {
    from: {
      webkitTransform: `translateX(0)`,
      transform: `translateX(0)`,
      opacity: 0.2,
    },
    to: {
      webkitTransform: `translateX(-48%)`,
      transform: `translateX(-48%)`,
      opacity: 1,
    },
  },
  slideInFrontLeft: {
    webkitAnimation: '$slide-in-front-left 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    animation: '$slide-in-front-left 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
  },
}

export const SlideInFrontRight = {
  '@-webkit-keyframes slide-in-front-right': {
    from: {
      webkitTransform: `translateX(0)`,
      transform: `translateX(0)`,
      opacity: 0.2,
    },
    to: {
      webkitTransform: `translateX(48%)`,
      transform: `translateX(48%)`,
      opacity: 1,
    },
  },
  '@keyframes slide-in-front-right': {
    from: {
      webkitTransform: `translateX(0)`,
      transform: `translateX(0)`,
      opacity: 0.2,
    },
    to: {
      webkitTransform: `translateX(48%)`,
      transform: `translateX(48%)`,
      opacity: 1,
    },
  },
  slideInFrontRight: {
    webkitAnimation: '$slide-in-front-right 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    animation: '$slide-in-front-right 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
  },
}

export const SlideOutBackLeft = {
  '@-webkit-keyframes slide-out-back-left': {
    from: {
      webkitTransform: `translateX(0)`,
      transform: `translateX(0)`,
      opacity: 1,
    },
    to: {
      webkitTransform: `translateX(-48%)`,
      transform: `translateX(-48%)`,
      opacity: 0.2,
    },
  },
  '@keyframes slide-out-back-left': {
    from: {
      webkitTransform: `translateX(0)`,
      transform: `translateX(0)`,
      opacity: 1,
    },
    to: {
      webkitTransform: `translateX(-48%)`,
      transform: `translateX(-48%)`,
      opacity: 0.2,
    },
  },
  slideOutBackLeft: {
    webkitAnimation: '$slide-out-back-left 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    animation: '$slide-out-back-left 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
  },
}

export const SlideOutBackRight = {
  '@-webkit-keyframes slide-out-back-right': {
    from: {
      webkitTransform: `translateX(0)`,
      transform: `translateX(0)`,
      opacity: 1,
    },
    to: {
      webkitTransform: `translateX(48%)`,
      transform: `translateX(48%)`,
      opacity: 0.2,
    },
  },
  '@keyframes slide-out-back-right': {
    from: {
      webkitTransform: `translateX(0)`,
      transform: `translateX(0)`,
      opacity: 1,
    },
    to: {
      webkitTransform: `translateX(48%)`,
      transform: `translateX(48%)`,
      opacity: 0.2,
    },
  },
  slideOutBackRight: {
    webkitAnimation: '$slide-out-back-right 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    animation: '$slide-out-back-right 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
  },
}

export const fadeOut20Percent = {
  '@-webkit-keyframes fade-out-20-percent': {
    from: {
      opacity: 0.2,
    },
    to: {
      opacity: 0,
    },
  },
  '@keyframes fade-out-20-percent': {
    from: {
      opacity: 0.2,
    },
    to: {
      opacity: 0,
    },
  },
  fadeOut20Percent: {
    webkitAnimation: '$fade-out-20-percent 0.2s ease-out both',
    animation: '$fade-out-20-percent 0.2s ease-out both',
  },
}

export const fadeIn20Percent = {
  '@-webkit-keyframes fade-in-20-percent': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 0.2,
    },
  },
  '@keyframes fade-in-20-percent': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 0.2,
    },
  },
  fadeIn20Percent: {
    webkitAnimation: '$fade-in-20-percent 0.2s ease-out both',
    animation: '$fade-in-20-percent 0.2s ease-out both',
  },
}

export const scaleUp = {
  '@-webkit-keyframes scaleInVerBottom': {
    '0%': {
      WebkitTransform: 'scaleY(0)',
      transform: 'scaleY(0)',
      WebkitTransformOrigin: '0% 100%',
      transformOrigin: '0% 100%',
    },
    '100%': {
      WebkitTransform: 'scaleY(1)',
      transform: 'scaleY(1)',
      WebkitTransformOrigin: '0% 100%',
      transformOrigin: '0% 100%',
    },
  },
  '@keyframes scaleInVerBottom': {
    '0%': {
      WebkitTransform: 'scaleY(0)',
      transform: 'scaleY(0)',
      WebkitTransformOrigin: '0% 100%',
      transformOrigin: '0% 100%',
    },
    '100%': {
      WebkitTransform: 'scaleY(1)',
      transform: 'scaleY(1)',
      WebkitTransformOrigin: '0% 100%',
      transformOrigin: '0% 100%',
    },
  },
  scaleInVerBottom: {
    WebkitAnimation: '$scaleInVerBottom 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    animation: '$scaleInVerBottom 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
  },
}

export const scaleDown = {
  '@-webkit-keyframes scaleOutVerBottom': {
    '0%': {
      WebkitTransform: 'scaleY(1)',
      transform: 'scaleY(1)',
      WebkitTransformOrigin: '0% 100%',
      transformOrigin: '0% 100%',
    },
    '100%': {
      WebkitTransform: 'scaleY(0)',
      transform: 'scaleY(0)',
      WebkitTransformOrigin: '0% 100%',
      transformOrigin: '0% 100%',
    },
  },
  '@keyframes scaleOutVerBottom': {
    '0%': {
      WebkitTransform: 'scaleY(1)',
      transform: 'scaleY(1)',
      WebkitTransformOrigin: '0% 100%',
      transformOrigin: '0% 100%',
    },
    '100%': {
      WebkitTransform: 'scaleY(0)',
      transform: 'scaleY(0)',
      WebkitTransformOrigin: '0% 100%',
      transformOrigin: '0% 100%',
    },
  },
  scaleOutVerBottom: {
    WebkitAnimation: '$scaleOutVerBottom 0.2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
    animation: '$scaleOutVerBottom 0.2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
  },
}
