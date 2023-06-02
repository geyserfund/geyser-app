import { HStack } from '@chakra-ui/react'

import { ToolbarCommon } from './toolbar/ToolbarCommon'
import { ToolbarHeading } from './toolbar/ToolbarHeading'

export const MarkdownToolbar = () => {
  return (
    <HStack>
      <ToolbarCommon />
      <ToolbarHeading />
    </HStack>
  )
}
