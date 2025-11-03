import { HStack, Icon, IconButton, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { useDebouncedCallback } from '@react-hookz/web'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiFunnelSimple, PiMagnifyingGlass } from 'react-icons/pi'

import { useFilterContext } from '@/context/filter'
import { useModal } from '@/shared/hooks'

import { FilterModal } from '../../../filters/FilterModal'

export const FilterComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [search, setSearch] = useState('')

  const { t } = useTranslation()
  const { updateFilter, filters } = useFilterContext()

  const filterModal = useModal()

  useEffect(() => {
    if (!filters.search) {
      setSearch('')
    }
  }, [filters])

  const updateSearchFilterDebounced = useDebouncedCallback(
    (value) => updateFilter({ search: value }),
    [updateFilter],
    500,
  )

  const handleSearchUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    updateSearchFilterDebounced(event.target.value)
  }

  return (
    <>
      <HStack
        w={{ base: 'full', lg: 'auto' }}
        as="form"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          inputRef.current?.blur()
        }}
      >
        <InputGroup size={{ base: 'sm', lg: 'md' }}>
          <InputLeftElement color="neutral1.11">
            <Icon as={PiMagnifyingGlass} fontSize={{ base: '16px', lg: '20px' }} />
          </InputLeftElement>
          <Input
            ref={inputRef}
            size={{ base: 'sm', lg: 'md' }}
            placeholder={t('search projects')}
            width={{ base: 'full', lg: '220px' }}
            value={search}
            onChange={handleSearchUpdate}
          />
          <InputRightElement minWidth={{ base: '28px', lg: '40px' }}>
            <IconButton
              aria-label="filter"
              variant="ghost"
              size={{ base: 'sm', lg: 'md' }}
              colorScheme="neutral1"
              icon={<Icon as={PiFunnelSimple} fontSize={{ base: '16px', lg: '20px' }} />}
              onClick={filterModal.onOpen}
            />
          </InputRightElement>
        </InputGroup>
        {/* <FilterByRegionMenuMenu /> */}
      </HStack>
      <FilterModal {...filterModal} />
    </>
  )
}
