import { HStack, VStack } from '@chakra-ui/react'
import { useState } from 'react'

import { CalendarButton } from '../../../components/molecules'
import { Body2, Caption } from '../../../components/typography'
import { ButtonComponent } from '../../../components/ui'

interface ProjectFundraisingDeadlineProps {
  form: { expiresAt?: string }
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
    <VStack width="100%" alignItems="flex-start" spacing="5px">
      <Body2>Fundraising deadline</Body2>
      <HStack width="100%" spacing="20px">
        <ButtonComponent
          primary={selectedButton === 'ongoing'}
          onClick={handleOngoingSelect}
        >
          Ongoing
        </ButtonComponent>
        <CalendarButton
          primary={selectedButton === 'custom'}
          value={selectedDate}
          onChange={handleDateChange}
        >
          With Deadline
        </CalendarButton>
      </HStack>
      <Caption>
        Add a deadline for your project if you have one, or just keep it as
        ongoing.
      </Caption>
    </VStack>
  )
}
