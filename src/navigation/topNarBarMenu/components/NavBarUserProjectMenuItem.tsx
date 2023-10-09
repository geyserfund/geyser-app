import { Heading, HStack, MenuItem } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { ProjectListItemImage } from '../../../components/molecules'
import { Body2 } from '../../../components/typography'
import { getPath } from '../../../constants'
import { useAuthContext } from '../../../context'
import { ProjectStatus } from '../../../types/generated/graphql'

export const NavBarUserProjectMenuItem = () => {
  const { user } = useAuthContext()

  const toDisplayProject =
    user.ownerOf?.length > 0
      ? user.ownerOf.find(
          (data) => data?.project?.status === ProjectStatus.Active,
        )?.project || user.ownerOf[0]?.project
      : undefined

  if (!toDisplayProject) return null

  return (
    <>
      <Body2
        fontSize={'10px'}
        xBold
        fontWeight={700}
        color={'neutral.500'}
        px={3}
      >
        Project
      </Body2>

      <MenuItem
        as={Link}
        display="block"
        to={getPath('project', toDisplayProject.name)}
        _focus={{ boxShadow: 'none' }}
      >
        <HStack spacing={1} overflow="hidden" width="full">
          <ProjectListItemImage project={toDisplayProject} flexShrink={0} />

          <Heading fontWeight={600} fontSize="16px" as={'h6'} isTruncated>
            {toDisplayProject.title}
          </Heading>
        </HStack>
      </MenuItem>
    </>
  )
}
