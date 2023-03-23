import {
  AccordionItem as ChakraAccordionItem,
  AccordionItemProps,
} from '@chakra-ui/react'

export const AccordionItem = (props: AccordionItemProps) => {
  return <ChakraAccordionItem py={2} border="none" {...props} />
}
