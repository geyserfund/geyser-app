import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { FormEvent } from 'react'
import { useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { FundingUserInfoError } from '@/modules/project/funding/state/fundingFormAtom'
import { CardLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { useNotification } from '@/utils'

import { ProjectFundingSummary } from '../../../components/ProjectFundingSummary'
import { FundingCheckoutWrapper, FundingSummaryWrapper } from '../../../layouts/FundingSummaryWrapper'

export const FundingDetailsBottomContent = () => {
  return <FundingDetailsSummary />
}

export const FundingDetailsSideContent = () => {
  return (
    <CardLayout w="full" h="full" padding={0}>
      <FundingDetailsSummary />
    </CardLayout>
  )
}

export const FundingDetailsSummary = () => {
  const navigate = useNavigate()
  const toast = useNotification()

  const { isFundingUserInfoValid, project, setErrorstate } = useFundingFormAtom()

  const handleCheckoutButtonPressed = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const { title, description, error, valid } = isFundingUserInfoValid

    if (valid) {
      navigate(getPath('fundingStart', project.name))
    } else if (error === FundingUserInfoError.EMAIL) {
      setErrorstate({ key: 'email', value: 'Email is a required field' })
      toast.error({
        title,
        description,
      })
    } else if (error === FundingUserInfoError.PRIVATE_COMMENT) {
      setErrorstate({ key: 'privateComment', value: 'Private message is a required field' })
      toast.error({
        title,
        description,
      })
    }
  }

  return (
    <form style={{ width: '100%', height: '100%' }} onSubmit={handleCheckoutButtonPressed}>
      <FundingSummaryWrapper>
        <ProjectFundingSummary />
      </FundingSummaryWrapper>

      <FundingCheckoutWrapper>
        <VStack w="full">
          <Body size="sm" light>
            {t('By continuing to checkout you are accepting our T&Cs')}
          </Body>
          <Button size="lg" w="full" variant="solid" colorScheme="primary1" type="submit">
            {t('Checkout')}
          </Button>
        </VStack>
      </FundingCheckoutWrapper>
    </form>
  )
}
