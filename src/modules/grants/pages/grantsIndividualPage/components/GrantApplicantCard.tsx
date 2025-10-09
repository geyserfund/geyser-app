import { Avatar, AvatarGroup, Box, Button, HStack, Text, useDisclosure, useTheme, VStack } from '@chakra-ui/react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router'

import { useAuthModal } from '@/modules/auth/hooks'
import {
  ContributorsModal,
  useContributorsModal,
} from '@/modules/grants/pages/grantsMainPage/components/ContributorsModal'
import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H3 } from '@/shared/components/typography'
import { AvatarElement } from '@/shared/molecules/AvatarElement'
import { VotingInfoModal } from '@/shared/molecules/VotingInfoModal'

import { getPathWithGeyserHero } from '../../../../../shared/constants'
import {
  GrantApplicantContributor,
  GrantApplicantFunding,
  GrantStatusEnum,
  Project,
  UserMeFragment,
  VotingSystem,
} from '../../../../../types'
import { getShortAmountLabel, useMobileMode } from '../../../../../utils'
import { WidgetItem } from './WidgetItem'

interface GrantApplicantCardProps {
  project: Project
  funding: GrantApplicantFunding
  contributorsCount: number
  voteCount: number
  contributors: GrantApplicantContributor[]
  grantHasVoting: boolean
  isClosed: boolean
  isCompetitionVote: boolean
  canVote: boolean
  grantStatus: GrantStatusEnum
  isLoggedIn: boolean
  currentUser: UserMeFragment | null
  votingSystem?: VotingSystem
}

const useStyles = createUseStyles({
  desktopImage: {
    width: '144px',
  },
  mobileImage: {
    width: '90px',
  },
  image: {
    display: 'block',
    height: '101px',
  },
})

const MAX_AVATARS = {
  desktop: 35,
  mobile: 15,
}

const UserContributionDetails = ({ amount, voteCount, user }: GrantApplicantContributor) => {
  const isMobile = useMobileMode()

  if (!amount || !user) return null

  return (
    <Box
      mt={4}
      p={2}
      borderRadius="md"
      border="2px solid"
      borderColor={isMobile ? 'transparent' : 'neutral.200'}
      bg={isMobile ? 'transparent' : 'neutral.100'}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      cursor="default"
      zIndex={2}
    >
      <HStack gap={2} alignItems="center" justifyContent="center">
        <AvatarElement
          key={user.id}
          width="28px"
          height="28px"
          wrapperProps={{
            display: 'inline-block',
          }}
          avatarOnly
          borderRadius="50%"
          seed={user.id}
          user={user}
        />
        <Text fontWeight="bold" fontSize="16px">
          {user.username}
        </Text>
      </HStack>
      <Text fontWeight="bold" fontSize="16px">
        {amount.toLocaleString()} sats
      </Text>
      <Text fontWeight="bold" fontSize="16px">
        {voteCount} votes
      </Text>
    </Box>
  )
}

const ContributorsAvatarDisplay = ({
  contributors,
  currentContributor,
}: {
  contributors: GrantApplicantContributor[]
  currentContributor: GrantApplicantContributor | null | false
}) => {
  const { colors } = useTheme()

  const isMobile = useMobileMode()

  const contributorsModal = useContributorsModal()

  const maxAvatars = isMobile ? MAX_AVATARS.mobile : MAX_AVATARS.desktop

  if (!contributors) {
    return null
  }

  return (
    <>
      <Box
        pl={2}
        filter="opacity(0.8)"
        _hover={{ cursor: 'pointer' }}
        zIndex={2}
        onClick={(e) => {
          e.stopPropagation()
          contributorsModal.onOpen()
        }}
      >
        <AvatarGroup size="sm">
          {currentContributor && (
            <AvatarElement
              key={currentContributor?.user?.id}
              avatarOnly
              borderRadius="50%"
              seed={currentContributor?.user?.id}
              user={currentContributor?.user}
            />
          )}
          {contributors
            .filter((contributor) => contributor.user?.id !== (currentContributor && currentContributor?.user?.id))
            .slice(0, maxAvatars)
            .map(
              (contributor) =>
                contributor && (
                  <AvatarElement
                    key={contributor.user?.id}
                    avatarOnly
                    borderRadius="50%"
                    seed={contributor?.user?.id}
                    user={contributor?.user}
                  />
                ),
            )}
          {contributors.length > maxAvatars && (
            <>
              <Avatar
                size="sm"
                name={' '}
                border={`2px solid ${colors.neutral[400]}`}
                bg="neutral.100"
                color="neutral.900"
                ml={2}
              >
                <Text fontSize="10px">{`+${contributors.length - maxAvatars}`}</Text>
              </Avatar>
            </>
          )}
        </AvatarGroup>
      </Box>
      <ContributorsModal grantApplicantContributors={contributors} {...contributorsModal} />
    </>
  )
}

