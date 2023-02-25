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
import { colors } from '../../../../styles'
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
      <AccordionButton>
        <HStack width="100%">
          <SlLocationPin fontSize="20px" color={colors.neutral600} />
          <Body1 fontSize="16px" color={colors.neutral800}>
            {label}
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
        <RegionFilterBody {...{ regions, countries, options, onClose() {} }} />
      </AccordionPanel>
    </AccordionItem>
  )
}
