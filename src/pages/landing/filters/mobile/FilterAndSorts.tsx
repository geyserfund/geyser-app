import { Accordion, Box } from '@chakra-ui/react'
import { useMatch } from 'react-router-dom'

import { Body1 } from '../../../../components/typography'
import { getPath } from '../../../../constants'
import { FilterByRegion } from '../../filters/region'
import { MobileSort } from '../../filters/sort/MobileSort'
import { FilterByStatus } from '../../filters/status'
import { FilterByTags } from '../../filters/tag'
import { FilterTopBar } from '../../projects/components'
import { FilterByActivity } from '../activity'

export const FilterAndSorts = () => {
  const isLandingFeed = useMatch(getPath('landingFeed'))
  return (
    <Accordion allowToggle>
      <FilterTopBar padding="10px" />
      <Box width="100%" padding="8px 30px" backgroundColor="neutral.200">
        <Body1 semiBold color="neutral.800">
          Filter
        </Body1>
      </Box>
      <FilterByTags mobile />
      <FilterByRegion mobile />
      {isLandingFeed ? (
        <FilterByActivity mobile />
      ) : (
        <>
          <FilterByStatus mobile />
          <Box width="100%" padding="8px 30px" backgroundColor="neutral.200">
            <Body1 semiBold color="neutral.800">
              Sort
            </Body1>
          </Box>
          <MobileSort />
        </>
      )}
    </Accordion>
  )
}
