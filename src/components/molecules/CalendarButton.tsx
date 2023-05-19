import 'react-datepicker/dist/react-datepicker.css'

import { Box, BoxProps, Button, ButtonProps, Text } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import { createUseStyles } from 'react-jss'

interface ICalendarButton extends Pick<ButtonProps, 'isActive'> {
  children: React.ReactNode
  value?: Date | null
  onChange: (_: Date) => void
  containerProps: BoxProps
}

const useStyles = createUseStyles({
  dateTimeWrapper: {
    width: '100%',
  },
})

const ButtonDateInput = forwardRef<
  HTMLButtonElement,
  Pick<ButtonProps, 'onClick'> & Pick<ICalendarButton, 'value' | 'children'>
>(({ value, onClick, children, ...props }, ref) => (
  <Button
    variant="secondary"
    width="100%"
    ref={ref}
    onClick={onClick}
    {...props}
  >
    <Text>{value?.toString() || children}</Text>
  </Button>
))
ButtonDateInput.displayName = 'ButtonDateInput'

export const CalendarButton = ({
  children,
  value,
  onChange,
  containerProps,
  ...buttonProps
}: ICalendarButton) => {
  const classes = useStyles()

  const currentDate = DateTime.now().plus({ days: 7 })

  return (
    <Box {...containerProps}>
      <DatePicker
        wrapperClassName={classes.dateTimeWrapper}
        selected={value}
        onChange={onChange}
        customInput={
          <ButtonDateInput {...buttonProps} value={value}>
            {children}
          </ButtonDateInput>
        }
        minDate={currentDate.toJSDate()}
      />
    </Box>
  )
}
