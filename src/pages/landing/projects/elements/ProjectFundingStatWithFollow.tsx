import { AddIcon } from '@chakra-ui/icons'
import { HStack, Image, StackProps, Text, VStack } from '@chakra-ui/react'

import { SatoshiPng } from '../../../../assets'
import { MonoBody1 } from '../../../../components/typography'
import { IconButtonComponent } from '../../../../components/ui'
import { fonts } from '../../../../styles'
import { Project } from '../../../../types'
import { getShortAmountLabel } from '../../../../utils'

interface ProjectFundingStatWithFollowProps extends StackProps {
  project: Project
  bold?: boolean
}

export const ProjectFundingStatWithFollow = ({
  project,
  bold,
  ...rest
}: ProjectFundingStatWithFollowProps) => {
  return (
    <HStack direction={'row'} spacing="20px" {...rest}>
      <VStack alignItems={'center'} spacing={0}>
        <MonoBody1 bold={bold}>{project.fundersCount}</MonoBody1>

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
          <MonoBody1 bold={bold}>
            {getShortAmountLabel(project.balance)}
          </MonoBody1>
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
      />
    </HStack>
  )
}
