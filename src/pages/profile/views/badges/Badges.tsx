import { Button, HStack, Link as ChakraLink } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BsBoxArrowUpRight } from 'react-icons/bs'

import { CardLayout } from '../../../../components/layouts'
import { Body2, H2 } from '../../../../components/typography'
import { getPath } from '../../../../constants'
import { User, useUserBadgesLazyQuery } from '../../../../types'
import { toInt, useNotification } from '../../../../utils'
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
  const { toast } = useNotification()

  const [getUserBadges, { data: userBadgesData, loading: userBadgeLoading }] =
    useUserBadgesLazyQuery({
      onError() {
        toast({
          title: 'Error fetching badges',
          description: 'Please refresh the page and try again.',
          status: 'error',
        })
      },
    })

  useEffect(() => {
    if (userProfile.id) {
      getUserBadges({
        variables: { input: { where: { userId: toInt(userProfile.id) } } },
      })
    }
  }, [userProfile.id, getUserBadges])

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
    <CardLayout
      noMobileBorder
      padding="0"
      paddingY={{ base: '10px', lg: '20px' }}
      spacing="20px"
      maxHeight="100%"
    >
      <HStack
        paddingX={{ base: '10px', lg: '20px' }}
        w="full"
        justifyContent="space-between"
      >
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
      <Body2 paddingX={{ base: '10px', lg: '20px' }} color="neutral.700">
        {t(
          'Geyser badges are earned for launching successful projects, contributing  to them and being an active community member.',
        )}
      </Body2>

      {renderBadgesBody()}
    </CardLayout>
  )
}
