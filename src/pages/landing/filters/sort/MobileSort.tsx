import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionItemProps,
  AccordionPanel,
  HStack,
  Menu,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsSliders } from 'react-icons/bs'

import { Body1 } from '../../../../components/typography'
import { useFilterContext } from '../../../../context'
import { SortBody } from './SortBody'
import { getCurrentSelection } from './sortSelection'

type MobileSortProps = AccordionItemProps

export const MobileSort = ({ ...rest }: MobileSortProps) => {
  const { t } = useTranslation()
  const { filters } = useFilterContext()
  return (
    <AccordionItem {...rest}>
      <AccordionButton paddingY="15px">
        <HStack width="100%">
          <BsSliders fontSize="16px" color={'neutral.600'} />
          <Body1 fontSize="16px" color={'neutral.800'}>
            {t(getCurrentSelection(filters.sort))}
          </Body1>
        </HStack>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel
        as={VStack}
        overflow="hidden"
        paddingX="0px"
        maxHeight="500px"
      >
        <Menu isOpen={true}>
          <SortBody isMobile />
        </Menu>
      </AccordionPanel>
    </AccordionItem>
  )
}
