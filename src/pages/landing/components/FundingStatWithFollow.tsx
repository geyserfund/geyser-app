import { AddIcon } from '@chakra-ui/icons'
import { HStack, Image, StackProps, Text, VStack } from '@chakra-ui/react'

import { SatoshiPng } from '../../../assets'
import { MonoBody1 } from '../../../components/typography'
import { IconButtonComponent } from '../../../components/ui'
import { fonts } from '../../../styles'
import { getShortAmountLabel } from '../../../utils'

interface FundingStatWithFollowProps extends StackProps {
  fundersCount: number
  amountFunded: number
  bold?: boolean
}

export const FundingStatWithFollow = ({
  bold,
  fundersCount,
  amountFunded,
  ...rest
}: FundingStatWithFollowProps) => {
  return (
    <HStack direction={'row'} spacing="20px" {...rest}>
      <VStack alignItems={'center'} spacing={0}>
        <MonoBody1 bold={bold}>{fundersCount}</MonoBody1>

        <Text
          fontSize="12px"
          color={'brand.neutral600'}
          fontFamily={fonts.mono}
          textTransform="uppercase"
        >
          funders
        </Text>
      </VStack>

      <VStack alignItems={'center'} spacing={0}>
        <HStack spacing="3px">
          <Image src={SatoshiPng} height="18px" />
          <MonoBody1 bold={bold}>{getShortAmountLabel(amountFunded)}</MonoBody1>
        </HStack>
        <Text
          fontSize="12px"
          color={'brand.neutral600'}
          fontFamily={fonts.mono}
          textTransform="uppercase"
        >
          Funded
        </Text>
      </VStack>
      <IconButtonComponent
        aria-label="project-follow-icon"
        icon={<AddIcon />}
        borderRadius="8px"
        isDisabled={true} // disabled this for now, will work with this with the follow feature
      />
    </HStack>
  )
}
