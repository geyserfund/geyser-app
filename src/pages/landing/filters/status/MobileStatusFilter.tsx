import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionItemProps,
  AccordionPanel,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body1 } from '../../../../components/typography'
import { StatusTypeButton } from '.'
import { StatusFilterBody } from './StatusFilterBody'

interface MobileStatusFilterProps extends AccordionItemProps {
  button: StatusTypeButton
}

export const MobileStatusFilter = ({
  button,
  ...rest
}: MobileStatusFilterProps) => {
  const { t } = useTranslation()
  return (
    <AccordionItem {...rest}>
      <AccordionButton paddingY="15px">
        <HStack width="100%">
          <HStack width="100%" spacing="10px">
            <button.icon color={button.color} height="20px" />
            <Body1 color={'neutral.900'}>{t(button.text)}</Body1>
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
