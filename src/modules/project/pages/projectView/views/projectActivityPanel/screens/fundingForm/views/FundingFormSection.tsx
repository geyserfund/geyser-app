import { Box, VStack } from '@chakra-ui/react'
import { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'

import { DonationInput } from '../../../../../../../../../components/molecules'
import { useFundingContext } from '../../../../../../../context'
import { SectionTitle } from '../../../components/SectionTitle'
import { SectionTitleBlock } from '../../../components/SectionTitleBlock'
import { FundingFormRewards } from '../../rewardSelection/FundingFormRewards'

type Props = {
  onBackClick: MouseEventHandler<HTMLButtonElement>
}

export const FundingFormSection = ({ onBackClick }: Props) => {
  const { t } = useTranslation()
  const {
    fundForm: { setState },
  } = useFundingContext()

  return (
    <VStack marginTop="0px !important" width="100%" spacing="30px" flex="1" overflowX="visible">
      <Box width="100%">
        <SectionTitleBlock title={t('Contribute')} onBackClick={onBackClick} />

        <SectionTitle paddingTop="20px">{t('Make a donation')}</SectionTitle>
        <DonationInput inputGroup={{ padding: '2px' }} name="donationAmount" onChange={setState} />
      </Box>

      <FundingFormRewards />
    </VStack>
  )
}
