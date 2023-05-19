import {
  AccordionButton as ChakraAccordionButton,
  AccordionButtonProps,
  AccordionIcon,
  Text,
} from '@chakra-ui/react'

export const AccordionButton = (props: AccordionButtonProps) => {
  return (
    <ChakraAccordionButton
      borderRadius="8px 8px 0 0"
      py={5}
      backgroundColor="neutral.100"
      {...props}
    >
      <Text flex="1" textAlign="left" variant="body1" fontWeight={600}>
        {props.children}
      </Text>

      <AccordionIcon width="30px" />
    </ChakraAccordionButton>
  )
}
