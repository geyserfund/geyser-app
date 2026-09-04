import { Button, ButtonProps, Tooltip } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { TEMPORARY_BOLTZ_CONTINGENCY_ENABLED } from '@/modules/project/constants/temporaryBoltzContingency.ts'
import { isManagedRecoverableGrantProject } from '@/modules/project/domain/managedRecoverableGrant.ts'
import { selectedGoalIdAtom } from '@/modules/project/funding/state'
import { useBlockedProjectContribution } from '@/modules/project/hooks/useBlockedProjectContribution.ts'
import { getPath } from '@/shared/constants'
import { useProjectToolkit } from '@/shared/utils/hooks/useProjectToolKit.ts'

import { useProjectAtom } from '../../../../../hooks/useProjectAtom'

type GoalContributeButtonProps = ButtonProps & {
  projectGoalId: string
  isPriorityGoal?: boolean
  isNavButton?: boolean
  displayOnMobile?: boolean
}

export const GoalContributeButton = ({
  projectGoalId,
  isPriorityGoal,
  isNavButton,
  displayOnMobile,
  ...props
}: GoalContributeButtonProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { project } = useProjectAtom()
  const setSelectedGoalId = useSetAtom(selectedGoalIdAtom)
  const { handleBlockedContribution } = useBlockedProjectContribution(project)
  const { isFundingDisabled } = useProjectToolkit(project)

  if (!project) {
    return null
  }

  const hasDirectPaymentDetails = Boolean(
    project.directPaymentDetails?.btcAddress || project.directPaymentDetails?.lightningAddress,
  )
  const managedRecoverableGrant = isManagedRecoverableGrantProject(project)
  const usesTemporaryDirectPayments = TEMPORARY_BOLTZ_CONTINGENCY_ENABLED && !managedRecoverableGrant
  const managedPaymentMethods = project.paymentMethods?.managedRecoverableGrant
  const hasManagedPaymentMethod = Boolean(
    managedPaymentMethods?.stripe || managedPaymentMethods?.strikeLightning || managedPaymentMethods?.strikeOnChain,
  )
  const hasStripePaymentMethod = Boolean(project.paymentMethods?.fiat?.stripe)

  const handleContributeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (isFundingDisabled()) return

    if (isPriorityGoal) {
      setSelectedGoalId(null)
    } else {
      setSelectedGoalId(projectGoalId)
    }

    if (usesTemporaryDirectPayments && hasDirectPaymentDetails) {
      navigate(`${getPath('project', project.name)}?direct-payment=1`)
      return
    }

    if (handleBlockedContribution(e)) return

    navigate(getPath('projectFunding', project.name))
  }

  const button = isNavButton ? (
    <Button
      variant="solid"
      colorScheme="primary1"
      size="lg"
      width={{ base: '100%', lg: '160px' }}
      display={{ base: displayOnMobile ? 'flex' : 'none', lg: 'flex' }}
      onClick={handleContributeClick}
      isDisabled={
        isFundingDisabled() ||
        (managedRecoverableGrant
          ? !hasManagedPaymentMethod
          : usesTemporaryDirectPayments && !hasStripePaymentMethod
          ? !hasDirectPaymentDetails
          : false)
      }
      {...props}
    >
      {t('Contribute')}
    </Button>
  ) : (
    <Button
      variant={isPriorityGoal ? 'solid' : 'outline'}
      colorScheme={isPriorityGoal ? 'primary1' : 'neutral1'}
      size={'md'}
      width={{ base: '100%', lg: '192px' }}
      onClick={handleContributeClick}
      isDisabled={
        isFundingDisabled() ||
        (managedRecoverableGrant
          ? !hasManagedPaymentMethod
          : usesTemporaryDirectPayments && !hasStripePaymentMethod
          ? !hasDirectPaymentDetails
          : false)
      }
      {...props}
    >
      {t('Contribute')}
    </Button>
  )

  return usesTemporaryDirectPayments && !hasStripePaymentMethod && !hasDirectPaymentDetails ? (
    <Tooltip label={t('Funding is unavailable at the moment, until the creator adds payment details.')}>
      <span tabIndex={0} style={{ display: 'block', width: '100%' }}>
        {button}
      </span>
    </Tooltip>
  ) : (
    button
  )
}
