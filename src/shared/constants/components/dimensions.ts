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
        maxWidth: 538,
      },
    },
    posts: {
      view: {
        maxWidth: 636,
      },
    },
    dashboard: {
      menu: {
        width: 165,
      },
    },
    rightSideNav: {
      width: '400px',
      gap: '20px',
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
    desktopHeight: 60,
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

  pullDownThreshold: 70,
  maxWidth: 1080,
}

export const derivedDimensions = {
  heightAfterTopNavBar: `calc(100vh - ${
    dimensions.topNavBar.desktop.height + dimensions.projectNavBar.desktop.height
  }px)`,
}
