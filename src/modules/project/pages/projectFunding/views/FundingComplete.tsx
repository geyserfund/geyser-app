import { Box, Button, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaCheck } from 'react-icons/fa'

import { ProjectFragment } from '../../../../../types'
import { ProjectFundingFormState } from './FundingForm'

interface Props {
  formState: ProjectFundingFormState | undefined
  project: ProjectFragment
}

export const FundingComplete = ({ formState, project }: Props) => {
  const { t } = useTranslation()

  const handleClose = () => {
    window.location.reload()
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
      <VStack>
        {formState && (
          <Text fontSize={'14px'}>
            {t('You sent')} <Text as="span" fontWeight="bold">{`${formState.donationAmount} sats`}</Text> {t('to')}{' '}
            <Text as="span" fontWeight="bold">
              {project.name}
            </Text>
            !
          </Text>
        )}
        <Text fontSize={'14px'}>{t('Thank you for contributing to Bitcoin projects.')}</Text>

        <Button variant={'primary'} onClick={handleClose}>
          {t('Close')}
        </Button>
      </VStack>
    </VStack>
  )
}
