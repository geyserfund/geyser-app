import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'

import { ProjectFundingSummary } from '../../../components/ProjectFundingSummary'
import { FundingCheckoutWrapper, FundingSummaryWrapper } from '../../../layouts/FundingSummaryWrapper'

export const FundingGuardiansBottomContent = () => {
  return <FundingGuardiansSummary />
}

export const FundingGuardiansSideContent = () => {
  return (
    <CardLayout w="full" h="full" padding={0}>
      <FundingGuardiansSummary />
    </CardLayout>
  )
}

export const FundingGuardiansSummary = () => {
  const navigate = useNavigate()

  const { project } = useFundingFormAtom()

  const handleCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(getPath('fundingStart', project.name))
  }

  return (
    <VStack
      width="100%"
      height="100%"
      maxHeight={{ base: 'calc(100vh - 177px)', lg: 'auto' }}
      overflowY="auto"
      justifyContent={'space-between'}
    >
      <FundingSummaryWrapper>
        <ProjectFundingSummary />
      </FundingSummaryWrapper>

      <FundingCheckoutWrapper>
        <VStack w="full" alignItems="flex-start">
          <Body size="sm" light>
            {t('By continuing to checkout you are accepting our T&Cs')}
          </Body>
          <Button size="lg" w="full" variant="solid" colorScheme="primary1" onClick={handleCheckout}>
            {t('Checkout')}
          </Button>
        </VStack>
      </FundingCheckoutWrapper>
    </VStack>
  )
}
