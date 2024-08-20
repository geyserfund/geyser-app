import { Skeleton } from '@chakra-ui/react'
import { Box, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
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

interface FilterByRegionProps {
  onClose?: () => void
}

export const FilterByRegion = ({ onClose }: FilterByRegionProps) => {
  const [searchCode, setSearchCode] = useState('')

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
    <>
      <Box width="100%" paddingX={standardPadding}>
        <InputGroup>
          <Input
            placeholder={t('Search country or region')}
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
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
      </Box>
      <RegionFilterBody {...{ countries, regions, searchCode, onClose }} />
    </>
  )
}
