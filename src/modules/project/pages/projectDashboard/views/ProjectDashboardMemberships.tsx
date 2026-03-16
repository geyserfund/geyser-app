import { useMutation } from '@apollo/client'
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo, useState } from 'react'

import { useProjectSubscriptionsAPI } from '@/modules/project/API/useProjectSubscriptionsAPI.ts'
import {
  useProjectAtom,
  useRecurringContributionSupportAtom,
  useSubscriptionsAtom,
} from '@/modules/project/hooks/useProjectAtom'
import {
  CreateProjectSubscriptionPlanMutation,
  CreateProjectSubscriptionPlanMutationVariables,
  MUTATION_PROJECT_SUBSCRIPTION_PLAN_CREATE,
  MUTATION_PROJECT_SUBSCRIPTION_PLAN_DELETE,
  MUTATION_PROJECT_SUBSCRIPTION_PLAN_UPDATE,
  ProjectSubscriptionPlan,
  recurringIntervals,
  UpdateProjectSubscriptionPlanMutation,
  UpdateProjectSubscriptionPlanMutationVariables,
} from '@/modules/project/recurring/graphql'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'
import { centsToDollars, commaFormatted, toInt, useNotification } from '@/utils'

import { DashboardLayout } from '../common/DashboardLayout.tsx'

type PlanFormState = {
  name: string
  description: string
  interval: 'MONTHLY' | 'YEARLY'
  amountUsdCent: number
  amountBtcSat: number
  isHidden: boolean
}

const defaultPlanFormState: PlanFormState = {
  name: '',
  description: '',
  interval: recurringIntervals.monthly,
  amountUsdCent: 1000,
  amountBtcSat: 40000,
  isHidden: false,
}

