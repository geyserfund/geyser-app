import { dimensions } from '../constants'

export const discoveryPageCommonLayoutStyles = {
  paddingLeft: {
    base: 0,
    lg: dimensions.discovery.sideNav.tablet.width,
    xl: dimensions.discovery.sideNav.desktop.width,
  },
  paddingRight: {
    base: 0,
    '2xl': `${dimensions.discovery.sideNav.desktop.width - 150}px`,
    '3xl': `${dimensions.discovery.sideNav.desktop.width - 75}px`,
    '4xl': dimensions.discovery.sideNav.desktop.width,
  },
}
