import 'react-datepicker/dist/react-datepicker.css'

import { DateTime } from 'luxon'
import { forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import { createUseStyles } from 'react-jss'

import { getFormattedDate } from '../../utils'
import { ButtonComponent } from '../ui'

interface ICalendarButton {
  children: React.ReactNode
  value?: Date | null
  onChange: (_: Date) => void
  primary?: boolean
}

const useStyles = createUseStyles({
  dateTimeWrapper: {
    width: 'auto',
  },
})

export const CalendarButton = ({
  children,
  value,
  onChange,
  primary,
}: ICalendarButton) => {
  const classes = useStyles()

  const ExampleCustomInput = forwardRef<any, any>(({ onClick }, ref) => (
    <ButtonComponent primary={primary} onClick={onClick} ref={ref}>
      {value ? getFormattedDate(value.getTime()) : children}
    </ButtonComponent>
  ))
  ExampleCustomInput.displayName = 'ExampleInputButton'

  const currentDate = DateTime.now().plus({ days: 7 })

  return (
    <DatePicker
      wrapperClassName={classes.dateTimeWrapper}
      selected={value}
      onChange={onChange}
      customInput={<ExampleCustomInput />}
      minDate={currentDate.toJSDate()}
    />
  )
}
