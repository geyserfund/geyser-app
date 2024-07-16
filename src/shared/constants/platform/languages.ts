export enum lng {
  en = 'en',
  es = 'es',
  pt = 'pt',
  de = 'de',
  it = 'it',
  el = 'el',
  pl = 'pl',
  fr = 'fr',
  cz = 'cz',
  zh = 'zh',
  ar = 'ar',
  sw = 'sw',
  tr = 'tr',
  ja = 'ja',
}

/**
 * Unvailable lanaugaes are commented out, uncomment as they get available
 * TODO: add dynamic languae selection based on completion
 */

export const languages = {
  [lng.en]: 'English',
  [lng.es]: 'Spanish',
  [lng.pt]: 'Portuguese-BR',
  [lng.fr]: 'French',
  [lng.de]: 'German',
  [lng.it]: 'Italian',
  [lng.el]: 'Greek',
  [lng.pl]: 'Polish',
  [lng.cz]: 'Czech',
  [lng.zh]: 'Chinese',
  [lng.ar]: 'Arabic',
  [lng.sw]: 'Swahili',
  [lng.tr]: 'Turkish',
  [lng.ja]: 'Japanese',
} as { [key: string]: string }

export const languageFalgs = {
  [lng.en]: '🇬🇧',
  [lng.es]: '🇪🇸',
  [lng.pt]: '🇧🇷',
  [lng.fr]: '🇫🇷',
  [lng.de]: '🇩🇪',
  [lng.it]: '🇮🇹',
  [lng.el]: '🇬🇷',
  [lng.pl]: '🇵🇱',
  [lng.cz]: '🇨🇿',
  [lng.zh]: '🇨🇳',
  [lng.ar]: '🇵🇸',
  [lng.sw]: '🇰🇪',
  [lng.tr]: '🇹🇷',
  [lng.ja]: '🇯🇵',
} as { [key: string]: string }
