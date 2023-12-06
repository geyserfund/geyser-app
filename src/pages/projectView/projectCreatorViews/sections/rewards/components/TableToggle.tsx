import { Stack, Switch, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export const TableToggle = ({isChecked, value, onChange, labelPosition = 'right'}) => {
  const { t } = useTranslation()

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
