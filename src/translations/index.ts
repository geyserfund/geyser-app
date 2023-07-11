import { lng } from '../constants'
import ArabicTranslations from './Arabic.json'
import ChineseTranslations from './Chinese.json'
import NigerianTranslations from './Czech.json'
import CzechTranslations from './Czech.json'
import EnglishTranslations from './English.json'
import FrenchTranslations from './French.json'
import GermanTranslations from './German.json'
import GreekTranslations from './Greek.json'
import ItalianTranslations from './Italian.json'
import PolishTranslations from './Polish.json'
import PortugueseTranslation from './Portuguese.json'
import SpanishTranslations from './Spanish.json'

export const allTranslations = {
  [lng.ar]: ArabicTranslations,
  [lng.zh]: ChineseTranslations,
  [lng.cz]: CzechTranslations,
  [lng.en]: EnglishTranslations,
  [lng.fr]: FrenchTranslations,
  [lng.de]: GermanTranslations,
  [lng.el]: GreekTranslations,
  [lng.it]: ItalianTranslations,
  [lng.pl]: PolishTranslations,
  [lng.pt]: PortugueseTranslation,
  [lng.es]: SpanishTranslations,
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
  NigerianTranslations,
  PolishTranslations,
  PortugueseTranslation,
  SpanishTranslations,
}
