import {
  AccordionPanel as ChakraAccordionPanel,
  AccordionPanelProps,
} from '@chakra-ui/react'

export const AccordionPanel = (props: AccordionPanelProps) => {
  return (
    <ChakraAccordionPanel
      textAlign="left"
      borderRadius="0 0 8px 8px"
      backgroundColor="neutral.50"
      {...props}
    />
  )
}
