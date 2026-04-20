import { useColorMode } from '@chakra-ui/react'

import { StripeEmbeddedTheme } from '@/types/index.ts'

export const useStripeEmbeddedTheme = (): StripeEmbeddedTheme => {
  const { colorMode } = useColorMode()

  return colorMode === 'dark' ? StripeEmbeddedTheme.Dark : StripeEmbeddedTheme.Light
}
