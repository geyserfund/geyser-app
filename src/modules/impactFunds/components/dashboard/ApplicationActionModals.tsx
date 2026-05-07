import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { type FormEvent, useEffect, useState } from 'react'

import { Body } from '@/shared/components/typography/Body.tsx'
import {
  ImpactFundApplicationFundingModel,
  ImpactFundApplicationStatus,
  useImpactFundApplicationFundingSetMutation,
  useImpactFundApplicationNoteCreateMutation,
  useImpactFundApplicationUpdateMutation,
} from '@/types'
import { useNotification } from '@/utils'

import type { DashboardAction } from './ApplicationActionsMenu'
import { applicationStatusLabels, fundingModelLabels, fundingModelOptions, statusOptions } from './dashboardConstants'

type ActiveAction = {
  type: DashboardAction
  applicationId: string
  currentStatus: ImpactFundApplicationStatus
  currentFundingModel: ImpactFundApplicationFundingModel
  projectTitle?: string
} | null

type ApplicationActionModalsProps = {
  activeAction: ActiveAction
  onClose: () => void
  onSuccess: () => Promise<unknown> | void
}

export function ApplicationActionModals({ activeAction, onClose, onSuccess }: ApplicationActionModalsProps) {
  return (
    <>
      <NoteModal activeAction={activeAction} onClose={onClose} onSuccess={onSuccess} />
      <DisbursementModal activeAction={activeAction} onClose={onClose} onSuccess={onSuccess} />
      <StatusModal activeAction={activeAction} onClose={onClose} onSuccess={onSuccess} />
      <FundingModelModal activeAction={activeAction} onClose={onClose} onSuccess={onSuccess} />
    </>
  )
}

