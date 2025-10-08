import {
  HStack,
  Icon,
  IconButton,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { useDebouncedCallback } from '@react-hookz/web'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiFunnelSimple, PiMagnifyingGlass } from 'react-icons/pi'

import { useFilterContext } from '@/context/filter'
import { useModal } from '@/shared/hooks'

import { FilterModal } from './FilterModal'

export const FilterComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { isOpen, onOpen, onClose } = useDisclosure()

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
    <HStack>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          inputRef.current?.blur()
        }}
      >
        <InputGroup>
          <InputLeftElement
            color="neutral1.11"
            onClick={() => {
              onOpen()
              inputRef.current?.focus()
            }}
            _hover={{
              cursor: 'pointer',
            }}
          >
            <Icon as={PiMagnifyingGlass} fontSize="20px" />
          </InputLeftElement>
          <Input
            ref={inputRef}
            placeholder={t('Filter Projects')}
            width={isOpen ? 'auto' : '40px'}
            value={search}
            onFocus={onOpen}
            onBlur={() => !search && onClose()}
            onChange={handleSearchUpdate}
          />
          <InputRightElement minWidth="46px">
            <IconButton
              aria-label="filter"
              variant="ghost"
              size="md"
              colorScheme="neutral1"
              icon={<Icon as={PiFunnelSimple} fontSize="20px" />}
              onClick={filterModal.onOpen}
            />
          </InputRightElement>
        </InputGroup>
      </form>
      <FilterModal {...filterModal} />
    </HStack>
  )
}
