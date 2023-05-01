import { HStack, Text, VStack } from '@chakra-ui/layout'
import { CloseButton, IconButton, Link } from '@chakra-ui/react'
import { FaTelegramPlane } from 'react-icons/fa'

import { SectionTitle } from '../../../../components/ui'
import { GeyserTelegramUrl } from '../../../../constants'
import { useFundCalc } from '../../../../helpers/fundingCalculation'
import { IFundForm } from '../../../../hooks'
import { IFundingAmounts, IProject } from '../../../../interfaces'
import { Satoshis } from '../../../../types'
import { Project } from '../../../../types/generated/graphql'
import { useMobileMode } from '../../../../utils'
import {
  ContributionInfoBox,
  ContributionInfoBoxVersion,
} from '../../projectMainBody/components/ContributionInfoBox'
import { ProjectFundingQRScreenQRCodeSection } from '../components/ProjectFundingQRScreenQRCodeSection'

type Props = {
  handleCloseButton: () => void
  fundingFlow: any
  amounts: IFundingAmounts
  state: IFundForm
  project: Project | IProject
}

export const ProjectFundingQRScreen = ({
  fundingFlow,
  state,
  project,
  handleCloseButton,
}: Props) => {
  const { getTotalAmount } = useFundCalc(state)
  const isMobile = useMobileMode()

  return (
    <VStack
      padding={isMobile ? '10px 0px' : '10px 20px'}
      spacing="20px"
      width="100%"
      height="100%"
      overflowY="auto"
      margin="10px 15px"
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
      paddingX={5}
      marginTop={2}
    >
      <HStack justifyContent="space-between" width={'full'}>
        <SectionTitle>Confirm & Contribute</SectionTitle>
        <CloseButton onClick={handleCloseButton} />
      </HStack>
      <ProjectFundingQRScreenQRCodeSection fundingFlow={fundingFlow} />
      <ContributionInfoBox
        formState={state}
        version={ContributionInfoBoxVersion.NEUTRAL}
        project={project as Project}
        contributionAmount={getTotalAmount('sats', project.name) as Satoshis}
        isFunderAnonymous={state.anonymous}
        funderUsername={state.funderUsername}
        funderEmail={state.email}
        funderAvatarURL={state.funderAvatarURL}
        backgroundColor={'brand.neutral100'}
        showGeyserFee={true}
      />
      <HStack>
        <Text>
          If you’re experiencing any issues with this payment, please reach out
          to us on Telegram.
        </Text>

        <Link href={GeyserTelegramUrl} isExternal>
          <IconButton
            background={'none'}
            aria-label="telegram"
            icon={<FaTelegramPlane fontSize="20px" />}
            color={'#6C757D'}
          />
        </Link>
      </HStack>

      <Text fontSize="8px" fontWeight={400} color={'brand.gray500'}>
        Geyser is not a store. It’s a way to bring creative projects to life
        using Bitcoin. Your donation will support a creative project that has
        yet to be developed. There’s a risk that, despite a creator’s best
        efforts, your reward will not be fulfilled, and we urge you to consider
        this risk prior to backing it. Geyser is not responsible for project
        claims or reward fulfillment.
      </Text>
    </VStack>
  )
}
