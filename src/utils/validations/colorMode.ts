import { StyleFunctionProps } from '@chakra-ui/react'

export const isDarkMode = (props: StyleFunctionProps) => {
  return props.colorMode === 'dark'
}
