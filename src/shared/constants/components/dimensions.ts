export const dimensions = {
  topNavBar: {
    desktop: {
      height: 112, // 32 * 2 + 48,
    },
    mobile: {
      height: 80, // 20 * 2 + 40
    },
  },
  topNavBarFilterOffset: {
    desktop: {
      height: 0, // no filter component row for desktop
    },
    mobile: {
      height: 60, // 40 (fitler component) + 20 ( spacing)
    },
  },
  projectNavBar: {
    desktop: {
      height: 44 + 16,
    },
    mobile: {
      height: 44 + 16,
    },
  },
  animatedNavBar: {
    height: {
      base: 44,
      lg: 44,
    },
  },
  project: {
    rewards: {
      view: {
        maxWidth: 586,
      },
    },
    posts: {
      view: {
        maxWidth: 636,
      },
    },
    goals: {
      view: {
        maxWidth: 586,
      },
    },
    dashboard: {
      menu: {
        width: 165,
      },
    },
    leftMainContainer: {
      width: '658px',
    },
    rightSideNav: {
      width: '400px',
      gap: '20px',
    },
    header: {
      maxHeight: '369px',
    },
  },
  profile: {
    sideNav: {
      width: '400px',
      gap: '20px',
    },
    settings: {
      menu: {
        width: 148,
      },
    },
  },
  mobileSideNav: {
    width: 256,
  },

  bottomNavBar: {
    desktopHeight: 77,
  },
  discovery: {
    sideNav: {
      tablet: {
        width: 83,
      },
      desktop: {
        width: 225,
      },
    },
  },
  guardians: {
    maxWidth: '1920px',
    textMaxWidth: '1200px',
  },

  pullDownThreshold: 70,
  maxWidth: 1080,
}

export const derivedDimensions = {
  heightAfterTopNavBar: `calc(100vh - ${
    dimensions.topNavBar.desktop.height + dimensions.projectNavBar.desktop.height
  }px)`,
}
