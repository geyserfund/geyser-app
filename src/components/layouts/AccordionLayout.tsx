import {
  Accordion,
  AccordionItem,
  AccordionItemProps,
  AccordionProps,
  VStack,
} from '@chakra-ui/react'

export interface AccordionLayoutProps extends AccordionProps {
  hover?: boolean
  click?: boolean
  to?: string
  href?: string
}

export const AccordionLayout = ({
  children,
  ...rest
}: AccordionLayoutProps) => {
  return (
    <Accordion as={VStack} allowToggle spacing="10px" width="100%" {...rest}>
      {children}
    </Accordion>
  )
}

export interface AccordionItemLayoutProps extends AccordionItemProps {
  hover?: boolean
  click?: boolean
  to?: string
  href?: string
}

export const AccordionItemLayout = ({
  children,
  click,
  hover,
  ...rest
}: AccordionItemLayoutProps) => {
  return (
    <AccordionItem
      tabIndex={-1}
      overflow={'hidden'}
      backgroundColor="white"
      border="2px solid !important"
      borderColor="brand.neutral200 !important"
      borderRadius="8px"
      boxShadow="none"
      _hover={
        hover ? { cursor: 'pointer', borderColor: 'brand.neutral400' } : {}
      }
      _active={click ? { borderColor: 'brand.primary' } : {}}
      _focus={click ? { borderColor: 'brand.primary' } : {}}
      {...rest}
    >
      {children}
    </AccordionItem>
  )
}
