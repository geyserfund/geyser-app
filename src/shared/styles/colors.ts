import { darkPalette, lightPalette } from './palette'

export const neutralColorsLight = {
  0: '#FCFCFC',
  50: '#F4F4F4',
  100: '#E9ECEF',
  200: '#DEE2E6',
  300: '#CED4DA',
  400: '#ADB5BD',
  500: '#6C757D',
  600: '#495057',
  700: '#343A40',
  800: '#212529',
  900: '#141A19',
  1000: '#000000',
}

export const neutralColorsDark = {
  1000: '#FFFFFF',
  900: '#F8F9FA',
  800: '#E9ECEF',
  700: '#DEE2E6',
  600: '#ADB5BD',
  500: '#A2A5A9',
  400: '#757878',
  300: '#454646',
  200: '#282929',
  100: '#1F2020',
  50: '#121313',
  0: '#0D0D0D',
}

export const primaryColorsLight = {
  50: '#E9FFFB',
  100: '#B7FFF2',
  200: '#86FFE9',
  300: '#54FFE0',
  400: '#20ECC7',
  500: '#10CAA8',
  600: '#03A88A',
  700: '#00866D',
  800: '#006452',
  900: '#004236',
}

export const primaryColorsDark = {
  50: '#004236',
  100: '#006452',
  200: '#00866D',
  300: '#03A88A',
  400: '#20ECC7',
  500: '#2CF9D3',
  600: '#54FFE0',
  700: '#86FFE9',
  800: '#B7FFF2',
  900: '#E9FFFB',
}

export const nostrColorsLight = {
  1: '#F7E7FF',
  2: '#E3B5FF',
  3: '#EBC1FF',
  4: '#DE98FF',
  5: '#C54BFF',
  6: '#BA29FF',
  7: '#B010FD',
  8: '#9104D3',
  9: '#6F02A3',
  10: '#3A0255',
  11: '#360250',
  12: '#28023C',
}

export const nostrColorsDark = {
  1: '#28023C',
  2: '#360250',
  3: '#3A0255',
  4: '#6F02A3',
  5: '#9104D3',
  6: '#B010FD',
  7: '#BA29FF',
  8: '#C54BFF',
  9: '#CF69FF',
  10: '#DE98FF',
  11: '#EBC1FF',
  12: '#F7E7FF',
}

export const secondaryColors = {
  green: '#00E34D',
  red: '#DF3634',
  yellow: '#FFE600',
  orange: '#DD6B20',
  orangeLight: '#FB923C',
  pink: '#FC257A',
  blue: '#438FF2',
  purple: '#670C8B',
  lightPurple: '#9912CE',
}

export const socialColors = {
  twitter: '#000000',
  facebook: '#0866ff',
  google: '#4285F4',
  github: '#333333',
  nostr: '#670C8B',
  lightning: '#f89314',
}

export const socialColorsDark = {
  twitter: '#FFFFFF',
  facebook: '#0866ff',
  google: '#719DFD',
  github: '#DFDFDF',
  nostr: '#C54BFF',
  lightning: '#FDB848',
}

export const utilColors = {
  light: {
    pbg: '#FFFFFF',
    surface: '#FFFFFF',
    primarySurface: 'rgba(0, 225, 180, 0.07)',
    overlay: 'rgba(25, 21, 1, 0.29)',
    primaryContrast: '#FFFFFF',
    whiteContrast: '#FFFFFF',
    blackContrast: '#1C2024',
    text: '#21201C',
    invertText: '#FFFFFF',
  },
  dark: {
    pbg: '#111110',
    surface: '#00000040',
    primarySurface: 'rgba(0, 249, 203, 0.04)',
    overlay: 'rgba(0, 0, 0, 0.75)',
    primaryContrast: '#FFFFFF',
    whiteContrast: '#FFFFFF',
    blackContrast: '#1C2024',
    text: '#FFFFFF',
    invertText: '#21201C',
  },
}

export const panelColors = {
  light: {
    default: 'rgba(255, 255, 255, 0.8)',
    solid: '#FFFFFF',
    translucent: 'rgba(255, 255, 255, 0.8)',
  },
  dark: {
    default: 'rgba(29, 29, 33, 0.7)',
    solid: '#191918',
    translucent: 'rgba(29, 29, 33, 0.7)',
  },
}

