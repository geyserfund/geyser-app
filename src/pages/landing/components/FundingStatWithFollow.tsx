import { HStack, StackProps, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { SatSymbolIcon } from '../../../components/icons'
import { MonoBody1 } from '../../../components/typography'
import { FollowButton } from '../../../modules/project/pages/projectView/views/projectMainBody/components'
import { fonts } from '../../../styles'
import { Project } from '../../../types'
import { getShortAmountLabel, removeProjectAmountException } from '../../../utils'

export interface FundingStatWithFollowProps extends StackProps {
  fundersCount?: number
  amountFunded?: number
  project: Pick<Project, 'id' | 'name' | 'title'>
  bold?: boolean
}

export const FundingStatWithFollow = ({
  bold,
  fundersCount = 0,
  amountFunded = 0,
  project,
  ...rest
}: FundingStatWithFollowProps) => {
  const { t } = useTranslation()

  const isRemoveAmountException = removeProjectAmountException(project.name)
  return (
    <HStack direction={'row'} spacing="20px" {...rest}>
      <VStack alignItems={'center'} spacing={0}>
        <MonoBody1 bold={bold}>{fundersCount}</MonoBody1>

        <Text fontSize="12px" color={'neutral.600'} fontFamily={fonts.mono} textTransform="uppercase">
          {t('funders')}
        </Text>
      </VStack>

      {!isRemoveAmountException && (
        <VStack alignItems={'center'} spacing={0}>
          <HStack spacing="3px">
            <SatSymbolIcon fontSize="14px" />
            <MonoBody1 bold={bold}>{getShortAmountLabel(amountFunded)}</MonoBody1>
          </HStack>
          <Text fontSize="12px" color={'neutral.600'} fontFamily={fonts.mono} textTransform="uppercase">
            {t('funded')}
          </Text>
        </VStack>
      )}
      <FollowButton type="icon" project={project} />
    </HStack>
  )
}
