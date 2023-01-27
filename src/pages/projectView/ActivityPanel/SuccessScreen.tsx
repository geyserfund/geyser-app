import { Center, CloseButton, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'
import { BiCopyAlt } from 'react-icons/bi'
import { HiOutlineCheck, HiOutlineSpeakerphone } from 'react-icons/hi'

import { ButtonComponent } from '../../../components/ui'
import { BotTwitterUrl } from '../../../constants'
import { useFundCalc } from '../../../helpers'
import { IFundForm } from '../../../hooks'
import { IFundingTx, IProject } from '../../../interfaces'
import { Satoshis } from '../../../types'
import { FundingTx, Project } from '../../../types/generated/graphql'
import {
  ContributionInfoBox,
  ContributionInfoBoxVersion,
} from '../components/ContributionInfoBox'

type Props = {
  fundingState: IFundForm
  fundingTx: FundingTx | IFundingTx
  project: Project | IProject
  handleCloseButton: () => void
}

export const SuccessScreen = ({
  fundingState,
  fundingTx,
  project,
  handleCloseButton,
}: Props) => {
  const [hasCopiedProjectLink, setCopy] = useState(false)

  const { getTotalAmount } = useFundCalc(fundingState)

  const shareProjectWithFriends = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopy(true)
  }

  useEffect(() => {
    if (hasCopiedProjectLink) {
      setTimeout(() => {
        setCopy(false)
      }, 2000)
    }
  }, [hasCopiedProjectLink])

  return (
    <VStack
      paddingX={{
        base: '10px',
        md: '20px',
      }}
      paddingY={{
        base: '10px',
        md: '64px',
      }}
      spacing={4}
      width="100%"
      height="100%"
      overflowY="hidden"
      position="relative"
      backgroundColor="brand.primary"
      alignItems="center"
      justifyContent="flex-start"
    >
      <ReactConfetti />

      <CloseButton
        borderRadius="50%"
        position="absolute"
        right="10px"
        top="10px"
        onClick={handleCloseButton}
      />

      <VStack spacing={6}>
        <VStack>
          <Text fontSize="22px" fontWeight={'semibold'} textAlign="center">
            Contribution Successful!
          </Text>

          <Center
            boxSize={'85px'}
            borderRadius="full"
            backgroundColor={'brand.neutral50'}
          >
            <HiOutlineCheck color={'brand.textBlack'} fontSize="3rem" />
          </Center>
        </VStack>

        <Text textAlign={'left'}>
          The contribution went through! You can now share this campaign with
          friends.
        </Text>
        {!fundingState.anonymous && (
          <Text textAlign="left" paddingBlockEnd="30px">
            🤖 Check your Twitter! Our bot{' '}
            <a href={BotTwitterUrl}>@geyserfunders</a> just sent out a tweet.
          </Text>
        )}
        <ContributionInfoBox
          project={project as Project}
          formState={fundingState}
          contributionAmount={getTotalAmount('sats', project.name) as Satoshis}
          rewardsEarned={fundingState.rewardsByIDAndCount}
          isFunderAnonymous={fundingState.anonymous}
          funderUsername={fundingState.funderUsername}
          funderEmail={fundingState.email}
          funderAvatarURL={fundingState.funderAvatarURL}
          version={ContributionInfoBoxVersion.PRIMARY}
          referenceCode={fundingTx.uuid}
          showGeyserFee={false}
        />
        <ButtonComponent
          standard
          primary={hasCopiedProjectLink}
          leftIcon={
            hasCopiedProjectLink ? <BiCopyAlt /> : <HiOutlineSpeakerphone />
          }
          width="100%"
          onClick={shareProjectWithFriends}
        >
          {hasCopiedProjectLink
            ? 'Project Link Copied'
            : 'Share This Project With Friends'}
        </ButtonComponent>
      </VStack>
    </VStack>
  )
}
