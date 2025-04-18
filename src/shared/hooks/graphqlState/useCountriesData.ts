import { useSetAtom } from 'jotai'

import { countriesAtom } from '@/shared/state/countriesAtom.ts'
import { useProjectCountriesGetQuery } from '@/types/index.ts'

export const useCountriesData = () => {
  const setCountries = useSetAtom(countriesAtom)
  const { data } = useProjectCountriesGetQuery()

  const countries = data?.projectCountriesGet.map((country) => country.country)

  setCountries(countries ?? [])
}
