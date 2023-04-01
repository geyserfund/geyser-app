import { useQuery } from '@apollo/client'
import { Button, HStack, Link as ChakraLink } from '@chakra-ui/react'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import { Body2, H2 } from '../../../../components/typography'
import { getPath } from '../../../../constants'
import { QUERY_GET_USER_BADGES } from '../../../../graphql/queries/badges'
import { User, UserBadge } from '../../../../types'
import { toInt } from '../../../../utils'
import { BadgesBody, BadgesBodySkeleton } from './BadgesBody'

export const Badges = ({
  userProfile,
  isEdit,
  isLoading,
}: {
  userProfile: User
  isEdit: boolean
  isLoading: boolean
}) => {
  const { data: userBadgesData, loading: userBadgeLoading } = useQuery<{
    userBadges: UserBadge[]
  }>(QUERY_GET_USER_BADGES, {
    variables: { input: { where: { userId: toInt(userProfile.id) } } },
  })

  const renderBadgesBody = () => {
    if (userBadgeLoading || isLoading) {
      return <BadgesBodySkeleton />
    }

    return (
      <BadgesBody
        {...{
          userBadges: userBadgesData?.userBadges || [],
          userProfile,
          isEdit,
        }}
      />
    )
  }

  return (
    <CardLayout padding="20px">
      <HStack w="full" justifyContent="space-between">
        <H2>Badges</H2>
        {!isEdit && (
          <Button
            as={ChakraLink}
            href={getPath('badges')}
            isExternal
            size="sm"
            leftIcon={<BsBoxArrowUpRight />}
          >
            See badges
          </Button>
        )}
      </HStack>
      <Body2 color="neutral.700">
        Geyser badges are earned for launching successful projects, contributing
        to them and being an active community member.{' '}
      </Body2>

      {renderBadgesBody()}

      {isEdit && (
        <Button variant="outlined" as={Link} to={getPath('badges')}>
          {' '}
          Go to badges page
        </Button>
      )}
    </CardLayout>
  )
}
