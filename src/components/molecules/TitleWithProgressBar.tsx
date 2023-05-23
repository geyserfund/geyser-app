import { Box, HStack, Text } from '@chakra-ui/react'

import { ProgressBar } from '../ui'

interface ITitleWithProgressBar {
  title: string
  subtitle: string
  index: number
  length: number
  hideSteps?: boolean
}

export default function TitleWithProgressBar({
  title,
  subtitle,
  index,
  length,
  hideSteps,
}: ITitleWithProgressBar) {
  const percentage = Math.floor((index / length) * 100)
  return (
    <Box width="100%">
      <Text fontSize="18px" fontWeight={600}>
        {title}
      </Text>
      <HStack>
        <Text color="primary.600" variant="caption" fontWeight="bold">
          {subtitle}
          {hideSteps ? null : (
            <span>
              : {index} of {length}
            </span>
          )}
        </Text>

        <ProgressBar flex="1" value={percentage} />
      </HStack>
    </Box>
  )
}
