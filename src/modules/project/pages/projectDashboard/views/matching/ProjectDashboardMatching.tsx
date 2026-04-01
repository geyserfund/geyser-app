import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Link,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useMemo, useState } from 'react'

import { useAuthContext } from '@/context/auth.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import {
  normalizeProjectMatchingUrl,
  formatProjectMatchingFormAmount,
  parseProjectMatchingFormAmount,
} from '@/modules/project/matching/utils/projectMatching'
import { TooltipPopover } from '@/shared/components/feedback/TooltipPopover.tsx'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body, H3 } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { AlertDialogue } from '@/shared/molecules/AlertDialogue'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import {
  ProjectMatchingCurrency,
  ProjectMatchingFragment,
  ProjectMatchingStatus,
  useProjectDashboardMatchingsGetQuery,
  useProjectMatchingCreateMutation,
  useProjectMatchingUpdateMutation,
} from '@/types'
import { useNotification } from '@/utils'

import { DashboardLayout } from '../../common/DashboardLayout.tsx'

type MatchingFormState = {
  sponsorName: string
  sponsorUrl: string
  referenceCurrency: ProjectMatchingCurrency
  maxCapAmount: string
}

const defaultCreateState: MatchingFormState = {
  sponsorName: '',
  sponsorUrl: '',
  referenceCurrency: ProjectMatchingCurrency.Usdcent,
  maxCapAmount: '',
}

type MatchingCardProps = {
  title: string
  matching: ProjectMatchingFragment
  canEdit?: boolean
  onEdit?: () => void
}

const MatchingCard = ({ title, matching, canEdit, onEdit }: MatchingCardProps) => {
  const { formatAmount } = useCurrencyFormatter()
  const sponsorUrl = normalizeProjectMatchingUrl(matching.sponsorUrl)

  return (
    <VStack w="full" alignItems="start" spacing={4} border="1px solid" borderColor="neutral1.6" borderRadius="12px" p={5}>
      <HStack w="full" justifyContent="space-between" alignItems="start" spacing={4}>
        <VStack alignItems="start" spacing={1}>
          <Body size="lg" bold>
            {title}
          </Body>
          {sponsorUrl ? (
            <Link href={sponsorUrl} isExternal textDecoration="underline">
              <Body size="sm">{`${t('Sponsor')}: ${matching.sponsorName}`}</Body>
            </Link>
          ) : (
            <Body size="sm">{`${t('Sponsor')}: ${matching.sponsorName}`}</Body>
          )}
        </VStack>
        {canEdit && onEdit && (
          <Button size="sm" colorScheme="primary1" onClick={onEdit}>
            {t('Edit')}
          </Button>
        )}
      </HStack>

      <VStack alignItems="start" spacing={1}>
        <Body size="sm">
          {`${t('Amount')}: ${formatAmount(matching.maxCapAmount, matching.referenceCurrency)}`}
        </Body>
        <Body size="sm">
          {`${t('Matched contributions (total)')}: ${formatAmount(
            matching.totalMatchedAmount,
            matching.referenceCurrency,
          )}`}
        </Body>
        <Body size="sm">
          {`${t('Remaining matching funds')}: ${formatAmount(
            matching.remainingCapAmount,
            matching.referenceCurrency,
          )}`}
        </Body>
      </VStack>
    </VStack>
  )
}

