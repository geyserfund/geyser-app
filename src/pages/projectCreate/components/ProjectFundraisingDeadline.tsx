import { Button, HStack } from '@chakra-ui/react'
import { useState } from 'react'

import { CalendarButton } from '../../../../components/molecules'
import { ProjectCreationVariables } from '../types'

interface ProjectFundraisingDeadlineProps {
  form: Pick<ProjectCreationVariables, 'expiresAt'>
  setForm: (_: any) => void
}

export const ProjectFundraisingDeadline = ({
  form,
  setForm,
}: ProjectFundraisingDeadlineProps) => {
  const [selectedButton, setSelectedButton] = useState(
    form.expiresAt ? 'custom' : 'ongoing',
  )
  const [selectedDate, setSelectedDate] = useState<Date>()

  const handleDateChange = (value: Date) => {
    setSelectedButton('custom')
    setSelectedDate(value)

    setForm({ ...form, expiresAt: `${value.getTime()}` })
  }

  const handleOngoingSelect = () => {
    setSelectedButton('ongoing')
    setSelectedDate(undefined)
    setForm({ ...form, expiresAt: undefined })
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