export const ProjectDashboardMemberships = () => {
  const toast = useNotification()
  const { project } = useProjectAtom()
  const { subscriptions } = useSubscriptionsAtom()
  const { recurringContributionSupport } = useRecurringContributionSupportAtom()
  const { queryProjectSubscriptions } = useProjectSubscriptionsAPI(true)

  const [selectedPlan, setSelectedPlan] = useState<ProjectSubscriptionPlan | null>(null)
  const [formState, setFormState] = useState<PlanFormState>(defaultPlanFormState)
  const [isOpen, setIsOpen] = useState(false)

  const [createPlan, createPlanState] = useMutation<
    CreateProjectSubscriptionPlanMutation,
    CreateProjectSubscriptionPlanMutationVariables
  >(MUTATION_PROJECT_SUBSCRIPTION_PLAN_CREATE)
  const [updatePlan, updatePlanState] = useMutation<
    UpdateProjectSubscriptionPlanMutation,
    UpdateProjectSubscriptionPlanMutationVariables
  >(MUTATION_PROJECT_SUBSCRIPTION_PLAN_UPDATE)
  const [deletePlan, deletePlanState] = useMutation(MUTATION_PROJECT_SUBSCRIPTION_PLAN_DELETE)

  const { loading } = queryProjectSubscriptions

  const supportMessage = useMemo(() => {
    if (project.fundingStrategy !== 'TAKE_IT_ALL') {
      return t('Recurring memberships are available only for Take-it-all projects.')
    }

    if (recurringContributionSupport?.reason) {
      return recurringContributionSupport.reason
    }

    if (!recurringContributionSupport?.stripe) {
      return t('Bitcoin memberships can work now. Connect Stripe to enable automated fiat renewals.')
    }

    return t('Members can pay with either Bitcoin or card. Card renewals are automatic once Stripe is ready.')
  }, [project.fundingStrategy, recurringContributionSupport])

  const openCreateModal = () => {
    setSelectedPlan(null)
    setFormState(defaultPlanFormState)
    setIsOpen(true)
  }

  const openEditModal = (plan: ProjectSubscriptionPlan) => {
    setSelectedPlan(plan)
    setFormState({
      name: plan.name,
      description: plan.description || '',
      interval: plan.interval,
      amountUsdCent: plan.amountUsdCent,
      amountBtcSat: plan.amountBtcSat,
      isHidden: Boolean(plan.isHidden),
    })
    setIsOpen(true)
  }

  const refetchPlans = () => {
    queryProjectSubscriptions.execute()
  }

  const handleSubmit = async () => {
    try {
      if (selectedPlan) {
        await updatePlan({
          variables: {
            input: {
              id: toInt(selectedPlan.id),
              ...formState,
            },
          },
        })
        toast.success({ title: t('Membership plan updated') })
      } else {
        await createPlan({
          variables: {
            input: {
              projectId: toInt(project.id),
              ...formState,
            },
          },
        })
        toast.success({ title: t('Membership plan created') })
      }

      setIsOpen(false)
      refetchPlans()
    } catch (error) {
      toast.error({
        title: t('Unable to save membership plan'),
        description: error instanceof Error ? error.message : t('Please try again.'),
      })
    }
  }

  const handleDelete = async (plan: ProjectSubscriptionPlan) => {
    try {
      await deletePlan({ variables: { id: toInt(plan.id) } })
      toast.success({ title: t('Membership plan deleted') })
      refetchPlans()
    } catch (error) {
      toast.error({
        title: t('Unable to delete membership plan'),
        description: error instanceof Error ? error.message : t('Please try again.'),
      })
    }
  }

  return (
    <DashboardLayout desktopTitle={t('Memberships')} width="full" overflow="hidden">
      <VStack width="100%" alignItems="flex-start" px={standardPadding} spacing={6}>
        <CardLayout w="full" alignItems="start" spacing={3}>
          <Body size="lg" bold>
            {t('Recurring membership setup')}
          </Body>
          <Body size="sm" light>
            {supportMessage}
          </Body>
          <HStack spacing={3}>
            <Button
              colorScheme="primary1"
              onClick={openCreateModal}
              isDisabled={project.fundingStrategy !== 'TAKE_IT_ALL'}
            >
              {t('New membership plan')}
            </Button>
            <Button variant="outline" colorScheme="neutral1" onClick={refetchPlans} isLoading={loading}>
              {t('Refresh')}
            </Button>
          </HStack>
        </CardLayout>

        <VStack w="full" alignItems="start" spacing={4}>
          {subscriptions.length === 0 ? (
            <CardLayout w="full" alignItems="start">
              <Body size="md" light>
                {t('No membership plans yet. Add a plan with both USD and Bitcoin pricing to get started.')}
              </Body>
            </CardLayout>
          ) : (
            subscriptions.map((plan) => (
              <CardLayout key={plan.id} w="full" alignItems="start" spacing={4}>
                <HStack w="full" justifyContent="space-between" alignItems="start">
                  <VStack alignItems="start" spacing={1}>
                    <Body size="lg" bold>
                      {plan.name}
                    </Body>
                    {plan.description && (
                      <Body size="sm" light>
                        {plan.description}
                      </Body>
                    )}
                  </VStack>
                  <Body size="sm" light color={plan.isHidden ? 'orange.9' : 'primary1.9'}>
                    {plan.isHidden ? t('Hidden') : t('Live')}
                  </Body>
                </HStack>
                <HStack spacing={6} flexWrap="wrap">
                  <Body size="sm">{`${centsToDollars(plan.amountUsdCent)} USD`}</Body>
                  <Body size="sm">{`${commaFormatted(plan.amountBtcSat)} sats`}</Body>
                  <Body size="sm">{plan.interval === recurringIntervals.yearly ? t('Yearly') : t('Monthly')}</Body>
                </HStack>
                <HStack spacing={3}>
                  <Button size="sm" colorScheme="primary1" onClick={() => openEditModal(plan)}>
                    {t('Edit')}
                  </Button>
                  <Button size="sm" variant="outline" colorScheme="neutral1" onClick={() => handleDelete(plan)}>
                    {t('Delete')}
                  </Button>
                </HStack>
              </CardLayout>
            ))
          )}
        </VStack>
      </VStack>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedPlan ? t('Edit membership plan') : t('Create membership plan')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>{t('Name')}</FormLabel>
                <Input
                  value={formState.name}
                  onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
                />
              </FormControl>
              <FormControl>
                <FormLabel>{t('Description')}</FormLabel>
                <Textarea
                  value={formState.description}
                  onChange={(event) => setFormState((current) => ({ ...current, description: event.target.value }))}
                />
              </FormControl>
              <HStack w="full" spacing={4}>
                <FormControl>
                  <FormLabel>{t('USD amount')}</FormLabel>
                  <Input
                    type="number"
                    value={formState.amountUsdCent / 100}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        amountUsdCent: Math.round(Number(event.target.value || 0) * 100),
                      }))
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>{t('Bitcoin amount (sats)')}</FormLabel>
                  <Input
                    type="number"
                    value={formState.amountBtcSat}
                    onChange={(event) =>
                      setFormState((current) => ({
                        ...current,
                        amountBtcSat: Math.round(Number(event.target.value || 0)),
                      }))
                    }
                  />
                </FormControl>
              </HStack>
              <HStack w="full" spacing={4}>
                <FormControl>
                  <FormLabel>{t('Interval')}</FormLabel>
                  <HStack>
                    <Button
                      variant={formState.interval === recurringIntervals.monthly ? 'solid' : 'outline'}
                      colorScheme="primary1"
                      onClick={() => setFormState((current) => ({ ...current, interval: recurringIntervals.monthly }))}
                    >
                      {t('Monthly')}
                    </Button>
                    <Button
                      variant={formState.interval === recurringIntervals.yearly ? 'solid' : 'outline'}
                      colorScheme="primary1"
                      onClick={() => setFormState((current) => ({ ...current, interval: recurringIntervals.yearly }))}
                    >
                      {t('Yearly')}
                    </Button>
                  </HStack>
                </FormControl>
                <FormControl display="flex" alignItems="center" gap={3} pt={8}>
                  <FormLabel mb={0}>{t('Hidden')}</FormLabel>
                  <Switch
                    isChecked={formState.isHidden}
                    onChange={(event) => setFormState((current) => ({ ...current, isHidden: event.target.checked }))}
                  />
                </FormControl>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button variant="soft" colorScheme="neutral1" onClick={() => setIsOpen(false)}>
              {t('Cancel')}
            </Button>
            <Button
              colorScheme="primary1"
              onClick={handleSubmit}
              isLoading={createPlanState.loading || updatePlanState.loading || deletePlanState.loading}
            >
              {selectedPlan ? t('Save changes') : t('Create plan')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  )
}
