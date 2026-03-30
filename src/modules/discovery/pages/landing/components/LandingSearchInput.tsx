import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useDebouncedCallback } from '@react-hookz/web'
import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'

import { useFilterContext } from '@/context/filter.tsx'

type LandingSearchInputProps = {
  autoFocus?: boolean
  compact?: boolean
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  showContent?: boolean
  width?: string | Record<string, string>
}

/** LandingSearchInput syncs the navbar search field with discovery filters. */
export const LandingSearchInput = ({
  autoFocus,
  compact = false,
  onBlur,
  showContent = true,
  width = { base: 'full', lg: '280px' },
}: LandingSearchInputProps) => {
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

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus()
    }
  }, [autoFocus])

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
        autoFocus={autoFocus}
        value={search}
        onChange={handleSearchUpdate}
        onBlur={onBlur}
        placeholder={t('Search projects')}
        aria-label={t('Search projects')}
        borderRadius={{ base: '8px', lg: '10px' }}
        borderColor={compact ? 'transparent' : 'gray.300'}
        backgroundColor={compact ? 'transparent' : 'utils.surface'}
        color={compact || !showContent ? 'transparent' : undefined}
        cursor={compact ? 'pointer' : 'text'}
        transition="background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease"
        _placeholder={{ color: compact || !showContent ? 'transparent' : undefined }}
        _hover={{ borderColor: compact ? 'transparent' : 'gray.400' }}
        _focusVisible={{ borderColor: compact ? 'transparent' : 'gray.400', boxShadow: 'none' }}
        sx={{ caretColor: compact || !showContent ? 'transparent' : undefined }}
      />
    </InputGroup>
  )
}
