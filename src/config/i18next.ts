import i18next from 'i18next'
// import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { lng } from '../constants'
import {
  EnglishTranslations,
  // ArabicTranslations,
  // ChineseTranslations,
  // CzechTranslations,
  // FrenchTranslations,
  // GermanTranslations,
  // GreekTranslations,
  // ItalianTranslations,
  // PolishTranslations,
  // PortugueseTranslation,
  // SpanishTranslations,
} from '../translations'

i18next
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(I18nextBrowserLanguageDetector)
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
      // [lng.es]: {
      //   translation: SpanishTranslations,
      // },
      // [lng.pt]: {
      //   translation: PortugueseTranslation,
      // },
      // [lng.fr]: {
      //   translation: FrenchTranslations,
      // },
      // [lng.de]: {
      //   translation: GermanTranslations,
      // },
      // [lng.it]: {
      //   translation: ItalianTranslations,
      // },
      // [lng.el]: {
      //   translation: GreekTranslations,
      // },
      // [lng.pl]: {
      //   translation: PolishTranslations,
      // },
      // [lng.cz]: {
      //   translation: CzechTranslations,
      // },
      // [lng.zh]: {
      //   translation: ChineseTranslations,
      // },
      // [lng.ar]: {
      //   translation: ArabicTranslations,
      // },
    },
  })
  .then((value) => {
    console.log(value)
  })

export default i18next
