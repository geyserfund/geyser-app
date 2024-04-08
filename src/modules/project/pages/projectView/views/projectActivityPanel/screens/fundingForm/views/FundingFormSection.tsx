import { Box, HStack, IconButton, VStack } from '@chakra-ui/react'
import { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { PiCaretLeftBold } from 'react-icons/pi'

import { DonationInput } from '../../../../../../../../../components/molecules'
import { SectionTitle } from '../../../../../../../../../components/ui'
import { useProjectContext } from '../../../../../../../context'
import { FundingFormRewards } from '../../rewardSelection/FundingFormRewards'

type Props = {
  onBackClick: MouseEventHandler<HTMLButtonElement>
}

export const FundingFormSection = ({ onBackClick }: Props) => {
  const { t } = useTranslation()
  const {
    fundForm: { setState },
  } = useProjectContext()
  return (
    <VStack marginTop="0px !important" width="100%" spacing="30px" flex="1" overflowX="visible">
      <Box width="100%">
        <HStack mb={2}>
          <IconButton
            aria-label="back-icon"
            size="sm"
            icon={<PiCaretLeftBold />}
            onClick={onBackClick}
            variant="neutral"
          />

          <SectionTitle>{t('Contribute')}</SectionTitle>
        </HStack>

        <SectionTitle>{t('Make a donation')}</SectionTitle>
        <DonationInput inputGroup={{ padding: '2px' }} name="donationAmount" onChange={setState} />
      </Box>

      <FundingFormRewards />
    </VStack>
  )
}
