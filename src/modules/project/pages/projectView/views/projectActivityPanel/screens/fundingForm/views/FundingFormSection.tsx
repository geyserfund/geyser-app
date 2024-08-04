import { Box, VStack } from '@chakra-ui/react'
import { MouseEvent, MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'

import { DonationInput } from '../../../../../../../../../components/molecules'
import { useFundingContext } from '../../../../../../../context'
import { FundingInitRewards } from '../../../../../../../pages1/projectFunding/views/fundingInit/sections/FundingInitRewards'
import { SectionTitle } from '../../../components/SectionTitle'
import { SectionTitleBlock } from '../../../components/SectionTitleBlock'

type Props = {
  onBackClick: MouseEventHandler<HTMLButtonElement>
}

export const FundingFormSection = ({ onBackClick }: Props) => {
  const { t } = useTranslation()

  // const { goals } = useProjectContext()
  const {
    fundForm: { setState },
  } = useFundingContext()

  const handleOnBackClick = (event: MouseEvent<HTMLButtonElement>) => {
    // goals.setProjectGoalId(null)
    onBackClick(event)
  }

  return (
    <VStack marginTop="0px !important" width="100%" spacing="30px" flex="1" overflowX="visible">
      <Box width="100%">
        <SectionTitleBlock title={t('Contribute')} onBackClick={handleOnBackClick} />

        <SectionTitle paddingTop="20px">{t('Make a donation')}</SectionTitle>
        <DonationInput inputGroup={{ padding: '2px' }} name="donationAmount" onChange={setState} />
      </Box>

      <FundingInitRewards />
    </VStack>
  )
}
