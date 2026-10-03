/** URL `region` value used to filter Circular Grant projects to Africa. */
export const AFRICA_REGION_FILTER = 'Africa'

/** URL `region` value used to filter Circular Grant projects to the Latin America Field Partner network. */
export const LATIN_AMERICA_REGION_FILTER = 'Latin America'

/** Countries covered by the LABIF / Latin America Field Partner network. */
export const LATIN_AMERICA_COUNTRY_CODES = [
  'AR',
  'BO',
  'BR',
  'BZ',
  'CL',
  'CO',
  'CR',
  'EC',
  'GF',
  'GT',
  'GY',
  'HN',
  'MX',
  'NI',
  'PA',
  'PE',
  'PY',
  'SR',
  'SV',
  'UY',
  'VE',
  'AI',
  'AG',
  'AW',
  'BS',
  'BB',
  'VG',
  'KY',
  'CU',
  'CW',
  'DM',
  'DO',
  'FK',
  'GD',
  'GP',
  'HT',
  'JM',
  'MQ',
  'MS',
  'AN',
  'PR',
  'KN',
  'LC',
  'VC',
  'TT',
  'TC',
  'VI',
] as const

/** Maps a projects-view `region` query value to the GraphQL geo filter. */
export const getCircularGrantGeoWhere = (region?: string) => {
  if (region === LATIN_AMERICA_REGION_FILTER) {
    return { countryCodes: [...LATIN_AMERICA_COUNTRY_CODES] }
  }

  if (region) {
    return { region }
  }

  return {}
}
