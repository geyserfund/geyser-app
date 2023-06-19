import i18next from 'i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { EnglishTranslations, SpanishTranslations } from '../translations'

i18next
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(I18nextBrowserLanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      [lng.en]: {
        translation: EnglishTranslations,
      },
      [lng.es]: {
        translation: SpanishTranslations,
      },
      [lng.pt]: {
        translation: SpanishTranslations,
      },
      [lng.de]: {
        translation: SpanishTranslations,
      },
      [lng.nl]: {
        translation: SpanishTranslations,
      },
      [lng.it]: {
        translation: SpanishTranslations,
      },
      [lng.el]: {
        translation: SpanishTranslations,
      },
      [lng.pl]: {
        translation: SpanishTranslations,
      },
      [lng.ng]: {
        translation: SpanishTranslations,
      },
    },
  })
  .then((value) => {
    console.log(value)
  })

export default i18next
