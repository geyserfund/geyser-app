import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { countriesAtom, countriesLoadingAtom } from '@/shared/state/countriesAtom.ts'
import { useProjectCountriesGetQuery } from '@/types/index.ts'

export const useCountriesData = () => {
  const setCountries = useSetAtom(countriesAtom)
  const setCountriesLoading = useSetAtom(countriesLoadingAtom)
  const { data, loading } = useProjectCountriesGetQuery({ fetchPolicy: 'cache-and-network' })

  useEffect(() => {
    setCountriesLoading(loading)
  }, [loading, setCountriesLoading])

  useEffect(() => {
    if (data?.projectCountriesGet) {
      setCountries(data.projectCountriesGet.map((country) => country.country))
    }
  }, [data, setCountries])
}
