import { SearchIcon } from '@chakra-ui/icons'
import { HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { CloseIconButton } from '../../../components/buttons'
import { TextInputBox } from '../../../components/ui'
import { useFilterContext } from '../../../context'
import { useDebounce } from '../../../hooks'
import { colors } from '../../../styles'

export const FilterBySearch = () => {
  const { updateFilter } = useFilterContext()

  const [search, setSearch] = useState('')

  const debouncedSearch = useDebounce(search, 1000)

  useEffect(() => {
    if (debouncedSearch) {
      updateFilter({ search: debouncedSearch })
    } else {
      updateFilter({ search: undefined })
    }
  }, [debouncedSearch])

  const handleSearchUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleClear = () => {
    setSearch('')
    updateFilter({ search: undefined })
  }

  return (
    <HStack width="100%" position="relative" alignItems="center">
      <TextInputBox
        leftIcon={<SearchIcon color={colors.neutral700} />}
        placeholder="Search"
        onChange={handleSearchUpdate}
        value={search}
      />
      {search && (
        <CloseIconButton
          position="absolute"
          right="10px"
          onClick={handleClear}
        />
      )}
    </HStack>
  )
}
