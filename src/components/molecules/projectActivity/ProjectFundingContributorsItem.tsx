import { Box, HStack } from '@chakra-ui/layout'
import { HTMLChakraProps } from '@chakra-ui/system'
import { Link } from 'react-router-dom'

import { getPath } from '../../../constants'
import { computeFunderBadges, getAvatarMetadata } from '../../../helpers'
import { ProjectState } from '../../../modules/project/state/projectAtom'
import { FunderWithUserFragment } from '../../../types/generated/graphql'
import { LinkableAvatar } from '../../ui'
import { renderFunderBadges } from './renderFunderBadges'

type Props = HTMLChakraProps<'div'> & {
  project: ProjectState
  contributor: FunderWithUserFragment
}

export const ProjectFundingContributorsItem = ({ contributor, project, ...rest }: Props) => {
  const avatarMetadata = getAvatarMetadata({ funder: contributor })
  const funderBadges = computeFunderBadges({
    creationDateStringOfFundedContent: project.createdAt,
    funder: contributor,
  })

  return (
    <Box
      as={Link}
      to={contributor?.user?.id ? getPath('userProfile', contributor.user.id) : '/'}
      style={{ textDecoration: 'none', width: '100%' }}
      px={6}
      py={3}
      width="100%"
      borderRadius="12px"
      transition="transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
      willChange="transform"
      _hover={{
        transform: 'scale(1.08)',
        bg: 'neutral.200',
      }}
      {...rest}
    >
      <Box width="100%" display="flex" justifyContent="space-between">
        <HStack width="100%">
          <LinkableAvatar
            imageSrc={avatarMetadata.image}
            avatarUsername={avatarMetadata.username || ''}
            userProfileID={contributor.user?.id}
            badgeNames={funderBadges.map((badge) => badge.badge)}
            badgeElements={renderFunderBadges(funderBadges)}
            underlineUsername={false}
          />
        </HStack>
      </Box>
    </Box>
  )
}
