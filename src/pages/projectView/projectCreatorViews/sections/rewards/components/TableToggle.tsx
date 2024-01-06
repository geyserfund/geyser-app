import { Stack, Switch, Text } from '@chakra-ui/react'
import { ChangeEvent } from 'react'

export interface TableToggleProps {
  isChecked: boolean,
  value: string,
  onChange: ChangeEvent<HTMLInputElement>,
  labelPosition: 'left' | 'right'
}

export const TableToggle = ({isChecked, value, onChange, labelPosition = 'right'}: TableToggleProps) => {

  const renderLabel = () => (
    <Text
      fontSize='15px'
    >
      {value}
    </Text>
  )

  return (
    <Stack direction='row' align={'center'}>
      {labelPosition == 'left' && (
        renderLabel()
      )}
      <span style={{transform: 'rotate(180deg)'}}>
        <Switch isChecked={isChecked} onChange={onChange} size={'md'} sx={{
          '--switch-track-width': '2.4rem'
        }}/>
      </span>
      {labelPosition == 'right' && (
        renderLabel()
      )}
    </Stack>
  )
}
