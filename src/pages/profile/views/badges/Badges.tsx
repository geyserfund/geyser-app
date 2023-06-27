import { useQuery } from '@apollo/client'
import { Button, HStack, Link as ChakraLink } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsBoxArrowUpRight } from 'react-icons/bs'

import { CardLayout } from '../../../../components/layouts'
import { Body2, H2 } from '../../../../components/typography'
import { getPath } from '../../../../constants'
import { QUERY_USER_BADGES } from '../../../../graphql/queries/badges'
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
  const { t } = useTranslation()
  const { data: userBadgesData, loading: userBadgeLoading } = useQuery<{
    userBadges: UserBadge[]
  }>(QUERY_USER_BADGES, {
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
    <CardLayout padding="0px" paddingY="20px" spacing="20px" maxHeight="100%">
      <HStack paddingX="20px" w="full" justifyContent="space-between">
        <H2>{t('Badges')}</H2>
        <Button
          as={ChakraLink}
          href={getPath('badges')}
          isExternal
          size="sm"
          leftIcon={<BsBoxArrowUpRight />}
        >
          {t('See badges')}
        </Button>
      </HStack>
      <Body2 paddingX="20px" color="neutral.700">
        {t(
          'Geyser badges are earned for launching successful projects, contributing  to them and being an active community member.',
        )}
      </Body2>

      {renderBadgesBody()}
    </CardLayout>
  )
}
