import { Button, HStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useState } from 'react'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { CalendarButton } from '../../../components/molecules'

interface ProjectFundraisingDeadlineProps {
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<any>
}

export const ProjectFundraisingDeadline = ({
  setValue,
  watch,
}: ProjectFundraisingDeadlineProps) => {
  const { t } = useTranslation()
  const value = watch('expiresAt')

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? DateTime.fromMillis(Number(value)).toJSDate() : null,
  )

  const selectedButton = value ? 'custom' : 'ongoing'

  const handleDateChange = (value: Date) => {
    setSelectedDate(value)
    setValue('expiresAt', value.getTime().toString(), { shouldDirty: true })
  }

  const handleOngoingSelect = () => {
    setSelectedDate(null)
    setValue('expiresAt', null, { shouldDirty: true })
  }

  return (
    <HStack width="100%" spacing={4}>
      <Button
        w="50%"
        variant="secondary"
        isActive={selectedButton === 'ongoing'}
        onClick={handleOngoingSelect}
      >
        {t('Ongoing')}
      </Button>
      <CalendarButton
        containerProps={{ w: '50%' }}
        isActive={selectedButton === 'custom'}
        value={selectedDate}
        onChange={handleDateChange}
      >
        {t('With Deadline')}
      </CalendarButton>
    </HStack>
  )
}
