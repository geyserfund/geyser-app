import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
import { PiX } from 'react-icons/pi'

import { standardPadding } from '@/shared/styles'

import {
  ProjectCountriesGetResult,
  ProjectRegionsGetResult,
  useProjectCountriesGetQuery,
  useProjectRegionsGetQuery,
} from '../../../../types'
import { RegionFilterBody } from './RegionFilterBody'

interface FilterByRegionMenuProps {
  onClose?: () => void
}

export const FilterByRegionMenuMenu = ({ onClose }: FilterByRegionMenuProps) => {
  const [searchCode, setSearchCode] = useState('')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const [countries, setCountries] = useState<ProjectCountriesGetResult[]>([])
  const [regions, setRegions] = useState<ProjectRegionsGetResult[]>([])

  const { loading: countriesLoading } = useProjectCountriesGetQuery({
    onCompleted(data) {
      if (data.projectCountriesGet) {
        const sortedCountries = [...data.projectCountriesGet].sort((a, b) => b.count - a.count)
        setCountries(sortedCountries)
      }
    },
  })

  const { loading: regionsLoading } = useProjectRegionsGetQuery({
    onCompleted(data) {
      if (data.projectRegionsGet) {
        const sortedRegions = [...data.projectRegionsGet].sort((a, b) => b.count - a.count)
        setRegions(sortedRegions)
      }
    },
  })

  if (countriesLoading || regionsLoading) {
    return <Skeleton borderRadius="8px" w="full" height="40px" />
  }

  return (
    <Box width="100%" paddingX={standardPadding}>
      <Popover isOpen={isPopoverOpen} placement="bottom-start" closeOnBlur={true} autoFocus={false}>
        <PopoverTrigger>
          <InputGroup>
            <Input
              placeholder={t('Search country or region')}
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              onFocus={() => setIsPopoverOpen(true)}
              // onBlur={() => setIsPopoverOpen(false)}
            />
            {searchCode && (
              <InputRightElement>
                <IconButton
                  aria-label="clear-region-search"
                  variant="ghost"
                  colorScheme="neutral"
                  icon={<PiX />}
                  onClick={() => setSearchCode('')}
                />
              </InputRightElement>
            )}
          </InputGroup>
        </PopoverTrigger>
        <PopoverContent width="100%" maxWidth="400px" maxHeight="400px" paddingY={4}>
          <RegionFilterBody {...{ countries, regions, searchCode, onClose }} />
        </PopoverContent>
      </Popover>
    </Box>
  )
}
