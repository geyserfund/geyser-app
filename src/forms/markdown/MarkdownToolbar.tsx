import { HStack } from '@chakra-ui/react'

import { ToolbarBlocks } from './toolbar/ToolbarBlocks'
import { ToolbarCommon } from './toolbar/ToolbarCommon'
import { ToolbarHeading } from './toolbar/ToolbarHeading'
import { ToolbarMedia } from './toolbar/ToolbarMedia'

export const MarkdownToolbar = () => {
  return (
    <HStack justifyContent="center" flexWrap="wrap" mt={1}>
      <ToolbarCommon />
      <ToolbarBlocks />
      <ToolbarHeading />
      <ToolbarMedia />
    </HStack>
  )
}
