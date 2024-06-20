import { Box, HStack } from '@chakra-ui/layout'
import { HTMLChakraProps } from '@chakra-ui/system'
import { Link } from 'react-router-dom'

import { getPath } from '../../../constants'
import { GrantApplicantContributor } from '../../../types/generated/graphql'
import { LinkableAvatar } from '../../ui'

type Props = HTMLChakraProps<'div'> & {
  contributor: GrantApplicantContributor
}

export const ProjectFundingGrantApplicantContributorsItem = ({ contributor, ...rest }: Props) => {
  return (
    <Box
      as={Link}
      to={contributor?.user?.id ? getPath('userProfile', contributor.user.id) : '/'}
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
            imageSrc={contributor.user?.imageUrl || ''}
            avatarUsername={contributor.user?.username || ''}
            userProfileID={contributor.user?.id}
            underlineUsername={false}
          />
        </HStack>
      </Box>
    </Box>
  )
}
