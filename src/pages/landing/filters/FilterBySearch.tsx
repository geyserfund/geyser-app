import { SearchIcon } from '@chakra-ui/icons'
import { HStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import { TextInputBox } from '../../../components/ui'
import { useFilterContext } from '../../../context'
import { useDebounce } from '../../../hooks'

export const FilterBySearch = () => {
  const { updateFilter } = useFilterContext()

  const [search, setSearch] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedSearch = useDebounce(search, 1000)

  useEffect(() => {
    if (debouncedSearch) {
      updateFilter({ search: debouncedSearch })
    } else {
      updateFilter({ search: undefined })
    }
  }, [debouncedSearch, updateFilter])

  const handleSearchUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  return (
    <HStack width="100%" position="relative" alignItems="center">
      <form
        style={{ width: '100%' }}
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          inputRef.current?.blur()
        }}
      >
        <TextInputBox
          ref={inputRef}
          leftIcon={<SearchIcon color={'neutral.700'} />}
          placeholder="Search"
          type="search"
          onChange={handleSearchUpdate}
          value={search}
        />
      </form>
    </HStack>
  )
}
