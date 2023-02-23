import { useEffect, useState } from 'react'

import { ProjectCountriesGetResult } from '../../../../types'
import { FilterListItem } from './FilterListButton'

const MAX_COUNTRY_INDEX_VIEW = 9

export const RenderCountries = ({
  countries,
  countryCode,
  handleClick,
}: {
  countries: ProjectCountriesGetResult[]
  countryCode: string
  handleClick: (_: string) => void
}) => {
  const [countriesToRender, setCountriesToRender] = useState<
    ProjectCountriesGetResult[]
  >([])

  useEffect(() => {
    if (countries.length > 0) {
      const selectedCountries = countries.filter(
        (country) => country.country.code === countryCode,
      )

      let toBeRenderedCountries = countries.slice(0, MAX_COUNTRY_INDEX_VIEW)

      selectedCountries.map((selectedCountry) => {
        if (
          !toBeRenderedCountries.some(
            (toBeRenderedCountry) =>
              toBeRenderedCountry.country.code === selectedCountry.country.code,
          )
        ) {
          toBeRenderedCountries = [selectedCountry, ...toBeRenderedCountries]
        }
      })
      setCountriesToRender(toBeRenderedCountries)
    }
  }, [countries, countryCode])

  return (
    <>
      {countriesToRender.map((country) => {
        const {
          count,
          country: { code, name },
        } = country
        const isActive = code === countryCode
        return (
          <FilterListItem
            key={code}
            isActive={isActive}
            label={name}
            value={code}
            count={count}
            handleClick={handleClick}
          />
        )
      })}
    </>
  )
}
