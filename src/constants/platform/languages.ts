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
  'ar' = 'ar',
}

/**
 * Unvailable lanaugaes are commented out, uncomment as they get available
 * TODO: add dynamic languae selection based on completion
 */

export const languages = {
  [lng.en]: 'English',
  [lng.es]: 'Spanish',
  [lng.pt]: 'Portuguese',
  [lng.fr]: 'French',
  [lng.de]: 'German',
  [lng.it]: 'Italian',
  [lng.el]: 'Greek',
  [lng.pl]: 'Polish',
  [lng.cz]: 'Czech',
  [lng.zh]: 'Chinese',
  [lng.ar]: 'Arabic',
} as { [key: string]: string }
