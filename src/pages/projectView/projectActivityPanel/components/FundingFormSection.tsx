import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'

import { DonationInput } from '../../../../components/molecules'
import { SectionTitle } from '../../../../components/ui'
import { useProjectContext } from '../../../../context'
import { FundingFormRewards } from '../screens/rewardSelection/FundingFormRewards'

type Props = {
  onBackClick: MouseEventHandler<HTMLButtonElement>
}

export const FundingFormSection = ({ onBackClick }: Props) => {
  const { t } = useTranslation()
  const {
    fundForm: { setState },
  } = useProjectContext()
  return (
    <VStack
      marginTop="0px !important"
      width="100%"
      spacing="30px"
      flex="1"
      overflowX="visible"
    >
      <Box width="100%">
        <HStack>
          <Button onClick={onBackClick} variant="transparent">
            <ArrowBackIcon />
          </Button>
          <SectionTitle>{t('Donate to this idea')}</SectionTitle>
        </HStack>

        <DonationInput
          inputGroup={{ padding: '2px' }}
          name="donationAmount"
          onChange={setState}
        />
      </Box>

      <FundingFormRewards />
    </VStack>
  )
}
