import { HStack } from '@chakra-ui/react'

import { ToolbarCommon } from './toolbar/ToolbarCommon'
import { ToolbarHeading } from './toolbar/ToolbarHeading'
import { ToolbarMedia } from './toolbar/ToolbarMedia'

export const MarkdownToolbar = () => {
  return (
    <HStack justifyContent="center" flexWrap="wrap">
      <ToolbarCommon />
      <ToolbarHeading />
      <ToolbarMedia />
    </HStack>
  )
}
