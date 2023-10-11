import { useMutation } from '@apollo/client'
import { Button, Center, Text, useDisclosure } from '@chakra-ui/react'
import { forwardRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import {
  DeleteConfirmModal,
  ProjectEntryCard,
} from '../../../../components/molecules'
import { TitleDivider } from '../../../../components/ui/TitleDivider'
import { getPath } from '../../../../constants'
import { useProjectContext } from '../../../../context'
import { MUTATION_DELETE_ENTRY } from '../../../../graphql/mutations'
import {
  EntryForProjectFragment,
  useProjectUnplublishedEntriesLazyQuery,
} from '../../../../types'
import {
  isActive,
  isDraft,
  toInt,
  useMobileMode,
  useNotification,
} from '../../../../utils'
import { truthyFilter } from '../../../../utils/array'

export const Entries = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation()
  const location = useLocation()
  const isMobile = useMobileMode()

  const { project, isProjectOwner, updateProject } = useProjectContext()

  const [fetchUnpublishedEntries] = useProjectUnplublishedEntriesLazyQuery({
    variables: {
      where: { name: project?.name },
    },
    onCompleted(data) {
      if (data.projectGet && updateProject) {
        updateProject({
          ...data.projectGet,
          entries: project
            ? [...project.entries, ...data.projectGet.entries]
            : data.projectGet.entries,
        })
      }
    },
  })

  useEffect(() => {
    if (isProjectOwner) {
      fetchUnpublishedEntries()
    }
  }, [fetchUnpublishedEntries, isProjectOwner])

  if (!project || !project.entries.length) {
    return null
  }

  const canCreateEntries: boolean =
    Boolean(isProjectOwner) &&
    (isActive(project.status) || isDraft(project.status))
  const isEntriesTitleFixed = location.pathname.includes('entries') && isMobile

  return (
    <CardLayout
      ref={ref}
      mobileDense
      width="100%"
      alignItems="flex-start"
      spacing="20px"
      flexDirection="column"
    >
      <TitleDivider
        badge={project.entries.length}
        isFixed={isEntriesTitleFixed}
      >
        {t('Entries')}
      </TitleDivider>

      <RenderEntries entries={project.entries} />

      {isProjectOwner && Boolean(canCreateEntries) === false && (
        <Center>
          <Text textColor={'neutral.600'} textAlign="center" paddingX={2}>
            {t(
              'You cannot publish an entry in an inactive project. Finish the project configuration or re-activate the project to publish this entry.',
            )}
          </Text>
        </Center>
      )}
    </CardLayout>
  )
})

export const RenderEntries = ({
  entries,
}: {
  entries: EntryForProjectFragment[]
}) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { project, isProjectOwner, updateProject } = useProjectContext()
  const { toast } = useNotification()

  const [selectedEntry, setSelectedEntry] = useState<EntryForProjectFragment>()
  const { isOpen: isShowAll, onOpen: onShowAll } = useDisclosure()

  const {
    isOpen: isDeleteEntryOpen,
    onClose: closeDeleteEntry,
    onOpen: openDeleteEntry,
  } = useDisclosure()

  const [deleteEntry] = useMutation(MUTATION_DELETE_ENTRY, {
    onCompleted() {
      const newEntries = project?.entries.filter(
        (entry) => entry?.id !== selectedEntry?.id,
      )
      updateProject({ entries: newEntries })
      setSelectedEntry(undefined)
    },
  })

  const handleEntryEditButtonTapped = (entry: EntryForProjectFragment) => {
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
    entries &&
    entries
      .filter(truthyFilter)
      .sort((a, b) => Number(b.createdAt || '') - Number(a.createdAt || ''))
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
