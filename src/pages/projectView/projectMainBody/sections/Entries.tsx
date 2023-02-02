import { Center, Text, VStack } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import {
  ProjectEntryCard,
  ProjectSectionBar,
} from '../../../../components/molecules'
import { ButtonComponent } from '../../../../components/ui'
import { getPath, ID } from '../../../../constants'
import { useAuthContext, useProjectContext } from '../../../../context'
import { isActive, isDraft } from '../../../../utils'

export const Entries = () => {
  const navigate = useNavigate()

  const { user } = useAuthContext()
  const { project } = useProjectContext()

  const hasEntries = project.entries && project.entries.length > 0
  const entriesLength = project.entries ? project.entries.length : 0

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
          return <ProjectEntryCard entry={entryWithProject} key={entry.id} />
        }
      })
    }

    return <Text>There are no any entries available </Text>
  }

  const isUserOwnerOfCurrentProject: boolean =
    user?.id && user.id === project.owners[0].user.id

  const canCreateEntries: boolean =
    isUserOwnerOfCurrentProject &&
    (isActive(project.status) || isDraft(project.status))

  const handleCreateNewEntry = () => [
    navigate(getPath('projectEntryCreation', project.name)),
  ]

  if (!hasEntries && !isUserOwnerOfCurrentProject) {
    return null
  }

  return (
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

      {isUserOwnerOfCurrentProject && (
        <>
          <ButtonComponent
            onClick={handleCreateNewEntry}
            w="full"
            disabled={Boolean(canCreateEntries) === false}
          >
            <BiPlus style={{ marginRight: '10px' }} />
            Create A New Entry
          </ButtonComponent>

          {Boolean(canCreateEntries) === false ? (
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
          ) : null}
        </>
      )}
    </CardLayout>
  )
}