export const GrantApplicantCard = ({
  project,
  funding,
  contributorsCount,
  voteCount,
  contributors,
  grantHasVoting,
  isClosed,
  isCompetitionVote,
  canVote,
  grantStatus,
  isLoggedIn,
  currentUser,
  votingSystem,
}: GrantApplicantCardProps) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const { loginOnOpen } = useAuthModal()

  const classes = useStyles()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const currentUserContribution =
    currentUser &&
    currentUser.hasSocialAccount &&
    contributors.find((contributor) => contributor.user?.id === currentUser?.id)

  const renderWidgetItem = (funding: GrantApplicantFunding, contributorsCount: number, voteCount: number) => {
    return (
      <HStack gap={5}>
        {isCompetitionVote && (
          <Box display={'flex'} alignItems="center" flexDirection={'column'}>
            <Box display={'flex'} alignItems="center">
              <Body bold size="2xl" color="primary1.11">
                {grantHasVoting ? voteCount : contributorsCount || 0}
              </Body>
            </Box>

            <Body size="sm">{votingSystem === VotingSystem.OneToOne ? t('voters') : t('votes')}</Body>
          </Box>
        )}
        <WidgetItem subtitle={!isClosed ? t('sats sent') : t('distributed')}>
          {getShortAmountLabel(
            !isClosed ? funding.communityFunding : funding.grantAmount + funding.communityFunding || 0,
          )}
        </WidgetItem>
      </HStack>
    )
  }

  const renderButton = (project: Project) => {
    if (grantStatus === GrantStatusEnum.Closed || grantStatus === GrantStatusEnum.ApplicationsOpen) {
      return (
        <Button
          as={Link}
          to={getPathWithGeyserHero('project', project.name)}
          size={'md'}
          variant={'primary'}
          zIndex={2}
          pointerEvents="auto"
        >
          {t('View project')}
        </Button>
      )
    }

    if ((!isLoggedIn || !currentUser?.hasSocialAccount) && votingSystem !== VotingSystem.OneToOne && grantHasVoting) {
      return (
        <Button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            loginOnOpen({
              title: t('Login to vote'),
              description: t('You need to login to vote for this community voting grant. '),
              showLightning: false,
            })
          }}
          height="40px"
          width="100%"
          size="md"
          fontSize="16px"
          variant="solid"
          colorScheme="primary1"
          zIndex={2}
          pointerEvents="auto"
        >
          {t('Login to vote')}
        </Button>
      )
    }

    if (
      ((canVote && isLoggedIn && currentUser?.hasSocialAccount) || votingSystem === VotingSystem.OneToOne) &&
      grantHasVoting
    ) {
      return (
        <Button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onOpen()
          }}
          height="40px"
          width="100%"
          size="md"
          variant="solid"
          colorScheme="primary1"
          zIndex={2}
          pointerEvents="auto"
        >
          {t('Vote')}
        </Button>
      )
    }
  }

  return (
    <Box position="relative">
      <CardLayout as="div" p={2} key={project.id} position="relative" zIndex={1} cursor="pointer">
        <Box as={Link} to={getPathWithGeyserHero('project', project.name)} display="flex">
          <Box mr={3} height={{ base: '90px', lg: '144px' }}>
            <Box className={classNames(classes.image, isMobile ? classes.mobileImage : classes.desktopImage)}>
              <ImageWithReload
                objectFit="cover"
                borderRadius="7px"
                width={isMobile ? '90px' : '144px'}
                height={isMobile ? '90px' : '144px'}
                src={project.thumbnailImage || ''}
                alt="project thumbnail"
              />
            </Box>
          </Box>
          <Box pr={2} flexGrow={1}>
            <H3 size="lg">{project.title}</H3>
            <Text noOfLines={4} wordBreak="break-word">
              {project.shortDescription}
            </Text>
          </Box>
          {!isMobile && (
            <Box
              minWidth="166px"
              pr={4}
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="center"
              gap={5}
            >
              {renderButton(project)}
              {(grantHasVoting || isClosed) && renderWidgetItem(funding, contributorsCount, voteCount)}
            </Box>
          )}
        </Box>
        {contributors.length > 0 && grantHasVoting && (
          <ContributorsAvatarDisplay
            contributors={contributors}
            currentContributor={currentUserContribution || false}
          />
        )}
        {isMobile && (
          <VStack w="full">
            {renderButton(project)}
            {(grantHasVoting || isClosed) && renderWidgetItem(funding, contributorsCount, voteCount)}
          </VStack>
        )}
        {currentUserContribution && grantHasVoting && <UserContributionDetails {...currentUserContribution} />}
        <VotingInfoModal isOpen={isOpen} onClose={onClose} votingSystem={votingSystem} project={project} />
      </CardLayout>
    </Box>
  )
}
