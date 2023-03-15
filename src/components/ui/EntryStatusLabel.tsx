import { Stack, StackDirection, Text } from '@chakra-ui/react'
import { HTMLChakraProps } from '@chakra-ui/system'
import { BsFillXCircleFill } from 'react-icons/bs'

import { colors } from '../../styles'
import { Entry, EntryStatus } from '../../types/generated/graphql'

interface IProjectStatusLabel extends HTMLChakraProps<'div'> {
  entry: Entry
  fontSize?: string
  iconSize?: string
  fontFamily?: string
  direction?: StackDirection
}

export const EntryStatusLabel = ({
  entry,
  fontSize,
  fontFamily,
  iconSize = '16px',
  direction = 'row',
}: IProjectStatusLabel) => {
  const commonStyles = {
    fontWeight: 'semibold',
    fontFamily,
    fontSize: fontSize || '12px',
  }
  if (entry.status === EntryStatus.Published) {
    return null
  }

  return (
    <Stack direction={direction} alignItems="center">
      <BsFillXCircleFill fontSize={iconSize} color={colors.secondaryGold} />
      <Text color={colors.secondaryGold} {...commonStyles}>
        DRAFT
      </Text>
    </Stack>
  )
}
