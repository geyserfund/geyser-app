import { AccordionButton as ChakraAccordionButton, AccordionButtonProps, AccordionIcon } from '@chakra-ui/react'

import { Body } from '@/shared/components/typography'

export const AccordionButton = (props: AccordionButtonProps) => {
  return (
    <ChakraAccordionButton borderRadius="8px 8px 0 0" py={5} backgroundColor="neutral.100" {...props}>
      <Body flex="1" textAlign="left" medium>
        {props.children}
      </Body>

      <AccordionIcon width="30px" />
    </ChakraAccordionButton>
  )
}
