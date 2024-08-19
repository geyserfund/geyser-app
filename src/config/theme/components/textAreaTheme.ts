import { defineStyleConfig } from '@chakra-ui/react'

import { defaultInputStyle } from './inputTheme'

export const textareaTheme = defineStyleConfig({
  variants: {
    outline: defaultInputStyle,
  },
})
