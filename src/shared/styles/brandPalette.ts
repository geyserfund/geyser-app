/**
 * Geyser brand palette for the grassroots / Circular Grants identity (see DESIGN.md).
 * Twelve-step scales follow the same convention as the Radix palettes in `palette.ts`:
 * 1-2 backgrounds, 3-5 component fills, 6-8 borders, 9-10 solid fills, 11-12 text.
 */

export const brandColors = {
  deepForest: '#26483D',
  deepForestPressed: '#1D382F',
  warmParchment: '#F4EFE4',
  parchmentRaised: '#FBF8F1',
  charcoalBrown: '#292925',
  burntOchre: '#D98A3D',
  clayTerracotta: '#B9644A',
  sage: '#9DAF91',
  sageTint: '#DCE4D6',
} as const

export const forestLight = {
  '1': '#f8faf8',
  '2': '#f1f5f2',
  '3': '#e3ebe5',
  '4': '#d3dfd7',
  '5': '#c1d1c6',
  '6': '#abbfb2',
  '7': '#8fa898',
  '8': '#6b8a78',
  '9': brandColors.deepForest,
  '10': brandColors.deepForestPressed,
  '11': brandColors.deepForest,
  '12': '#14261f',
}

export const forestAlphaLight = {
  '1': 'rgba(38, 72, 61, 0.03)',
  '2': 'rgba(38, 72, 61, 0.06)',
  '3': 'rgba(38, 72, 61, 0.12)',
  '4': 'rgba(38, 72, 61, 0.2)',
  '5': 'rgba(38, 72, 61, 0.28)',
  '6': 'rgba(38, 72, 61, 0.38)',
  '7': 'rgba(38, 72, 61, 0.52)',
  '8': 'rgba(38, 72, 61, 0.68)',
  '9': brandColors.deepForest,
  '10': brandColors.deepForestPressed,
  '11': brandColors.deepForest,
  '12': '#14261f',
}

export const forestDark = {
  '1': '#0e1512',
  '2': '#131c18',
  '3': '#182a23',
  '4': '#1c352c',
  '5': '#214035',
  '6': '#284d40',
  '7': '#315e4e',
  '8': '#3c735f',
  '9': '#8fbfa6',
  '10': '#a3cdb6',
  '11': '#9fcdb8',
  '12': '#d6ebe0',
}

export const forestAlphaDark = {
  '1': 'rgba(143, 191, 166, 0.03)',
  '2': 'rgba(143, 191, 166, 0.06)',
  '3': 'rgba(143, 191, 166, 0.12)',
  '4': 'rgba(143, 191, 166, 0.18)',
  '5': 'rgba(143, 191, 166, 0.24)',
  '6': 'rgba(143, 191, 166, 0.32)',
  '7': 'rgba(143, 191, 166, 0.42)',
  '8': 'rgba(143, 191, 166, 0.55)',
  '9': '#8fbfa6',
  '10': '#a3cdb6',
  '11': '#9fcdb8',
  '12': '#d6ebe0',
}

/** Hero overlay shared by photo heroes: solid Deep Forest to 45%, faded out by 65% (see DESIGN.md). */
export const heroForestOverlayGradient = `linear-gradient(
  90deg,
  ${brandColors.deepForest} 0%,
  ${brandColors.deepForest} 45%,
  rgba(38, 72, 61, 0) 65%
)`
