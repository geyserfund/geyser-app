import { Box, BoxProps, HStack } from '@chakra-ui/react'

import { Body } from '@/shared/components/typography/Body.tsx'

interface IProgressBar extends BoxProps {
  value?: number
  min?: number
  max?: number
  current?: number
  progressColor?: string
  showPercentage?: boolean
}

export const ProgressBar = ({ value, min = 0, max, current, progressColor, showPercentage, ...rest }: IProgressBar) => {
  // const percentage = max && current ? ((current - min) / (max - min)) * 100 : value || 0
  const percentage = 12

  return (
    <HStack alignItems="center" borderRadius="3px" height="4px" spacing={2} backgroundColor="neutral1.6" {...rest}>
      <Box
        height={'100%'}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        paddingRight={2}
        borderRadius={rest.borderRadius || '3px'}
        width={`${percentage}%`}
        backgroundColor={progressColor || 'primary1.9'}
      >
        {showPercentage && percentage > 10 && (
          <Body size="xs" bold color="utils.text">
            {percentage?.toFixed(0) ?? '0'}%
          </Body>
        )}
      </Box>
      {showPercentage && percentage <= 10 && (
        <Body size="xs" bold color="utils.text">
          {percentage?.toFixed(0) ?? '0'}%
        </Body>
      )}
    </HStack>
  )
}