export const ProjectDashboardMatching = () => {
  const toast = useNotification()
  const { user } = useAuthContext()
  const { project, partialUpdateProject } = useProjectAtom()
  const { formatAmount } = useCurrencyFormatter()

  const createModal = useModal()
  const createConfirmModal = useModal()
  const editModal = useModal()
  const editConfirmModal = useModal()

  const [createState, setCreateState] = useState<MatchingFormState>(defaultCreateState)
  const [createError, setCreateError] = useState<string | null>(null)
  const [editAmount, setEditAmount] = useState('')
  const [editError, setEditError] = useState<string | null>(null)
  const [selectedMatching, setSelectedMatching] = useState<ProjectMatchingFragment | null>(null)

  const { data, loading, refetch } = useProjectDashboardMatchingsGetQuery({
    variables: { where: { id: project.id } },
    skip: !project.id,
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (data?.projectGet) {
      partialUpdateProject({ activeMatching: data.projectGet.activeMatching })
    }
  }, [data, partialUpdateProject])

  const [createMatching, createMatchingState] = useProjectMatchingCreateMutation()
  const [updateMatching, updateMatchingState] = useProjectMatchingUpdateMutation()

  const activeMatching = data?.projectGet?.activeMatching ?? project.activeMatching
  const matchings = data?.projectGet?.matchings ?? []
  const completedMatchings = useMemo(
    () => matchings.filter((matching) => matching.status === ProjectMatchingStatus.Completed),
    [matchings],
  )

  const resetCreateState = () => {
    setCreateState(defaultCreateState)
    setCreateError(null)
  }

  function handleCreateOpen() {
    resetCreateState()
    createModal.onOpen()
  }

  const renderCreateButton = () => {
    const button = (
      <Button colorScheme="primary1" onClick={handleCreateOpen} isDisabled={Boolean(activeMatching)}>
        {t('Create matching')}
      </Button>
    )

    if (!activeMatching) {
      return button
    }

    return (
      <TooltipPopover text={t('A project can only have one active matching at a time')}>
        <Box display="inline-flex">{button}</Box>
      </TooltipPopover>
    )
  }

  const validateCreateState = () => {
    const parsedAmount = parseProjectMatchingFormAmount({
      value: createState.maxCapAmount,
      referenceCurrency: createState.referenceCurrency,
    })
    const normalizedSponsorUrl =
      createState.sponsorUrl.trim().length > 0 ? normalizeProjectMatchingUrl(createState.sponsorUrl) : null

    if (!createState.sponsorName.trim()) {
      return t('Sponsor name is required.')
    }

    if (!parsedAmount) {
      return t('Enter a valid matching cap.')
    }

    if (createState.sponsorUrl.trim().length > 0 && !normalizedSponsorUrl) {
      return t('Enter a valid sponsor URL.')
    }

    return null
  }

  const handleCreateRequest = () => {
    const nextError = validateCreateState()
    setCreateError(nextError)

    if (!nextError) {
      createConfirmModal.onOpen()
    }
  }

  const submitCreate = async () => {
    const normalizedSponsorUrl =
      createState.sponsorUrl.trim().length > 0 ? normalizeProjectMatchingUrl(createState.sponsorUrl) : null

    try {
      await createMatching({
        variables: {
          input: {
            projectId: project.id,
            sponsorName: createState.sponsorName.trim(),
            sponsorUrl: normalizedSponsorUrl,
            referenceCurrency: createState.referenceCurrency,
            maxCapAmount: parseProjectMatchingFormAmount({
              value: createState.maxCapAmount,
              referenceCurrency: createState.referenceCurrency,
            }),
          },
        },
      })

      toast.success({ title: t('Matching created') })
      createConfirmModal.onClose()
      createModal.onClose()
      resetCreateState()
      await refetch()
    } catch (error) {
      toast.error({
        title: t('Unable to create matching'),
        description: error instanceof Error ? error.message : t('Please try again.'),
      })
    }
  }

  const openEditModal = (matching: ProjectMatchingFragment) => {
    setSelectedMatching(matching)
    setEditAmount(
      formatProjectMatchingFormAmount({
        amount: matching.maxCapAmount,
        referenceCurrency: matching.referenceCurrency,
      }),
    )
    setEditError(null)
    editModal.onOpen()
  }

  const handleEditRequest = () => {
    if (!selectedMatching) return

    const parsedAmount = parseProjectMatchingFormAmount({
      value: editAmount,
      referenceCurrency: selectedMatching.referenceCurrency,
    })

    if (!parsedAmount) {
      setEditError(t('Enter a valid matching cap.'))
      return
    }

    if (parsedAmount < selectedMatching.totalMatchedAmount) {
      setEditError(t('Matching cap cannot be lower than the amount already matched.'))
      return
    }

    setEditError(null)

    if (parsedAmount === selectedMatching.totalMatchedAmount) {
      editConfirmModal.onOpen()
      return
    }

    void submitEdit()
  }

  const submitEdit = async () => {
    if (!selectedMatching) return

    try {
      await updateMatching({
        variables: {
          input: {
            matchingId: selectedMatching.id,
            maxCapAmount: parseProjectMatchingFormAmount({
              value: editAmount,
              referenceCurrency: selectedMatching.referenceCurrency,
            }),
          },
        },
      })

      toast.success({ title: t('Matching updated') })
      editConfirmModal.onClose()
      editModal.onClose()
      setSelectedMatching(null)
      setEditAmount('')
      await refetch()
    } catch (error) {
      toast.error({
        title: t('Unable to update matching'),
        description: error instanceof Error ? error.message : t('Please try again.'),
      })
    }
  }

  const canEditActiveMatching = Boolean(
    activeMatching && user.id && String(activeMatching.ownerUserId) === String(user.id),
  )

  return (
    <>
      <DashboardLayout desktopTitle={t('Matching')} titleRightComponent={renderCreateButton()}>
        <VStack width="100%" alignItems="flex-start" spacing={6} paddingX={{ base: 0, lg: 6 }}>
          <Body size="sm" light maxWidth="760px">
            {t(
              'Sponsored matchings means that a sponsor has committed to double contributions to your project up to some total amount. You can add a matching manually, or it can be added by others to your project and they will show here.',
            )}
          </Body>
          {loading && !data ? (
            <HStack w="full" justifyContent="center" py={10}>
              <Spinner />
            </HStack>
          ) : (
            <>
              <VStack w="full" alignItems="start" spacing={4}>
                <H3 size="lg" bold>
                  {t('Active matching')}
                </H3>
                {activeMatching ? (
                  <MatchingCard
                    title={t('Live now')}
                    matching={activeMatching}
                    canEdit={canEditActiveMatching}
                    onEdit={() => openEditModal(activeMatching)}
                  />
                ) : (
                  <VStack
                    w="full"
                    alignItems="start"
                    spacing={2}
                    border="1px solid"
                    borderColor="neutral1.6"
                    borderRadius="12px"
                    p={5}
                  >
                    <Body size="md" bold>
                      {t('No active matching')}
                    </Body>
                    <Body size="sm" light>
                      {t('Create a matching to start doubling eligible contributions on this project.')}
                    </Body>
                  </VStack>
                )}
              </VStack>

              <VStack w="full" alignItems="start" spacing={4}>
                <H3 size="lg" bold>
                  {t('Completed matchings')}
                </H3>
                {completedMatchings.length > 0 ? (
                  completedMatchings.map((matching) => (
                    <MatchingCard key={matching.id} title={t('Completed')} matching={matching} />
                  ))
                ) : (
                  <Body size="sm" light>
                    {t('No completed matchings yet.')}
                  </Body>
                )}
              </VStack>
            </>
          )}
        </VStack>
      </DashboardLayout>

      <Modal
        isOpen={createModal.isOpen}
        onClose={createModal.onClose}
        title={t('Create matching')}
        subtitle={t('Set the sponsor and cap for this project matching pool.')}
      >
        <VStack w="full" spacing={4} alignItems="start" pt={4}>
          <FormControl isRequired>
            <FormLabel>{t('Sponsor name')}</FormLabel>
            <Input
              value={createState.sponsorName}
              onChange={(event) => setCreateState((current) => ({ ...current, sponsorName: event.target.value }))}
            />
          </FormControl>

          <FormControl isInvalid={Boolean(createState.sponsorUrl.trim()) && !normalizeProjectMatchingUrl(createState.sponsorUrl)}>
            <FormLabel>{t('Sponsor social / website URL')}</FormLabel>
            <Input
              value={createState.sponsorUrl}
              onChange={(event) => setCreateState((current) => ({ ...current, sponsorUrl: event.target.value }))}
              placeholder="https://"
            />
          </FormControl>

          <FormControl>
            <FormLabel>{t('Reference currency')}</FormLabel>
            <HStack w="full" spacing={3}>
              <Button
                flex={1}
                variant={createState.referenceCurrency === ProjectMatchingCurrency.Btcsat ? 'solid' : 'outline'}
                colorScheme="primary1"
                onClick={() =>
                  setCreateState((current) => ({ ...current, referenceCurrency: ProjectMatchingCurrency.Btcsat }))
                }
              >
                {t('Sats')}
              </Button>
              <Button
                flex={1}
                variant={createState.referenceCurrency === ProjectMatchingCurrency.Usdcent ? 'solid' : 'outline'}
                colorScheme="primary1"
                onClick={() =>
                  setCreateState((current) => ({ ...current, referenceCurrency: ProjectMatchingCurrency.Usdcent }))
                }
              >
                {t('USD')}
              </Button>
            </HStack>
          </FormControl>

          <FormControl isInvalid={Boolean(createError)}>
            <FormLabel>
              {createState.referenceCurrency === ProjectMatchingCurrency.Usdcent
                ? t('Amount cap (USD)')
                : t('Amount cap (sats)')}
            </FormLabel>
            <Input
              type="number"
              min={0}
              value={createState.maxCapAmount}
              onChange={(event) => setCreateState((current) => ({ ...current, maxCapAmount: event.target.value }))}
            />
            {createError && <FormErrorMessage>{createError}</FormErrorMessage>}
          </FormControl>

          <HStack w="full" justifyContent="flex-end" spacing={3}>
            <Button variant="soft" colorScheme="neutral1" onClick={createModal.onClose}>
              {t('Cancel')}
            </Button>
            <Button colorScheme="primary1" onClick={handleCreateRequest} isLoading={createMatchingState.loading}>
              {t('Save')}
            </Button>
          </HStack>
        </VStack>
      </Modal>

      <Modal
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
        title={t('Edit matching')}
        subtitle={t('Update the maximum cap for this matching.')}
      >
        <VStack w="full" spacing={4} alignItems="start" pt={4}>
          <FormControl isInvalid={Boolean(editError)}>
            <FormLabel>
              {selectedMatching?.referenceCurrency === ProjectMatchingCurrency.Usdcent
                ? t('Amount cap (USD)')
                : t('Amount cap (sats)')}
            </FormLabel>
            <Input type="number" min={0} value={editAmount} onChange={(event) => setEditAmount(event.target.value)} />
            {selectedMatching && (
              <Body size="sm" light>
                {t('Matched to date')}: {formatAmount(selectedMatching.totalMatchedAmount, selectedMatching.referenceCurrency)}
              </Body>
            )}
            {editError && <FormErrorMessage>{editError}</FormErrorMessage>}
          </FormControl>

          <HStack w="full" justifyContent="flex-end" spacing={3}>
            <Button variant="soft" colorScheme="neutral1" onClick={editModal.onClose}>
              {t('Cancel')}
            </Button>
            <Button colorScheme="primary1" onClick={handleEditRequest} isLoading={updateMatchingState.loading}>
              {t('Save')}
            </Button>
          </HStack>
        </VStack>
      </Modal>

      <AlertDialogue
        isOpen={createConfirmModal.isOpen}
        onClose={createConfirmModal.onClose}
        title={t('Matching will go live immediately')}
        description={t('The matching will become active right away on incoming contributions.')}
        hasCancel
        positiveButtonProps={{
          children: t('Continue'),
          onClick: () => void submitCreate(),
          isLoading: createMatchingState.loading,
        }}
      />

      <AlertDialogue
        isOpen={editConfirmModal.isOpen}
        onClose={editConfirmModal.onClose}
        title={t('Complete matching')}
        description={t(
          'You set the matching cap equal to the amount matched to date. This will complete the matching. Are you sure you want to continue?',
        )}
        hasCancel
        positiveButtonProps={{
          children: t('Continue'),
          onClick: () => void submitEdit(),
          isLoading: updateMatchingState.loading,
        }}
      />
    </>
  )
}
