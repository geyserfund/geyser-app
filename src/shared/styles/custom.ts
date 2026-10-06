import { brandColors } from './brandPalette.ts'

export const BrandCreamGradient = `linear-gradient(85deg, ${brandColors.sageTint} 0%, ${brandColors.warmParchment} 100%)`

export const SuccessImageBackgroundGradient = `linear-gradient(81deg, ${brandColors.sageTint} -9.6%, ${brandColors.warmParchment} 120.2%)`
export const GuardiansButtonBackgroundGradient =
  'linear-gradient(90deg, rgba(0, 199, 173, 0.10) 0%, rgba(237, 160, 0, 0.10) 52.08%, rgba(251, 136, 118, 0.10) 100%);'
export const GuardiansButtonBackgroundGradientBright =
  'linear-gradient(90deg, rgba(0, 199, 173, 1) 0%, rgba(237, 160, 0, 1) 52.08%, rgba(251, 136, 118, 1) 100%)'

export const TitleHeaderGradient = `linear-gradient(81deg, ${brandColors.warmParchment} -9.6%, ${brandColors.sageTint} 109.2%)`

/** Burnt ochre is the rare accent (see DESIGN.md); the label on it stays dark. */
export const NewBadgeGradient = brandColors.burntOchre
