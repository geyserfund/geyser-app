import { Box, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
import { PiX } from 'react-icons/pi'

import { standardPadding } from '@/shared/styles'

import { CategoryFilterBody } from './CategoryFilterBody'

interface FilterByCategoryProps {
  onClose?: () => void
}

export const FilterByCategory = ({ onClose }: FilterByCategoryProps) => {
  const [searchCode, setSearchCode] = useState('')

  return (
    <>
      <Box width="100%" paddingX={standardPadding}>
        <InputGroup>
          <Input
            placeholder={t('Search category or sub category')}
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
          />
          {searchCode && (
            <InputRightElement>
              <IconButton
                aria-label="clear-category-search"
                variant="ghost"
                colorScheme="neutral"
                icon={<PiX />}
                onClick={() => setSearchCode('')}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </Box>
      <CategoryFilterBody {...{ searchCode, onClose }} />
    </>
  )
}
