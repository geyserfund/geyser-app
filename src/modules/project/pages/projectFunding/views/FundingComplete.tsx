import { Box, Button, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaCheck } from 'react-icons/fa'

import { Grant, ProjectFragment, VotingSystem } from '../../../../../types'
import { ProjectFundingFormState } from './FundingForm'

interface Props {
  formState: ProjectFundingFormState | undefined
  project: ProjectFragment
  grant?: Grant
}

export const FundingComplete = ({ formState, project, grant }: Props) => {
  const { t } = useTranslation()

  const handleClose = () => {
    window.location.reload()
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  const voteCount = () => {
    const amount = formState?.donationAmount || 0
    if (amount >= 1000 && amount <= 9999) {
      return 1
    }

    if (amount >= 10000 && amount <= 99999) {
      return 2
    }

    if (amount >= 100000) {
      return 3
    }

    return 0
  }

  return (
    <VStack justify={'center'} spacing={5}>
      <Box display="flex" justifyContent={'center'} my={4}>
        <Box
          height={'61px'}
          width={'61px'}
          rounded="full"
          display="flex"
          justifyContent={'center'}
          alignItems="center"
          bg="primary.400"
        >
          <FaCheck />
        </Box>
      </Box>
      <VStack alignItems={'flex-start'} w={'100%'}>
        {formState && (
          <Text fontSize={'14px'}>
            {t('You sent')} <Text as="span" fontWeight="bold">{`${formState.donationAmount} sats`}</Text>
            {grant &&
              grant.__typename === 'CommunityVoteGrant' &&
              grant.votingSystem === VotingSystem.StepLog_10 &&
              voteCount() > 0 && (
                <>
                  {', equivalent to '}
                  <Text as="span" fontWeight="bold">
                    {`${voteCount()} votes, `}
                  </Text>
                </>
              )}
            {t('to')}{' '}
            <Text as="span" fontWeight="bold">
              {project.title}
            </Text>
            !
          </Text>
        )}
        <Text fontSize={'14px'}>{t('Thank you for contributing to Bitcoin projects.')}</Text>

        <Text fontSize={'14px'}>{t('Share the grant on social media to get more votes and contributions!')}</Text>
      </VStack>
      <VStack w={'100%'}>
        <Button w={'100%'} variant={'secondary'} onClick={handleCopyLink}>
          {t('Copy Grant Link')}
        </Button>
        <Button w={'100%'} variant={'primary'} onClick={handleClose}>
          {t('Close')}
        </Button>
      </VStack>
    </VStack>
  )
}
