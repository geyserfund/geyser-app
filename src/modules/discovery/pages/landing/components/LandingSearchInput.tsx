import { Icon, Input, InputGroup, InputLeftElement, useColorModeValue } from '@chakra-ui/react'
import { useDebouncedCallback } from '@react-hookz/web'
import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'

import { useFilterContext } from '@/context/filter.tsx'

type LandingSearchInputProps = {
  autoFocus?: boolean
  compact?: boolean
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  showContent?: boolean
  size?: 'md' | 'lg'
  width?: string | Record<string, string>
}

/** LandingSearchInput syncs the navbar search field with discovery filters. */
export const LandingSearchInput = ({
  autoFocus,
  compact = false,
  onBlur,
  onFocus,
  showContent = true,
  size = 'md',
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

  const iconColor = 'neutral1.9'
  const inputBorderColor = 'neutral1.6'
  const inputBackground = useColorModeValue('utils.surface', 'neutral1.3')
  const hideContent = compact || !showContent

  return (
    <InputGroup
      as="form"
      size={size}
      width={width}
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        inputRef.current?.blur()
      }}
    >
      <InputLeftElement color={iconColor} pointerEvents="none">
        <Icon as={PiMagnifyingGlass} fontSize="18px" />
      </InputLeftElement>
      <Input
        ref={inputRef}
        autoFocus={autoFocus}
        value={search}
        onChange={handleSearchUpdate}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={t('Search projects')}
        aria-label={t('Search projects')}
        borderRadius={{ base: '8px', lg: '10px' }}
        borderColor={compact ? 'transparent' : inputBorderColor}
        backgroundColor={compact ? 'transparent' : inputBackground}
        color={hideContent ? 'transparent' : undefined}
        cursor={compact ? 'pointer' : 'text'}
        transition="background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease"
        _placeholder={{ color: hideContent ? 'transparent' : undefined }}
        _hover={{ borderColor: compact ? 'transparent' : inputBorderColor }}
        _focusVisible={{ borderColor: compact ? 'transparent' : inputBorderColor, boxShadow: 'none' }}
        sx={{ caretColor: hideContent ? 'transparent' : undefined }}
      />
    </InputGroup>
  )
}
