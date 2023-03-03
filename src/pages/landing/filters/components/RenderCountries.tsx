import { useEffect, useState } from 'react'

import { ProjectCountriesGetResult } from '../../../../types'
import { FilterListItem } from './FilterListButton'

export const RenderCountries = ({
  max,
  countries,
  countryCode,
  handleClick,
}: {
  max?: number
  countries: ProjectCountriesGetResult[]
  countryCode?: string
  handleClick: (_: string) => void
}) => {
  const [countriesToRender, setCountriesToRender] = useState<
    ProjectCountriesGetResult[]
  >([])

  useEffect(() => {
    if (countries.length > 0) {
      const usedCountries = countries.filter((country) => country.count > 0)
      if (max) {
        const selectedCountries = countries.filter(
          (country) => country.country.code === countryCode,
        )

        let toBeRenderedCountries = usedCountries.slice(0, max)

        selectedCountries.map((selectedCountry) => {
          if (
            !toBeRenderedCountries.some(
              (toBeRenderedCountry) =>
                toBeRenderedCountry.country.code ===
                selectedCountry.country.code,
            )
          ) {
            toBeRenderedCountries = [selectedCountry, ...toBeRenderedCountries]
          }
        })
        setCountriesToRender(toBeRenderedCountries)
      } else {
        setCountriesToRender(usedCountries)
      }
    }
  }, [countries, countryCode, max])

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
