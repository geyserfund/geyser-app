import { useMutation } from '@apollo/client'
import { Center, Text, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import {
  DeleteConfirmModal,
  ProjectEntryCard,
  ProjectSectionBar,
} from '../../../../components/molecules'
import { getPath, ID } from '../../../../constants'
import { useProjectContext } from '../../../../context'
import { MUTATION_DELETE_ENTRY } from '../../../../graphql/mutations'
import {
  EntryForProjectFragment,
  useProjectUnplublishedEntriesLazyQuery,
} from '../../../../types'
import { isActive, isDraft, toInt, useNotification } from '../../../../utils'

export const Entries = () => {
  const navigate = useNavigate()

  const { project, isProjectOwner, updateProject } = useProjectContext()
  const { toast } = useNotification()

  const [selectedEntry, setSelectedEntry] = useState<EntryForProjectFragment>()

  const [deleteEntry] = useMutation(MUTATION_DELETE_ENTRY, {
    onCompleted() {
      const newEntries = project.entries.filter(
        (entry) => entry?.id !== selectedEntry?.id,
      )
      updateProject({ entries: newEntries })
      setSelectedEntry(undefined)
    },
  })
  const [fetchUnpublishedEntries] = useProjectUnplublishedEntriesLazyQuery({
    variables: {
      where: { name: project.name },
    },
    onCompleted(data) {
      if (data.project && updateProject) {
        updateProject({
          ...data.project,
          entries: [...project.entries, ...data.project.entries],
        })
      }
    },
  })

  useEffect(() => {
    if (isProjectOwner) {
      fetchUnpublishedEntries()
    }
  }, [isProjectOwner])

  const {
    isOpen: isDeleteEntryOpen,
    onClose: closeDeleteEntry,
    onOpen: openDeleteEntry,
  } = useDisclosure()

  const hasEntries = project.entries && project.entries.length > 0
  const entriesLength = project.entries ? project.entries.length : 0

  const canCreateEntries: boolean =
    isProjectOwner && (isActive(project.status) || isDraft(project.status))

  const handleEntryEditButtonTapped = (entry: EntryForProjectFragment) => {
    navigate(getPath('projectEntryDetails', project.name, entry.id))
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

  const renderEntries = () => {
    if (project.entries && project.entries.length > 0) {
      const sortedEntries =
        project.entries &&
        project.entries.sort(
          (a, b) =>
            parseInt(b?.createdAt || '', 10) - parseInt(a?.createdAt || '', 10),
        )
      return sortedEntries.map((entry) => {
        if (entry) {
          const entryWithProject = { ...entry, project }
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
      })
    }

    return <Text>There are no any entries available </Text>
  }

  if (!hasEntries) {
    return null
  }

  return (
    <>
      <CardLayout
        width="100%"
        alignItems="flex-start"
        spacing="20px"
        id={ID.project.view.entries}
        flexDirection="column"
        padding="24px"
      >
        <ProjectSectionBar name={'Entries'} number={entriesLength} />

        {renderEntries()}

        {isProjectOwner && Boolean(canCreateEntries) === false && (
          <Center>
            <Text
              textColor={'brand.neutral600'}
              textAlign="center"
              paddingX={2}
            >
              You cannot publish an entry in an inactive project. Finish the
              project configuration or re-activate the project to publish this
              entry.
            </Text>
          </Center>
        )}
      </CardLayout>
      <DeleteConfirmModal
        isOpen={isDeleteEntryOpen}
        onClose={closeDeleteEntry}
        title={`Delete reward ${selectedEntry?.title}`}
        description={'Are you sure you want to remove the entry'}
        confirm={handleRemoveEntry}
      />
    </>
  )
}
