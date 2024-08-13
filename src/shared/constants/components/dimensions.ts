export const dimensions = {
  topNavBar: {
    desktop: {
      height: 112, // 32 * 2 + 48,
    },
    mobile: {
      height: 72, // 16 * 2 + 40
    },
  },
  projectNavBar: {
    desktop: {
      height: 44 + 16,
    },
    mobile: {
      height: 36 + 12,
    },
  },
  animatedNavBar: {
    height: {
      base: '48px',
      lg: '60px',
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
        width: 148,
      },
    },
    rightSideNav: {
      width: '400px',
      gap: '20px',
    },
  },
  profile: {
    settings: {
      menu: {
        width: 148,
      },
    },
  },
  sideNav: {
    width: 256,
  },

  bottomNavBar: {
    desktopHeight: 60,
  },
  pullDownThreshold: 70,
  maxWidth: 1080,
}

export const derivedDimensions = {
  heightAfterTopNavBar: `calc(100vh - ${
    dimensions.topNavBar.desktop.height + dimensions.projectNavBar.desktop.height
  }px)`,
}