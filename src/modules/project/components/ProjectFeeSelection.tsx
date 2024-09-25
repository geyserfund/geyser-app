import { Button, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'

type ProjectFeeSelectionProps = {
  readOnly?: boolean
  value: number
  onChange: (value: number) => void
}

enum FeeValues {
  ZeroPercent = 0.0,
  TwoPercent = 0.02,
  FourPercent = 0.04,
  SixPercent = 0.06,
  EightPercent = 0.08,
}

const options = [
  { label: '0%', value: FeeValues.ZeroPercent },
  { label: '2%', value: FeeValues.TwoPercent },
  { label: '4%', value: FeeValues.FourPercent },
  { label: '6%', value: FeeValues.SixPercent },
  { label: '8%', value: FeeValues.EightPercent },
]

export const ProjectFeeSelection: React.FC<ProjectFeeSelectionProps> = ({ readOnly, value, onChange }) => {
  const { t } = useTranslation()

  return (
    <VStack alignItems="flex-start" paddingTop={2}>
      <Body size="md" medium>
        {t('Support Geyser')}
      </Body>

      <Body size="sm">
        {t(
          'Geyser provides you with a platform to showcase and amplify your project. Consider giving some value back to us so we can keep improving our product.',
        )}
      </Body>
      <VStack width="100%" alignItems="flex-start" spacing="5px">
        <Body size="sm" medium>
          {t('Choose Geyser split per transaction:')}
        </Body>
        <HStack spacing={4}>
          {options.map((option) => {
            const isActive = value === option.value
            return (
              <Button
                key={option.value}
                variant={isActive ? 'surface' : 'soft'}
                colorScheme={isActive ? 'primary1' : 'neutral1'}
                onClick={() => onChange(option.value)}
                disabled={readOnly}
              >
                {option.label}
              </Button>
            )
          })}
        </HStack>
      </VStack>
    </VStack>
  )
}
