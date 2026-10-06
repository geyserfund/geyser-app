import { Select } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { InsightsOptions, useSelectionAtom } from '../insightsAtom'

export const InsightsOptionsSelect = () => {
  const { t } = useTranslation()
  const [selectedOption, setSelectedOption] = useSelectionAtom()

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.currentTarget.value as InsightsOptions)
  }

  return (
    <Select
      defaultValue={selectedOption}
      onChange={handleSelect}
      maxWidth="150px"
      borderRadius="8px"
      backgroundColor="utils.surface"
      borderColor="neutral1.6"
      color="utils.text"
      _hover={{ borderColor: 'neutral1.8' }}
      _focusVisible={{ borderColor: 'primary1.8', boxShadow: 'none' }}
      size="sm"
    >
      <option value={InsightsOptions.lastWeek}>{t(InsightsOptions.lastWeek)}</option>
      <option value={InsightsOptions.lastMonth}>{t(InsightsOptions.lastMonth)}</option>
      <option value={InsightsOptions.lastYear}>{t(InsightsOptions.lastYear)}</option>
    </Select>
  )
}
