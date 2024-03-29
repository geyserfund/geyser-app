import { Box, HStack, Text, useRadio, useRadioGroup, VStack } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

type ProjectFeeSelectionProps = {
  readOnly?: boolean
  value: string
  onChange: (value: string) => void
}

const ProjectFeeSelection: React.FC<ProjectFeeSelectionProps> = ({ readOnly, value, onChange }) => {
  const { t } = useTranslation()

  const options = [
    { label: '0%', value: '0.00' },
    { label: '2%', value: '2.00' },
    { label: '4%', value: '4.00' },
    { label: '6%', value: '6.00' },
    { label: '8%', value: '8.00' },
  ]

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'transactionFee',
    defaultValue: value,
    onChange,
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
        borderRadius="8px"
        borderColor="neutral.200"
        backgroundColor="white"
        _checked={{
          bg: 'primary.400',
          color: 'neutral.900',
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
