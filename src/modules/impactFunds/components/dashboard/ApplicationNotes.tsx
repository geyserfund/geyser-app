import { Badge, Box, Button, ButtonGroup, HStack, Textarea, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'

import { Tooltip } from '@/components/ui/Tooltip'
import { Body } from '@/shared/components/typography/Body.tsx'
import { UserAvatar } from '@/shared/molecules/UserAvatar'
import {
  type ImpactFundDashboardApplicationsQuery,
  useImpactFundApplicationNoteCreateMutation,
  useImpactFundApplicationNoteUpdateMutation,
} from '@/types'
import { useNotification } from '@/utils'

import { NoNotesYet } from './DashboardEmptyState'
import { formatDate, formatRelativeTime } from './dashboardFormatters'

type DashboardApplication =
  ImpactFundDashboardApplicationsQuery['impactFundDashboardApplications']['applications'][number]
type DashboardNote = DashboardApplication['notes'][number]

type ApplicationNotesProps = {
  application: DashboardApplication
  onChange: () => Promise<unknown> | void
}

export function ApplicationNotes({ application, onChange }: ApplicationNotesProps) {
  const { success, error: notifyError } = useNotification()
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [editingBody, setEditingBody] = useState('')
  const [composeBody, setComposeBody] = useState('')

  const [createNote, { loading: creatingNote }] = useImpactFundApplicationNoteCreateMutation()
  const [updateNote, { loading: updatingNote }] = useImpactFundApplicationNoteUpdateMutation()

  const handleCreate = async () => {
    const body = composeBody.trim()
    if (!body) return
    try {
      await createNote({ variables: { input: { applicationId: application.applicationId, body } } })
      await onChange()
      success({ title: t('Note added') })
      setComposeBody('')
    } catch {
      notifyError({ title: t('Failed to add note') })
    }
  }

  const handleUpdate = async (noteId: string) => {
    const body = editingBody.trim()
    if (!body) return
    try {
      await updateNote({ variables: { input: { noteId, body } } })
      await onChange()
      success({ title: t('Note updated') })
      setEditingNoteId(null)
      setEditingBody('')
    } catch {
      notifyError({ title: t('Failed to update note') })
    }
  }

  return (
    <VStack align="stretch" spacing={4}>
      <HStack justify="space-between" align="baseline">
        <Body size="sm" color="neutral1.11" bold>
          {t('Internal notes')}
        </Body>
        <Body size="xs" color="neutral1.9">
          {application.notes.length === 0
            ? t('No notes yet')
            : t('{{count}} notes', { count: application.notes.length })}
        </Body>
      </HStack>

      {application.notes.length === 0 ? (
        <NoNotesYet />
      ) : (
        <VStack align="stretch" spacing={3}>
          {application.notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              isEditing={editingNoteId === String(note.id)}
              draftBody={editingBody}
              isSaving={updatingNote}
              onStartEdit={() => {
                setEditingNoteId(String(note.id))
                setEditingBody(note.body)
              }}
              onCancelEdit={() => {
                setEditingNoteId(null)
                setEditingBody('')
              }}
              onChangeDraft={setEditingBody}
              onSubmitEdit={() => handleUpdate(String(note.id))}
            />
          ))}
        </VStack>
      )}

      <Box pt={2} borderTopWidth="1px" borderColor="neutral1.6">
        <Body size="xs" color="neutral1.9" pb={2} pt={2}>
          {t('Add a new note')}
        </Body>
        <Textarea
          value={composeBody}
          onChange={(event) => setComposeBody(event.target.value)}
          placeholder={t('Add private moderator notes for this application')}
          minH="100px"
          onKeyDown={(event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
              event.preventDefault()
              handleCreate()
            }
          }}
        />
        <HStack justify="space-between" align="center" pt={2}>
          <Body size="xs" color="neutral1.9">
            {t('Cmd/Ctrl+Enter to save')}
          </Body>
          <Button
            colorScheme="primary1"
            size="sm"
            onClick={handleCreate}
            isLoading={creatingNote}
            isDisabled={!composeBody.trim()}
          >
            {t('Add note')}
          </Button>
        </HStack>
      </Box>
    </VStack>
  )
}

type NoteItemProps = {
  note: DashboardNote
  isEditing: boolean
  draftBody: string
  isSaving: boolean
  onStartEdit: () => void
  onCancelEdit: () => void
  onChangeDraft: (body: string) => void
  onSubmitEdit: () => void
}

function NoteItem({
  note,
  isEditing,
  draftBody,
  isSaving,
  onStartEdit,
  onCancelEdit,
  onChangeDraft,
  onSubmitEdit,
}: NoteItemProps) {
  const wasEdited = note.updatedAt && note.createdAt && String(note.updatedAt) !== String(note.createdAt)

  return (
    <Box p={3} borderWidth="1px" borderColor="neutral1.6" borderRadius="md" bg="utils.pbg">
      <HStack align="start" spacing={3}>
        <UserAvatar id={note.author.id as unknown as string} user={note.author as never} height="32px" width="32px" />
        <VStack align="stretch" spacing={2} flex={1} minW={0}>
          <HStack justify="space-between" align="center" flexWrap="wrap" rowGap={1}>
            <HStack spacing={2}>
              <Body size="sm" bold>
                {note.author.username}
              </Body>
              <Tooltip content={formatDate(note.updatedAt)}>
                <Body size="xs" color="neutral1.9" as="span">
                  {formatRelativeTime(note.updatedAt)}
                </Body>
              </Tooltip>
              {wasEdited ? (
                <Badge size="sm" variant="soft" colorScheme="neutral1">
                  {t('Edited')}
                </Badge>
              ) : null}
            </HStack>
          </HStack>
          {isEditing ? (
            <>
              <Textarea
                value={draftBody}
                onChange={(event) => onChangeDraft(event.target.value)}
                minH="100px"
                onKeyDown={(event) => {
                  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                    event.preventDefault()
                    onSubmitEdit()
                  }

                  if (event.key === 'Escape') {
                    event.preventDefault()
                    onCancelEdit()
                  }
                }}
                autoFocus
              />
              <ButtonGroup size="sm" justifyContent="flex-end">
                <Button variant="ghost" onClick={onCancelEdit}>
                  {t('Cancel')}
                </Button>
                <Button
                  colorScheme="primary1"
                  isLoading={isSaving}
                  onClick={onSubmitEdit}
                  isDisabled={!draftBody.trim()}
                >
                  {t('Save')}
                </Button>
              </ButtonGroup>
            </>
          ) : (
            <>
              <Body size="sm" whiteSpace="pre-wrap">
                {note.body}
              </Body>
              {note.canEdit ? (
                <Box>
                  <Button size="xs" variant="ghost" onClick={onStartEdit}>
                    {t('Edit')}
                  </Button>
                </Box>
              ) : null}
            </>
          )}
        </VStack>
      </HStack>
    </Box>
  )
}
