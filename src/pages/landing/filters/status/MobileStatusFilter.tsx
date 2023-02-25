import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionItemProps,
  AccordionPanel,
  HStack,
  VStack,
} from '@chakra-ui/react'

import { Body1 } from '../../../../components/typography'
import { colors } from '../../../../styles'
import { StatusTypeButton } from '.'
import { StatusFilterBody } from './StatusFilterBody'

interface MobileStatusFilterProps extends AccordionItemProps {
  button: StatusTypeButton
}

export const MobileStatusFilter = ({
  button,
  ...rest
}: MobileStatusFilterProps) => {
  return (
    <AccordionItem {...rest}>
      <AccordionButton>
        <HStack width="100%">
          <HStack width="100%" spacing="10px">
            <button.icon color={button.color} height="20px" />
            <Body1 color={colors.neutral900}>{button.text}</Body1>
          </HStack>
        </HStack>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel as={VStack} overflow="hidden" paddingX="0px">
        <StatusFilterBody {...{ button, onClose() {} }} />
      </AccordionPanel>
    </AccordionItem>
  )
}
