export enum lng {
  en = 'en',
  es = 'es',
  pt = 'pt',
  de = 'de',
  nl = 'nl',
  it = 'it',
  el = 'el',
  pl = 'pl',
  ng = 'ng',
}

export const languages = {
  [lng.en]: 'English',
  [lng.es]: 'Español',
  [lng.pt]: 'Português',
  [lng.de]: 'Deutsch',
  [lng.nl]: 'Nederlands',
  [lng.it]: 'Italiano',
  [lng.el]: 'Ελληνικά',
  [lng.pl]: 'Polski',
  [lng.ng]: 'Nigerian',
} as { [key: string]: string }
