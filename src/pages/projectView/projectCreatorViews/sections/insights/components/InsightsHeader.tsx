import { Button, HStack, Select, Stack } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { H2 } from '../../../../../../components/typography'
import { useSelectionAtom } from '../insightsAtom'

export enum InsightsOptions {
  lastWeek = 'Last week',
  lastMonth = 'Last month',
  lastYear = 'Last year',
}

export const InsightsHeader = () => {
  const { t } = useTranslation()

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      justifyContent="space-between"
    >
      <HStack w="full" justifyContent={'start'}>
        <H2>{t('Weekly overview')}</H2>
        <InsightsOptionsSelect />
      </HStack>
      <Button variant="primary">{t('beta')}</Button>
    </Stack>
  )
}

export const InsightsOptionsSelect = () => {
  const [selectedOption, setSelectedOption] = useSelectionAtom()

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.currentTarget.value as InsightsOptions)
  }

  return (
    <Select
      defaultValue={selectedOption}
      onChange={handleSelect}
      maxWidth="150px"
    >
      <option value={InsightsOptions.lastWeek}>
        {InsightsOptions.lastWeek}
      </option>
      <option value={InsightsOptions.lastMonth}>
        {InsightsOptions.lastMonth}
      </option>
      <option value={InsightsOptions.lastYear}>
        {InsightsOptions.lastYear}
      </option>
    </Select>
  )
}
