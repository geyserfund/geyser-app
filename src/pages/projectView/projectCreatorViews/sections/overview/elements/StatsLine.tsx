import { HStack } from '@chakra-ui/react'

import { Body2 } from '../../../../../../components/typography'

interface StatsLineProps {
  title: string
  value: string
}

export const StatsLine = ({ title, value }: StatsLineProps) => {
  return (
    <HStack
      w="full"
      borderTop="1px solid"
      borderColor="neutral.200"
      justifyContent={'space-between'}
      py="10px"
    >
      <Body2>{title}</Body2>
      <Body2>{value}</Body2>
    </HStack>
  )
}
