import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionItemProps,
  AccordionPanel,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { SlLocationPin } from 'react-icons/sl'

import { Body1 } from '../../../../components/typography'
import {
  Country,
  ProjectCountriesGetResult,
  ProjectRegionsGetResult,
} from '../../../../types'
import { RegionFilterBody } from './RegionFilterBody'

interface MobileRegionFilterProps extends AccordionItemProps {
  label: string
  regions: ProjectRegionsGetResult[]
  countries: ProjectCountriesGetResult[]
  options: Country[]
}

export const MobileRegionFilter = ({
  label,
  regions,
  countries,
  options,
  ...rest
}: MobileRegionFilterProps) => {
  return (
    <AccordionItem {...rest}>
      <AccordionButton paddingY="15px">
        <HStack width="100%">
          <SlLocationPin fontSize="20px" color={'neutral.600'} />
          <Body1 fontSize="16px" color={'neutral.800'}>
            {label}
          </Body1>
        </HStack>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel
        as={VStack}
        overflow="hidden"
        paddingX="0px"
        maxHeight="400px"
      >
        <RegionFilterBody {...{ regions, countries, options, onClose() {} }} />
      </AccordionPanel>
    </AccordionItem>
  )
}
