import { useMutation } from '@apollo/client'
import { Button, Center, Text, useDisclosure } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { DeleteConfirmModal } from '../../../../../../components/molecules'
import { getPath } from '../../../../../../constants'
import { MUTATION_DELETE_ENTRY } from '../../../../../../graphql/mutations'
import { EntryForProjectFragment } from '../../../../../../types'
import { isActive, isDraft, toInt, useNotification } from '../../../../../../utils'
import { truthyFilter } from '../../../../../../utils/array'
import { useEntriesAtom, useProjectAtom } from '../../../../hooks/useProjectAtom'
import { deleteEntryAtom } from '../../../../state/entriesAtom'
import { ProjectEntryCard } from './components/ProjectEntryCard'

export const RenderEntries = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { project, isProjectOwner } = useProjectAtom()

  const { entries: publishedEntries, unpublishedEntries } = useEntriesAtom()

  const entries = [...publishedEntries, ...unpublishedEntries]

  const deleteEntryFromAtom = useSetAtom(deleteEntryAtom)

  const { toast } = useNotification()

  const [selectedEntry, setSelectedEntry] = useState<EntryForProjectFragment>()
  const { isOpen: isShowAll, onOpen: onShowAll } = useDisclosure()

  const { isOpen: isDeleteEntryOpen, onClose: closeDeleteEntry, onOpen: openDeleteEntry } = useDisclosure()

  const [deleteEntry] = useMutation(MUTATION_DELETE_ENTRY, {
    onCompleted() {
      deleteEntryFromAtom(selectedEntry?.id)
      setSelectedEntry(undefined)
    },
  })

  const handleEntryEditButtonTapped = (entry: EntryForProjectFragment) => {
    if (!project?.name) return
    navigate(getPath('projectEntryDetails', project?.name, entry.id))
  }

  const triggerDeleteEntry = (entry: EntryForProjectFragment) => {
    setSelectedEntry(entry)
    openDeleteEntry()
  }

  const handleRemoveEntry = async () => {
    if (!selectedEntry || !selectedEntry.id) {
      return
    }

    try {
      await deleteEntry({
        variables: { deleteEntryId: toInt(selectedEntry.id) },
      })

      toast({
        title: 'Successfully removed entry',
        status: 'success',
      })
    } catch (error) {
      toast({
        title: 'Failed to remove entry',
        description: `${error}`,
        status: 'error',
      })
    }

    closeDeleteEntry()
  }

  const sortedEntries =
    entries && entries.filter(truthyFilter).sort((a, b) => Number(b.createdAt || '') - Number(a.createdAt || ''))

  const canCreateEntries: boolean = Boolean(isProjectOwner) && (isActive(project.status) || isDraft(project.status))

  return (
    <>
      {sortedEntries.map((entry, index) => {
        if (entry) {
          const entryWithProject = { ...entry, project }

          if (!isShowAll && index >= 3) {
            return null
          }

          if (isProjectOwner) {
            return (
              <ProjectEntryCard
                entry={entryWithProject}
                key={entry.id}
                onEdit={() => handleEntryEditButtonTapped(entry)}
                onDelete={() => triggerDeleteEntry(entry)}
              />
            )
          }

          return <ProjectEntryCard entry={entryWithProject} key={entry.id} />
        }
      })}
      {!isShowAll && sortedEntries.length > 3 && (
        <Button w="full" variant="secondary" onClick={onShowAll}>
          {t('See all')}
        </Button>
      )}

      {isProjectOwner && Boolean(canCreateEntries) === false && (
        <Center>
          <Text textColor={'neutral.600'} textAlign="center" paddingX={2}>
            {t(
              'You cannot publish an entry in an inactive project. Finish the project configuration or re-activate the project to publish this entry.',
            )}
          </Text>
        </Center>
      )}

      <DeleteConfirmModal
        isOpen={isDeleteEntryOpen}
        onClose={closeDeleteEntry}
        title={`${t('Delete reward')} ${selectedEntry?.title}`}
        description={t('Are you sure you want to remove the entry')}
        confirm={handleRemoveEntry}
      />
    </>
  )
}
