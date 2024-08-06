import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { FormEvent } from 'react'
import { useNavigate } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts'
import { getPath } from '@/shared/constants'
import { useNotification } from '@/utils'

import { ProjectFundingSummary } from '../../../components/ProjectFundingSummary'

export const FundingDetailsBottomContent = () => {
  return <FundingPaymentsSummary />
}

export const FundingDetailsSideContent = () => {
  return (
    <CardLayout w="full" h="full">
      <FundingPaymentsSummary />
    </CardLayout>
  )
}

export const FundingPaymentsSummary = () => {
  const navigate = useNavigate()
  const toast = useNotification()

  const { project } = useProjectAtom()

  const { isFundingUserInfoValid } = useFundingFormAtom()

  //   const handleCheckoutButtonPressed = (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault()
  //     e.stopPropagation()
  //     const { title, description, valid } = isFundingUserInfoValid

  //     if (valid) {
  //       navigate(getPath('fundingPayment', project.name))
  //     } else {
  //       toast.error({
  //         title,
  //         description,
  //       })
  //     }
  //   }

  return (
    // <form style={{ width: '100%' }} onSubmit={handleCheckoutButtonPressed}>
    <VStack width={'100%'} borderRadius={'md'} spacing={4} alignItems="start">
      <ProjectFundingSummary />

      {/* <Button size={{ base: 'md', lg: 'lg' }} w="full" variant="solid" colorScheme="primary1" type="submit">
          {t('Checkout')}
        </Button> */}
    </VStack>
    // </form>
  )
}
