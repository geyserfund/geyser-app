#!/usr/bin/env node
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import ts from 'typescript'

const DEFAULT_BASE = 'origin/main'
const DEFAULT_LOCALES = ['es', 'fr']
const DEFAULT_MODEL = 'gpt-4o-mini'
const DEFAULT_REPORT_LIMIT = 120
const TRANSLATION_DIR = path.resolve('language/translations')
const SOURCE_FILE_PATTERN = /\.(tsx?|jsx?)$/

const isStringLiteralLike = (node) =>
  ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)

const getLineAndColumn = (sourceFile, position) => {
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(position)
  return { line: line + 1, column: character + 1 }
}

const getStaticText = (node) => {
  if (!node) return undefined
  if (isStringLiteralLike(node)) return node.text
  return undefined
}

const getJsxAttributeText = (attribute) => {
  const initializer = attribute.initializer
  if (!initializer) return undefined
  if (ts.isStringLiteral(initializer)) return initializer.text
  if (ts.isJsxExpression(initializer)) return getStaticText(initializer.expression)
  return undefined
}

export const extractTranslationKeysFromSource = (source, filePath = 'unknown.tsx') => {
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith('.tsx') || filePath.endsWith('.jsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  )
  const keys = new Map()
  const dynamicKeys = []

  const addKey = (key, node) => {
    if (!key.trim()) return
    if (!keys.has(key)) {
      keys.set(key, { key, filePath, ...getLineAndColumn(sourceFile, node.getStart(sourceFile)) })
    }
  }

  const addDynamicKey = (node, reason) => {
    dynamicKeys.push({ filePath, reason, ...getLineAndColumn(sourceFile, node.getStart(sourceFile)) })
  }

  const visit = (node) => {
    if (ts.isCallExpression(node)) {
      const isTranslateCall =
        ts.isIdentifier(node.expression) && node.expression.text === 't' && node.arguments.length > 0

      if (isTranslateCall) {
        const key = getStaticText(node.arguments[0])
        if (key === undefined) {
          addDynamicKey(node.arguments[0], 'Dynamic t() key')
        } else {
          addKey(key, node.arguments[0])
        }
      }
    }

    if (ts.isJsxAttribute(node) && node.name.text === 'i18nKey') {
      const key = getJsxAttributeText(node)
      if (key === undefined) {
        addDynamicKey(node, 'Dynamic Trans i18nKey')
      } else {
        addKey(key, node)
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  return { keys: Array.from(keys.values()), dynamicKeys }
}

export const extractTranslationMarkers = (value) => {
  const interpolationMarkers = value.match(/{{\s*[-\w.]+\s*}}/g) || []
  const richTextMarkers = value.match(/<\/?\d+>/g) || []
  return {
    interpolationMarkers: interpolationMarkers.sort(),
    richTextMarkers: richTextMarkers.sort(),
  }
}

const equalMarkerSets = (left, right) =>
  left.length === right.length && left.every((marker, index) => marker === right[index])

export const validateTranslationMap = ({ sourceMap, translatedMap, locale }) => {
  const errors = []

  for (const [key, sourceValue] of Object.entries(sourceMap)) {
    const translatedValue = translatedMap[key]
    if (typeof translatedValue !== 'string') {
      errors.push(`${locale}: missing translation for "${key}"`)
      continue
    }

    if (!translatedValue.trim()) {
      errors.push(`${locale}: empty translation for "${key}"`)
      continue
    }

    const sourceMarkers = extractTranslationMarkers(sourceValue)
    const translatedMarkers = extractTranslationMarkers(translatedValue)

    if (!equalMarkerSets(sourceMarkers.interpolationMarkers, translatedMarkers.interpolationMarkers)) {
      errors.push(`${locale}: interpolation markers changed for "${key}"`)
    }

    if (!equalMarkerSets(sourceMarkers.richTextMarkers, translatedMarkers.richTextMarkers)) {
      errors.push(`${locale}: rich text markers changed for "${key}"`)
    }
  }

  return errors
}

const parseArgs = (argv) => {
  const options = {
    base: DEFAULT_BASE,
    check: false,
    write: false,
    staged: false,
    all: false,
    locales: DEFAULT_LOCALES,
  }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === '--base') {
      options.base = argv[index + 1] || DEFAULT_BASE
      index += 1
    } else if (arg === '--check') {
      options.check = true
    } else if (arg === '--write') {
      options.write = true
    } else if (arg === '--staged') {
      options.staged = true
    } else if (arg === '--all') {
      options.all = true
    } else if (arg === '--locales') {
      options.locales = (argv[index + 1] || '')
        .split(',')
        .map((locale) => locale.trim())
        .filter(Boolean)
      index += 1
    }
  }

  if (!options.write) {
    options.check = true
  }

  return options
}

const runGit = (args) => execFileSync('git', args, { encoding: 'utf8' }).trim()

const readGitFile = (ref, filePath) => {
  try {
    return execFileSync('git', ['show', `${ref}:${filePath}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
  } catch {
    return undefined
  }
}

const readStagedFile = (filePath) => {
  try {
    return execFileSync('git', ['show', `:${filePath}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
  } catch {
    return undefined
  }
}

const getCandidateFiles = (options) => {
  let files = []

  if (options.all) {
    files = runGit(['ls-files']).split('\n')
  } else if (options.staged) {
    files = runGit(['diff', '--cached', '--name-only', '--diff-filter=ACMRT']).split('\n')
  } else {
    files = runGit(['diff', '--name-only', '--diff-filter=ACMRT', `${options.base}...HEAD`]).split('\n')
  }

  return files.filter((file) => SOURCE_FILE_PATTERN.test(file) && file.startsWith('src/') && fs.existsSync(file))
}

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'))

const writeJson = (filePath, value) => {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`)
}

const collectKeys = (files, options) => {
  const keysByValue = new Map()
  const dynamicKeys = []

  for (const file of files) {
    const source = options.staged ? readStagedFile(file) : fs.readFileSync(file, 'utf8')
    if (!source) continue

    const extracted = extractTranslationKeysFromSource(source, file)
    const baseSource = options.all ? undefined : readGitFile(options.staged ? 'HEAD' : options.base, file)
    const baseKeys = new Set(
      baseSource ? extractTranslationKeysFromSource(baseSource, file).keys.map(({ key }) => key) : [],
    )

    for (const key of extracted.keys) {
      if (!baseKeys.has(key.key) && !keysByValue.has(key.key)) {
        keysByValue.set(key.key, key)
      }
    }

    dynamicKeys.push(...extracted.dynamicKeys)
  }

  return { keys: Array.from(keysByValue.values()), dynamicKeys }
}

const getMissingKeys = (keys, translations) => keys.filter(({ key }) => !(key in translations))

const getOpenAiResponseJson = async ({ locale, sourceMap, validationError }) => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error(
      'OPENAI_API_KEY is required to auto-translate missing locale keys. Set it or run i18n:check to inspect gaps.',
    )
  }

  const model = process.env.OPENAI_TRANSLATION_MODEL || process.env.OPENAI_MODEL || DEFAULT_MODEL
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: [
            'You translate concise product UI copy for Geyser, a Bitcoin crowdfunding platform.',
            'Return only a valid JSON object whose keys exactly match the provided English source keys.',
            'Preserve i18next interpolation markers like {{amount}} and rich text tags like <0>...</0> exactly.',
            'Do not translate product names such as Geyser, Bitcoin, Lightning, sats, Nostr, or Field Partner unless natural grammar requires surrounding words.',
          ].join(' '),
        },
        {
          role: 'user',
          content: JSON.stringify({
            targetLocale: locale,
            validationError,
            source: sourceMap,
          }),
        },
      ],
    }),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(`OpenAI translation request failed: ${JSON.stringify(data)}`)
  }

  const content = data?.choices?.[0]?.message?.content
  if (!content) {
    throw new Error(`OpenAI translation response did not include content: ${JSON.stringify(data)}`)
  }

  return JSON.parse(content)
}

const translateMissingKeys = async ({ locale, missingKeys, englishTranslations }) => {
  const sourceMap = Object.fromEntries(missingKeys.map(({ key }) => [key, englishTranslations[key] || key]))
  let validationError

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const translatedMap = await getOpenAiResponseJson({ locale, sourceMap, validationError })
    const errors = validateTranslationMap({ sourceMap, translatedMap, locale })

    if (errors.length === 0) {
      return translatedMap
    }

    validationError = errors.join('\n')
  }

  throw new Error(`OpenAI translation validation failed for ${locale}: ${validationError}`)
}

const printDynamicKeys = (dynamicKeys) => {
  if (dynamicKeys.length === 0) return

  const reportLimit = Number(process.env.I18N_REPORT_LIMIT || DEFAULT_REPORT_LIMIT)
  console.warn('\nDynamic translation keys were ignored:')
  for (const item of dynamicKeys.slice(0, reportLimit)) {
    console.warn(`- ${item.filePath}:${item.line}:${item.column} ${item.reason}`)
  }

  if (dynamicKeys.length > reportLimit) {
    console.warn(`... ${dynamicKeys.length - reportLimit} more dynamic key(s) ignored.`)
  }
}

const printMissingKeys = (missingByLanguage) => {
  const reportLimit = Number(process.env.I18N_REPORT_LIMIT || DEFAULT_REPORT_LIMIT)

  for (const [language, keys] of Object.entries(missingByLanguage)) {
    if (keys.length === 0) continue

    console.error(`\n${language} missing ${keys.length} translation key(s):`)
    for (const { key, filePath, line } of keys.slice(0, reportLimit)) {
      console.error(`- ${key.replace(/\n/g, '\\n')} (${filePath}:${line})`)
    }

    if (keys.length > reportLimit) {
      console.error(`... ${keys.length - reportLimit} more missing key(s).`)
    }
  }
}

const main = async () => {
  const options = parseArgs(process.argv.slice(2))
  const files = getCandidateFiles(options)

  if (files.length === 0) {
    console.log('i18n: no source files to scan.')
    return
  }

  const { keys, dynamicKeys } = collectKeys(files, options)
  printDynamicKeys(dynamicKeys)

  if (keys.length === 0) {
    console.log(`i18n: scanned ${files.length} source file(s); no new static translation keys found.`)
    return
  }

  const languages = ['en', ...options.locales]
  const translations = Object.fromEntries(
    languages.map((language) => [language, readJson(path.join(TRANSLATION_DIR, `${language}.json`))]),
  )
  const missingByLanguage = Object.fromEntries(
    languages.map((language) => [language, getMissingKeys(keys, translations[language])]),
  )
  const totalMissing = Object.values(missingByLanguage).reduce((count, missing) => count + missing.length, 0)

  if (options.check) {
    console.log(`i18n: scanned ${files.length} source file(s), found ${keys.length} new static key(s).`)
    if (totalMissing === 0) {
      console.log(`i18n: en, ${options.locales.join(', ')} translations are complete.`)
      return
    }

    printMissingKeys(missingByLanguage)
    process.exitCode = 1
    return
  }

  if (totalMissing === 0) {
    console.log(`i18n: scanned ${files.length} source file(s); translations are already complete.`)
    return
  }

  const localeMissingCount = options.locales.reduce((count, locale) => count + missingByLanguage[locale].length, 0)
  if (localeMissingCount > 0 && !process.env.OPENAI_API_KEY) {
    printMissingKeys(missingByLanguage)
    throw new Error(
      'Missing locale translations require OPENAI_API_KEY. Set it, then rerun yarn i18n:sync or yarn i18n:sync:staged.',
    )
  }

  for (const { key } of missingByLanguage.en) {
    translations.en[key] = key
  }

  for (const locale of options.locales) {
    if (missingByLanguage[locale].length === 0) continue

    const translatedMap = await translateMissingKeys({
      locale,
      missingKeys: missingByLanguage[locale],
      englishTranslations: translations.en,
    })

    for (const { key } of missingByLanguage[locale]) {
      translations[locale][key] = translatedMap[key]
    }
  }

  for (const language of languages) {
    if (missingByLanguage[language].length === 0) continue

    writeJson(path.join(TRANSLATION_DIR, `${language}.json`), translations[language])
  }

  console.log(`i18n: updated translations for ${languages.join(', ')}.`)
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isCli) {
  main().catch((error) => {
    console.error(`i18n: ${error.message}`)
    process.exit(1)
  })
}
