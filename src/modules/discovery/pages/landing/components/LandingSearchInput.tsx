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
  showContent?: boolean
  transparentMode?: boolean
  width?: string | Record<string, string>
}

type LandingSearchInputStyleTokens = {
  iconColor: string
  inputBackground: string
  inputBorderColor: string
  inputHoverBorderColor: string
  inputPlaceholderColor?: string
  inputTextColor?: string
}

const getLandingSearchInputStyleTokens = ({
  defaultIconColor,
  defaultInputBackground,
  defaultInputBorderColor,
  transparentMode,
}: {
  defaultIconColor: string
  defaultInputBackground: string
  defaultInputBorderColor: string
  transparentMode: boolean
}): LandingSearchInputStyleTokens => {
  if (!transparentMode) {
    return {
      iconColor: defaultIconColor,
      inputBackground: defaultInputBackground,
      inputBorderColor: defaultInputBorderColor,
      inputHoverBorderColor: defaultInputBorderColor,
    }
  }

  return {
    iconColor: 'whiteAlpha.900',
    inputBackground: 'whiteAlpha.220',
    inputBorderColor: 'whiteAlpha.500',
    inputHoverBorderColor: 'whiteAlpha.700',
    inputPlaceholderColor: 'whiteAlpha.800',
    inputTextColor: 'white',
  }
}

/** LandingSearchInput syncs the navbar search field with discovery filters. */
export const LandingSearchInput = ({
  autoFocus,
  compact = false,
  onBlur,
  showContent = true,
  transparentMode = false,
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

  const defaultIconColor = 'neutral1.9'
  const defaultInputBorderColor = useColorModeValue('gray.300', 'neutral1.6')
  const defaultInputBackground = useColorModeValue('utils.surface', 'neutral1.3')
  const styleTokens = getLandingSearchInputStyleTokens({
    transparentMode,
    defaultIconColor,
    defaultInputBackground,
    defaultInputBorderColor,
  })
  const hideContent = compact || !showContent

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
      <InputLeftElement color={styleTokens.iconColor}>
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
        borderColor={compact ? 'transparent' : styleTokens.inputBorderColor}
        backgroundColor={compact ? 'transparent' : styleTokens.inputBackground}
        color={hideContent ? 'transparent' : styleTokens.inputTextColor}
        cursor={compact ? 'pointer' : 'text'}
        transition="background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease"
        _placeholder={{ color: hideContent ? 'transparent' : styleTokens.inputPlaceholderColor }}
        _hover={{ borderColor: compact ? 'transparent' : styleTokens.inputHoverBorderColor }}
        _focusVisible={{ borderColor: compact ? 'transparent' : styleTokens.inputHoverBorderColor, boxShadow: 'none' }}
        sx={{ caretColor: hideContent ? 'transparent' : undefined }}
      />
    </InputGroup>
  )
}
