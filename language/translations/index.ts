import ArabicTranslations from './ar.json'
import CzechTranslations from './cz.json'
import GermanTranslations from './de.json'
import GreekTranslations from './el.json'
import EnglishTranslations from './en.json'
import SpanishTranslations from './es.json'
import FrenchTranslations from './fr.json'
import ItalianTranslations from './it.json'
import JapaneseTranslations from './ja.json'
import PolishTranslations from './pl.json'
import PortugueseTranslation from './pt.json'
import SwahiliTranslations from './sw.json'
import TurkishTranslations from './tr.json'
import ChineseTranslations from './zh.json'

const enum lng {
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

export const allTranslations = {
  [lng.ar]: ArabicTranslations,
  [lng.cz]: CzechTranslations,
  [lng.de]: GermanTranslations,
  [lng.el]: GreekTranslations,
  [lng.en]: EnglishTranslations,
  [lng.es]: SpanishTranslations,
  [lng.fr]: FrenchTranslations,
  [lng.it]: ItalianTranslations,
  [lng.ja]: JapaneseTranslations,
  [lng.pl]: PolishTranslations,
  [lng.pt]: PortugueseTranslation,
  [lng.sw]: SwahiliTranslations,
  [lng.tr]: TurkishTranslations,
  [lng.zh]: ChineseTranslations,
}

export {
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
}
