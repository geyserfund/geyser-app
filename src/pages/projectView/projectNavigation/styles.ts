export const slideInLeftProjectSidebar = {
  '@-webkit-keyframes slide-in-left-project-side-bar': {
    from: {
      webkitTransform: 'translateX(-500px)',
      transform: 'translateX(-500px)',
      opacity: 0,
    },
    to: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
      opacity: 1,
    },
  },
  '@keyframes slide-in-left-project-side-bar': {
    from: {
      webkitTransform: 'translateX(-500px)',
      transform: 'translateX(-500px)',
      opacity: 0,
    },
    to: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
      opacity: 1,
    },
  },
  slideInLeftProjectSidebar: {
    webkitAnimation:
      '$slide-in-left-project-side-bar 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    animation:
      '$slide-in-left-project-side-bar 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
  },
}

export const slideOutRightBody = {
  '@-webkit-keyframes slide-out-right-body': {
    from: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
    },
    to: {
      webkitTransform: 'translateX(200px)',
      transform: 'translateX(200px)',
    },
  },
  '@keyframes slide-out-right-body': {
    from: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
    },
    to: {
      webkitTransform: 'translateX(200px)',
      transform: 'translateX(200px)',
    },
  },
  slideOutRightBody: {
    webkitAnimation:
      '$slide-out-right-body 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
    animation:
      '$slide-out-right-body 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
  },
}

export const slideBackInRightBody = {
  '@-webkit-keyframes slide-back-in-right-body': {
    from: {
      webkitTransform: 'translateX(200px)',
      transform: 'translateX(200px)',
    },
    to: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
    },
  },
  '@keyframes slide-back-in-right-body': {
    from: {
      webkitTransform: 'translateX(200px)',
      transform: 'translateX(200px)',
    },
    to: {
      webkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
    },
  },
  slideBackInRightBody: {
    webkitAnimation:
      '$slide-back-in-right-body 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
    animation:
      '$slide-back-in-right-body 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
  },
}
