import i18next from 'i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { lng } from '../shared/constants'
import {
  ArabicTranslations,
  ChineseTranslations,
  CzechTranslations,
  EnglishTranslations,
  FrenchTranslations,
  GermanTranslations,
  GreekTranslations,
  ItalianTranslations,
  JapaneseTranslations,
  PolishTranslations,
  PortugueseTranslation,
  SpanishTranslations,
  SwahiliTranslations,
  TurkishTranslations,
} from '../translations'

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
    resources: {
      [lng.en]: {
        translation: EnglishTranslations,
      },

      [lng.fr]: {
        translation: FrenchTranslations,
      },
      [lng.de]: {
        translation: GermanTranslations,
      },
      [lng.it]: {
        translation: ItalianTranslations,
      },
      [lng.el]: {
        translation: GreekTranslations,
      },
      [lng.pl]: {
        translation: PolishTranslations,
      },
      [lng.cz]: {
        translation: CzechTranslations,
      },
      [lng.zh]: {
        translation: ChineseTranslations,
      },
      [lng.es]: {
        translation: SpanishTranslations,
      },
      [lng.pt]: {
        translation: PortugueseTranslation,
      },
      [lng.ar]: {
        translation: ArabicTranslations,
      },
      [lng.sw]: {
        translation: SwahiliTranslations,
      },
      [lng.tr]: {
        translation: TurkishTranslations,
      },
      [lng.ja]: {
        translation: JapaneseTranslations,
      },
    },
  })

export default i18next
