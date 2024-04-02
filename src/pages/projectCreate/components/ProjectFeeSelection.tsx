import { Box, HStack, Text, useRadio, useRadioGroup, VStack } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

type ProjectFeeSelectionProps = {
  readOnly?: boolean
  value: number
  onChange: (value: number) => void
}

enum FeeValues {
  ZeroPercent = '0.0',
  TwoPercent = '0.02',
  FourPercent = '0.04',
  SixPercent = '0.06',
  EightPercent = '0.08',
}

const options = [
  { label: '0%', value: FeeValues.ZeroPercent },
  { label: '2%', value: FeeValues.TwoPercent },
  { label: '4%', value: FeeValues.FourPercent },
  { label: '6%', value: FeeValues.SixPercent },
  { label: '8%', value: FeeValues.EightPercent },
]

const ProjectFeeSelection: React.FC<ProjectFeeSelectionProps> = ({ readOnly, value, onChange }) => {
  const { t } = useTranslation()

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'transactionFee',
    defaultValue: String(value),
    onChange: (value) => onChange(Number(value)),
  })

  const group = getRootProps()

  return (
    <VStack
      width="100%"
      border="2px solid"
      borderColor="neutral.200"
      backgroundColor="primary.50"
      borderRadius="8px"
      alignItems="flex-start"
      padding="20px"
      spacing="20px"
    >
      <Text variant="body1" fontWeight="500">
        {t('Support Geyser')}
      </Text>

      <Text>
        {t(
          'Geyser provides you with a platform to showcase and amplify your project. Consider giving some value back to us so we can keep improving our product.',
        )}
      </Text>
      <VStack width="100%" alignItems="flex-start" spacing="5px">
        <Text fontWeight="500">{t('Choose Geyser split per transaction:')}</Text>
        <HStack {...group} spacing={4}>
          {options.map((option) => {
            const radio = getRadioProps({ value: option.value })
            return (
              <RadioCard key={option.value} {...radio} isDisabled={readOnly}>
                <Text variant="body1" fontWeight="700">
                  {option.label}
                </Text>
              </RadioCard>
            )
          })}
        </HStack>
      </VStack>
    </VStack>
  )
}

const RadioCard: React.FC<any> = ({ children, isDisabled, ...props }) => {
  const { getInputProps, getRadioProps } = useRadio(props)

  return (
    <Box as="label">
      <input {...getInputProps()} disabled={isDisabled} />
      <Box
        {...getRadioProps()}
        cursor="pointer"
        border="2px solid"
        color="#141A19"
        borderRadius="8px"
        borderColor="neutral.200"
        backgroundColor="white"
        _checked={{
          bg: 'primary.400',
          color: '#141A19',
          borderColor: 'primary.600',
        }}
        px={2}
        py={1}
      >
        {children}
      </Box>
    </Box>
  )
}

export default ProjectFeeSelection
