import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { FormEvent } from 'react'
import { useNavigate } from 'react-router'

import { useFundingContext } from '@/modules/project/context'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts'
import { getPath } from '@/shared/constants'
import { useNotification } from '@/utils'

import { ProjectFundingSummary } from '../../../components/ProjectFundingSummary'

export const FundingInitBottomContent = () => {
  return <FundingInitSummary />
}

export const FundingInitSideContent = () => {
  return (
    <CardLayout w="full" h="full">
      <FundingInitSummary />
    </CardLayout>
  )
}

export const FundingInitSummary = () => {
  const navigate = useNavigate()
  const { project } = useProjectAtom()
  const toast = useNotification()

  const {
    fundForm: { validateInputAmount },
  } = useFundingContext()

  const handleCheckoutButtonPressed = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const { valid, title, description } = validateInputAmount(project.name)
    if (valid) {
      navigate(getPath('fundingDetails', project.name))
    } else {
      toast.error({
        title,
        description,
      })
    }
  }

  return (
    <form style={{ width: '100%' }} onSubmit={handleCheckoutButtonPressed}>
      <VStack width={'100%'} borderRadius={'md'} spacing={4} alignItems="start">
        <ProjectFundingSummary />

        <Button size={{ base: 'md', lg: 'lg' }} w="full" variant="solid" colorScheme="primary1" type="submit">
          {t('Checkout')}
        </Button>
      </VStack>
    </form>
  )
}
