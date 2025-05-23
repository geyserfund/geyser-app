import { Button, HStack, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { useDebouncedCallback } from '@react-hookz/web'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiMagnifyingGlass, PiSlidersHorizontal } from 'react-icons/pi'

import { useFilterContext } from '@/context/filter'
import { MapButton } from '@/modules/navigation/platformNavBar/components/MapButton.tsx'
import { useModal } from '@/shared/hooks'
import { useMobileMode } from '@/utils'

import { FilterModal } from './FilterModal'

export const FilterComponent = () => {
  const isMobileMode = useMobileMode()

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
    <HStack w="full">
      <MapButton />
      <form
        style={{ width: '100%' }}
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          inputRef.current?.blur()
        }}
      >
        <InputGroup>
          <InputLeftElement color="neutral1.11">
            <PiMagnifyingGlass />
          </InputLeftElement>
          <Input ref={inputRef} placeholder={t('Search project')} value={search} onChange={handleSearchUpdate} />
          <InputRightElement minWidth={{ base: '46px', lg: '86px' }}>
            <Button variant="ghost" colorScheme="neutral1" onClick={filterModal.onOpen} gap={2}>
              <PiSlidersHorizontal />
              {!isMobileMode && t('Filter')}
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>
      <FilterModal {...filterModal} />
    </HStack>
  )
}
