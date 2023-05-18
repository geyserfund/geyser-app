import { Button, HStack } from '@chakra-ui/react'
import { useState } from 'react'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'

import { CalendarButton } from '../../../components/molecules'

interface ProjectFundraisingDeadlineProps {
  setValue: UseFormSetValue<any>
  watch: UseFormWatch<any>
}

export const ProjectFundraisingDeadline = ({
  setValue,
  watch,
}: ProjectFundraisingDeadlineProps) => {
  const [selectedButton, setSelectedButton] = useState(
    watch('expiresAt') ? 'custom' : 'ongoing',
  )
  const [selectedDate, setSelectedDate] = useState<Date>()

  const handleDateChange = (value: Date) => {
    setSelectedButton('custom')
    setSelectedDate(value)

    setValue('expiresAt', `${value.getTime()}`)
  }

  const handleOngoingSelect = () => {
    setSelectedButton('ongoing')
    setSelectedDate(undefined)
    setValue('expiresAt', undefined)
  }

  return (
    <HStack width="100%" spacing={4}>
      <Button
        w="50%"
        variant="secondary"
        isActive={selectedButton === 'ongoing'}
        onClick={handleOngoingSelect}
      >
        Ongoing
      </Button>
      <CalendarButton
        containerProps={{ w: '50%' }}
        isActive={selectedButton === 'custom'}
        value={selectedDate}
        onChange={handleDateChange}
      >
        With Deadline
      </CalendarButton>
    </HStack>
  )
}
