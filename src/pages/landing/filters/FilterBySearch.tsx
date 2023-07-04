import { SearchIcon } from '@chakra-ui/icons'
import { HStack } from '@chakra-ui/react'
import { useDebouncedCallback } from '@react-hookz/web'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { TextInputBox } from '../../../components/ui'
import { useFilterContext } from '../../../context'

export const FilterBySearch = () => {
  const { t } = useTranslation()
  const { updateFilter } = useFilterContext()

  const inputRef = useRef<HTMLInputElement>(null)

  const updateSearchFilterDebounced = useDebouncedCallback(
    (value) => updateFilter({ search: value }),
    [updateFilter],
    500,
  )

  const handleSearchUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchFilterDebounced(event.target.value)
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
          placeholder={t('Search')}
          type="search"
          onChange={handleSearchUpdate}
        />
      </form>
    </HStack>
  )
}
