import { Button, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { PiArrowUpRight } from 'react-icons/pi'
import { Link as RouterLink } from 'react-router'

import { useAuthContext } from '@/context'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants/index.ts'

import { BLOCK_EXPLORER_BASE_URL } from '../../../utils/constants.ts'
import { swapTransactionAtom } from '../../fundingPayment/views/paymentOnchain/states/onChainTransaction.ts'

export const ContributionStatusSection = ({ isPending }: { isPending: boolean }) => {
  return (
    <VStack w="full" spacing={2} zIndex={1}>
      {isPending && <Body size="md">{t('Your transaction is being processed. You can safely leave this page.')}</Body>}
      <ViewContributionStatusButton isPending={isPending} />
      <ViewMempoolSpaceTransactionButton />
    </VStack>
  )
}

const ViewContributionStatusButton = ({ isPending }: { isPending: boolean }) => {
  const { isLoggedIn } = useAuthContext()
  const { project } = useProjectAtom()

  if (!isLoggedIn && isPending) {
    return null
  }

  return (
    <Button
      as={RouterLink}
      to={getPath('project', project.name)}
      size="lg"
      variant="solid"
      colorScheme="primary1"
      width="310px"
    >
      {isPending ? t('View contribution status') : t('Go to project')}
    </Button>
  )
}

const ViewMempoolSpaceTransactionButton = () => {
  const swapTransaction = useAtomValue(swapTransactionAtom)

  const transactionId = swapTransaction.id

  if (!swapTransaction || !transactionId) {
    return null
  }

  return (
    <Button
      size="lg"
      {...(transactionId && { as: Link, href: `${BLOCK_EXPLORER_BASE_URL}${transactionId}` })}
      isExternal
      variant="solid"
      colorScheme="neutral1"
      width="310px"
      isDisabled={!transactionId}
      rightIcon={<PiArrowUpRight />}
    >
      {t('View transaction on explorer')}
    </Button>
  )
}
