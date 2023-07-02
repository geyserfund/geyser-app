import { Accordion, Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useMatch } from 'react-router-dom'

import { Body1 } from '../../../../components/typography'
import { getPath } from '../../../../constants'
import { FilterTopBar } from '../../projects/components'
import { FilterByActivity } from '../activity'
import { FilterByRegion } from '../region'
import { MobileSort } from '../sort'
import { FilterByStatus } from '../status'
import { FilterByTags } from '../tag'

export const FilterAndSorts = () => {
  const { t } = useTranslation()
  const isLandingFeed = useMatch(getPath('landingFeed'))
  return (
    <Accordion allowToggle>
      <FilterTopBar padding="10px" />
      <Box width="100%" padding="8px 30px" backgroundColor="neutral.200">
        <Body1 semiBold color="neutral.800">
          {t('Filter')}
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
              {t('Sort')}
            </Body1>
          </Box>
          <MobileSort />
        </>
      )}
    </Accordion>
  )
}
