import i18next from 'i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import { __development__, VITE_APP_LNG_PORT } from '@/shared/constants'

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
} from '../../language/translations'
import { lng } from '../shared/constants'

const languagePostUrl = `http://localhost:${VITE_APP_LNG_PORT}/language/{{lng}}`

const initOptions = __development__
  ? {
      fallbackLng: 'en',
      debug: true,
      saveMissing: true,
      backend: {
        loadPath: '/language/translations/{{lng}}.json',
        addPath: languagePostUrl,
      },
    }
  : {
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
    }

i18next
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(I18nextBrowserLanguageDetector)
  .use(backend)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init(initOptions)

export default i18next
