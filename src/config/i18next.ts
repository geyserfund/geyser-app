import i18next from 'i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import { __development__, VITE_APP_LNG_PORT } from '@/shared/constants'

const langugePostUrl = `http://localhost:${VITE_APP_LNG_PORT}/language/{{lng}}`

i18next
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(I18nextBrowserLanguageDetector)
  .use(backend)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: Boolean(__development__),
    fallbackLng: 'en',
    saveMissing: Boolean(__development__),
    backend: {
      loadPath: '/language/translations/{{lng}}.json',
      addPath: langugePostUrl,
    },
  })

export default i18next
