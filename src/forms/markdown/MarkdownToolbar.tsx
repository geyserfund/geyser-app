import { HStack } from '@chakra-ui/react'

import { ToolbarBlocks } from './toolbar/ToolbarBlocks'
import { ToolbarCommon } from './toolbar/ToolbarCommon'
import { ToolbarHeading } from './toolbar/ToolbarHeading'
import { ToolbarMedia } from './toolbar/ToolbarMedia'

export const MarkdownToolbar = ({ isDisabled }: { isDisabled?: boolean }) => {
  return (
    <HStack justifyContent="center" flexWrap="wrap" mt={1}>
      <ToolbarCommon isDisabled={isDisabled} />
      <ToolbarBlocks isDisabled={isDisabled} />
      <ToolbarHeading isDisabled={isDisabled} />
      <ToolbarMedia isDisabled={isDisabled} />
    </HStack>
  )
}
