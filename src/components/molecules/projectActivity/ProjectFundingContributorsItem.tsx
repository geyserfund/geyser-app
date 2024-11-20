import { Box, HStack, HTMLChakraProps } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { computeFunderBadges, getAvatarMetadata } from '../../../helpers'
import { ProjectState } from '../../../modules/project/state/projectAtom'
import { getPath } from '../../../shared/constants'
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
      to={contributor?.user?.heroId ? getPath('heroProfile', contributor.user.heroId) : '/'}
      style={{ textDecoration: 'none', width: '100%' }}
      px={1}
      py={3}
      width="100%"
      borderRadius="12px"
      _hover={{
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