function NoteModal({ activeAction, onClose, onSuccess }: ApplicationActionModalsProps) {
  const { success, error: notifyError } = useNotification()
  const [body, setBody] = useState('')
  const [createNote, { loading }] = useImpactFundApplicationNoteCreateMutation()

  const isOpen = activeAction?.type === 'note'

  useEffect(() => {
    if (isOpen) setBody('')
  }, [isOpen])

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault()
    if (!activeAction || !body.trim()) return
    try {
      await createNote({ variables: { input: { applicationId: activeAction.applicationId, body: body.trim() } } })
      await onSuccess()
      success({ title: t('Note added') })
      onClose()
    } catch {
      notifyError({ title: t('Failed to add note') })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit}>
        <ModalHeader>{t('Add review note')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>{t('Internal notes')}</FormLabel>
            <Textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              minH="160px"
              placeholder={t('Add private moderator notes for this application')}
              autoFocus
              onKeyDown={(event) => {
                if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                  event.preventDefault()
                  handleSubmit()
                }
              }}
            />
            <FormHelperText>{t('Tip: press Cmd/Ctrl+Enter to save.')}</FormHelperText>
          </FormControl>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="ghost" onClick={onClose}>
            {t('Cancel')}
          </Button>
          <Button colorScheme="primary1" type="submit" isLoading={loading} isDisabled={!body.trim()}>
            {t('Add note')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function DisbursementModal({ activeAction, onClose, onSuccess }: ApplicationActionModalsProps) {
  const { success, error: notifyError } = useNotification()
  const [contributionUuid, setContributionUuid] = useState('')
  const [setFunding, { loading }] = useImpactFundApplicationFundingSetMutation()

  const isOpen = activeAction?.type === 'disbursement'

  useEffect(() => {
    if (isOpen) setContributionUuid('')
  }, [isOpen])

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault()
    if (!activeAction) return
    const trimmed = contributionUuid.trim()
    if (!trimmed) return
    try {
      await setFunding({
        variables: { input: { applicationId: activeAction.applicationId, contributionUuid: trimmed } },
      })
      await onSuccess()
      success({ title: t('Disbursement added') })
      onClose()
    } catch {
      notifyError({ title: t('Failed to add disbursement') })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit}>
        <ModalHeader>{t('Add disbursement record')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={4}>
            <Body size="sm" color="neutral1.9">
              {t(
                'Enter a contribution UUID. The amount will be added to the current funded amount and the application status will move to Disbursement.',
              )}
            </Body>
            <FormControl>
              <FormLabel>{t('Contribution UUID')}</FormLabel>
              <Input
                value={contributionUuid}
                onChange={(event) => setContributionUuid(event.target.value)}
                placeholder="00000000-0000-0000-0000-000000000000"
                autoFocus
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="ghost" onClick={onClose}>
            {t('Cancel')}
          </Button>
          <Button colorScheme="primary1" type="submit" isLoading={loading} isDisabled={!contributionUuid.trim()}>
            {t('Add disbursement record')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function StatusModal({ activeAction, onClose, onSuccess }: ApplicationActionModalsProps) {
  const { success, error: notifyError } = useNotification()
  const [updateApplication, { loading }] = useImpactFundApplicationUpdateMutation()
  const [selected, setSelected] = useState<ImpactFundApplicationStatus>(ImpactFundApplicationStatus.Pending)

  const isOpen = activeAction?.type === 'status'

  useEffect(() => {
    if (isOpen && activeAction) setSelected(activeAction.currentStatus)
  }, [isOpen, activeAction])

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault()
    if (!activeAction) return
    if (selected === activeAction.currentStatus) {
      onClose()
      return
    }

    try {
      await updateApplication({
        variables: { input: { applicationId: activeAction.applicationId, status: selected } },
      })
      await onSuccess()
      success({ title: t('Application status updated') })
      onClose()
    } catch {
      notifyError({ title: t('Failed to update application') })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit}>
        <ModalHeader>{t('Update application status')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>{t('Status')}</FormLabel>
            <Select
              value={selected}
              onChange={(event) => setSelected(event.target.value as ImpactFundApplicationStatus)}
              autoFocus
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {t(applicationStatusLabels[status])}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="ghost" onClick={onClose}>
            {t('Cancel')}
          </Button>
          <Button colorScheme="primary1" type="submit" isLoading={loading}>
            {t('Update status')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function FundingModelModal({ activeAction, onClose, onSuccess }: ApplicationActionModalsProps) {
  const { success, error: notifyError } = useNotification()
  const [updateApplication, { loading }] = useImpactFundApplicationUpdateMutation()
  const [selected, setSelected] = useState<ImpactFundApplicationFundingModel>(
    ImpactFundApplicationFundingModel.DirectGrant,
  )

  const isOpen = activeAction?.type === 'fundingModel'

  useEffect(() => {
    if (isOpen && activeAction) setSelected(activeAction.currentFundingModel)
  }, [isOpen, activeAction])

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault()
    if (!activeAction) return
    if (selected === activeAction.currentFundingModel) {
      onClose()
      return
    }

    try {
      await updateApplication({
        variables: { input: { applicationId: activeAction.applicationId, fundingModel: selected } },
      })
      await onSuccess()
      success({ title: t('Funding modality updated') })
      onClose()
    } catch {
      notifyError({ title: t('Failed to update application') })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit}>
        <ModalHeader>{t('Change funding modality')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={3}>
            <Body size="sm" color="neutral1.9">
              {t('Funding modality affects how funds are committed and disbursed for this application.')}
            </Body>
            <FormControl>
              <FormLabel>{t('Funding modality')}</FormLabel>
              <Select
                value={selected}
                onChange={(event) => setSelected(event.target.value as ImpactFundApplicationFundingModel)}
                autoFocus
              >
                {fundingModelOptions.map((model) => (
                  <option key={model} value={model}>
                    {t(fundingModelLabels[model])}
                  </option>
                ))}
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="ghost" onClick={onClose}>
            {t('Cancel')}
          </Button>
          <Button colorScheme="primary1" type="submit" isLoading={loading}>
            {t('Save')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export type { ActiveAction }
