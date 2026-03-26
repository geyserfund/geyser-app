import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useDebouncedCallback } from '@react-hookz/web'
import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'

import { useFilterContext } from '@/context/filter.tsx'

type LandingSearchInputProps = {
  width?: string | Record<string, string>
}

/** LandingSearchInput syncs the navbar search field with discovery filters. */
export const LandingSearchInput = ({ width = { base: 'full', lg: '280px' } }: LandingSearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [search, setSearch] = useState('')

  const { updateFilter, filters } = useFilterContext()

  useEffect(() => {
    if (!filters.search) {
      setSearch('')
      return
    }

    setSearch(filters.search)
  }, [filters.search])

  const updateSearchFilterDebounced = useDebouncedCallback(
    (value: string) => updateFilter({ search: value }),
    [updateFilter],
    500,
  )

  const handleSearchUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    updateSearchFilterDebounced(event.target.value)
  }

  return (
    <InputGroup
      as="form"
      size="md"
      width={width}
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        inputRef.current?.blur()
      }}
    >
      <InputLeftElement color="neutral1.9">
        <Icon as={PiMagnifyingGlass} fontSize="18px" />
      </InputLeftElement>
      <Input
        ref={inputRef}
        value={search}
        onChange={handleSearchUpdate}
        placeholder={t('Search projects')}
        aria-label={t('Search projects')}
        borderRadius={{ base: '8px', lg: '10px' }}
        borderColor="neutral1.5"
        backgroundColor="utils.surface"
        _hover={{ borderColor: 'primary1.6' }}
        _focusVisible={{ borderColor: 'primary1.8', boxShadow: 'none' }}
      />
    </InputGroup>
  )
}
