import { describe, expect, it } from 'vitest'

import {
  extractTranslationKeysFromSource,
  validateTranslationMap,
} from '../../../../../../scripts/i18n/sync-translations.mjs'

describe('sync translations script', () => {
  it('extracts static t() and Trans i18nKey values', () => {
    const source = `
      import { t } from 'i18next'
      import { Trans } from 'react-i18next'

      export const Example = () => (
        <>
          <p>{t('simple key')}</p>
          <p>{t('key with {{amount}}', { amount: 100 })}</p>
          <Trans i18nKey="key with <1>link</1>" />
        </>
      )
    `

    const result = extractTranslationKeysFromSource(source, 'Example.tsx')

    expect(result.keys.map(({ key }) => key)).toEqual([
      'simple key',
      'key with {{amount}}',
      'key with <1>link</1>',
    ])
    expect(result.dynamicKeys).toEqual([])
  })

  it('reports dynamic keys without extracting them', () => {
    const source = `
      export const Example = ({ labelKey }: { labelKey: string }) => (
        <Trans i18nKey={labelKey}>{t(labelKey)}</Trans>
      )
    `

    const result = extractTranslationKeysFromSource(source, 'Example.tsx')

    expect(result.keys).toEqual([])
    expect(result.dynamicKeys).toHaveLength(2)
    expect(result.dynamicKeys.map(({ reason }) => reason)).toEqual(['Dynamic Trans i18nKey', 'Dynamic t() key'])
  })

  it('validates interpolation and rich text markers', () => {
    const sourceMap = {
      'Amount: {{amount}}': 'Amount: {{amount}}',
      'Read <1>more</1>': 'Read <1>more</1>',
    }

    expect(
      validateTranslationMap({
        locale: 'es',
        sourceMap,
        translatedMap: {
          'Amount: {{amount}}': 'Importe: {{amount}}',
          'Read <1>more</1>': 'Leer <1>más</1>',
        },
      }),
    ).toEqual([])

    expect(
      validateTranslationMap({
        locale: 'fr',
        sourceMap,
        translatedMap: {
          'Amount: {{amount}}': 'Montant',
          'Read <1>more</1>': 'Lire plus',
        },
      }),
    ).toEqual([
      'fr: interpolation markers changed for "Amount: {{amount}}"',
      'fr: rich text markers changed for "Read <1>more</1>"',
    ])
  })
})