export const overlayColors = {
  light: {
    black: {
      1: 'rgba(0, 0, 0, 0.05)',
      2: 'rgba(0, 0, 0, 0.10)',
      3: 'rgba(0, 0, 0, 0.15)',
      4: 'rgba(0, 0, 0, 0.20)',
      5: 'rgba(0, 0, 0, 0.30)',
      6: 'rgba(0, 0, 0, 0.40)',
      7: 'rgba(0, 0, 0, 0.50)',
      8: 'rgba(0, 0, 0, 0.60)',
      9: 'rgba(0, 0, 0, 0.60)',
      10: 'rgba(0, 0, 0, 0.80)',
      11: 'rgba(0, 0, 0, 0.90)',
      12: 'rgba(0, 0, 0, 0.95)',
    },
    white: {
      1: 'rgba(1,1,1,0.05)',
      2: 'rgba(1,1,1,0.10)',
      3: 'rgba(1,1,1,0.15)',
      4: 'rgba(1,1,1,0.20)',
      5: 'rgba(1,1,1,0.30)',
      6: 'rgba(1,1,1,0.40)',
      7: 'rgba(1,1,1,0.50)',
      8: 'rgba(1,1,1,0.60)',
      9: 'rgba(1,1,1,0.60)',
      10: 'rgba(1,1,1,0.80)',
      11: 'rgba(1,1,1,0.90)',
      12: 'rgba(1,1,1,0.95)',
    },
  },
  dark: {
    black: {
      1: 'rgba(0,0,0,0.05)',
      2: 'rgba(0,0,0,0.10)',
      3: 'rgba(0,0,0,0.15)',
      4: 'rgba(0,0,0,0.20)',
      5: 'rgba(0,0,0,0.30)',
      6: 'rgba(0,0,0,0.40)',
      7: 'rgba(0,0,0,0.50)',
      8: 'rgba(0,0,0,0.60)',
      9: 'rgba(0,0,0,0.60)',
      10: 'rgba(0,0,0,0.80)',
      11: 'rgba(0,0,0,0.90)',
      12: 'rgba(0,0,0,0.95)',
    },
    white: {
      1: 'rgba(1,1,1,0.05)',
      2: 'rgba(1,1,1,0.10)',
      3: 'rgba(1,1,1,0.15)',
      4: 'rgba(1,1,1,0.20)',
      5: 'rgba(1,1,1,0.30)',
      6: 'rgba(1,1,1,0.40)',
      7: 'rgba(1,1,1,0.50)',
      8: 'rgba(1,1,1,0.60)',
      9: 'rgba(1,1,1,0.60)',
      10: 'rgba(1,1,1,0.80)',
      11: 'rgba(1,1,1,0.90)',
      12: 'rgba(1,1,1,0.95)',
    },
  },
}

export const guardianLightColors = {
  WARRIOR: {
    text: '#F20046',
    button: '#F20046 ',
  },
  KNIGHT: {
    text: '#4A4C8F',
    button: '#4A4C8F',
  },
  KING: {
    text: '#D08D02',
    button: '#D08D02',
  },
  LEGEND: {
    text: '#00807E ',
    button: '#00807E',
  },
  background: '#FDFDFC',
  successText: '#007D6C',
  text: '#377E7D',
  textBackground: 'rgba(72, 201, 185, 0.10)',
}

export const guardianDarkColors = {
  WARRIOR: {
    text: '#7BA3E5',
    button: '#2F4663 ',
  },
  KNIGHT: {
    text: '#7A7DE5',
    button: '#4A4C8F',
  },
  KING: {
    text: '#D99E36',
    button: '#D08D02',
  },
  LEGEND: {
    text: '#59CCCA',
    button: '#00807E',
  },
  background: '#21201C',
  successText: '#00E0C3',
  text: '#377E7D',
  textBackground: 'rgba(72, 201, 185, 0.10)',
}

export const lightModeColors = {
  primary: primaryColorsLight,
  neutral: neutralColorsLight,
  brand: primaryColorsLight,
  nostr: nostrColorsLight,
  secondary: secondaryColors,
  social: socialColors,

  primary1: lightPalette.geyser,
  primaryAlpha: lightPalette.geyserAlpha,
  neutral1: lightPalette.sand,
  neutralAlpha: lightPalette.sandAlpha,
  error: lightPalette.red,
  success: lightPalette.lime,
  warning: lightPalette.amber,
  info: lightPalette.sky,

  utils: utilColors.light,
  panel: panelColors.light,
  overlay: overlayColors.light,

  guardians: guardianLightColors,

  ...lightPalette,
}

export const darkModeColors = {
  primary: primaryColorsDark,
  neutral: neutralColorsDark,
  brand: primaryColorsDark,
  nostr: nostrColorsDark,
  secondary: secondaryColors,
  social: socialColorsDark,

  primary1: darkPalette.geyser,
  primaryAlpha: darkPalette.geyserAlpha,
  neutral1: darkPalette.sand,
  neutralAlpha: darkPalette.sandAlpha,
  error: darkPalette.red,
  success: darkPalette.lime,
  warning: darkPalette.amber,
  info: darkPalette.sky,

  utils: utilColors.dark,
  panel: panelColors.dark,
  overlay: overlayColors.dark,

  guardians: guardianDarkColors,

  ...darkPalette,
}
