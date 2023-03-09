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
import { StatusTypeButton } from '../status'
import { ActivityFilterBody } from './ActivityFilterBody'

interface MobileActivityFilterProps extends AccordionItemProps {
  button: StatusTypeButton
}

export const MobileActivityFilter = ({
  button,
  ...rest
}: MobileActivityFilterProps) => {
  return (
    <AccordionItem {...rest}>
      <AccordionButton paddingY="15px">
        <HStack width="100%">
          <HStack width="100%" spacing="10px">
            <button.icon color={button.color} height="20px" />
            <Body1 color={colors.neutral900}>{button.text}</Body1>
          </HStack>
        </HStack>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel as={VStack} overflow="hidden" paddingX="0px">
        <ActivityFilterBody {...{ button, onClose() {} }} />
      </AccordionPanel>
    </AccordionItem>
  )
}
