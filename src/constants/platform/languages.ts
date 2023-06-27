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
