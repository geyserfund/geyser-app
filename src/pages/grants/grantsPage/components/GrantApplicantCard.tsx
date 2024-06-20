import { Box, Button, HStack, ListItem, Text, UnorderedList, useDisclosure, VStack } from '@chakra-ui/react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import { Modal } from '../../../../components/layouts'
import { H3 } from '../../../../components/typography'
import { ImageWithReload } from '../../../../components/ui'
import { getPath } from '../../../../constants'
import {
  ProjectGrantApplicantContributorsModal,
  useProjectGrantApplicantContributorsModal,
} from '../../../../modules/project/pages/projectView/views/projectActivityPanel/screens/info/components/ProjectGrantApplicantContributorsModal'
import { AvatarElement } from '../../../../modules/project/pages/projectView/views/projectMainBody/components'
import { fonts } from '../../../../styles'
import {
  GrantApplicantContributor,
  GrantApplicantFunding,
  GrantStatusEnum,
  Project,
  UserMeFragment,
  VotingSystem,
} from '../../../../types'
import { getShortAmountLabel, useMobileMode } from '../../../../utils'
import { WidgetItem } from '../../components/WidgetItem'

interface GrantApplicantCardProps {
  project: Project
  funding: GrantApplicantFunding
  contributorsCount: number
  contributors: GrantApplicantContributor[]
  grantHasVoting: boolean
  isClosed: boolean
  isCompetitionVote: boolean
  canVote: boolean
  fundingModalProps: any
  grantStatus: GrantStatusEnum
  isLoggedIn: boolean
  onOpenLoginModal: () => void
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
  const grantApplicantContributorsModal = useProjectGrantApplicantContributorsModal()

  if (!contributors) {
    return null
  }

  return (
    <>
      <Box
        pl={2}
        filter="opacity(0.4)"
        _hover={{ cursor: 'pointer' }}
        zIndex={2}
        onClick={(e) => {
          e.stopPropagation()
          grantApplicantContributorsModal.onOpen()
        }}
      >
        {currentContributor && (
          <AvatarElement
            key={currentContributor?.user?.id}
            width="28px"
            height="28px"
            wrapperProps={{
              display: 'inline-block',
              marginLeft: '-5px',
              marginTop: 2,
            }}
            avatarOnly
            borderRadius="50%"
            seed={currentContributor?.user?.id}
            user={currentContributor?.user}
          />
        )}
        {contributors
          .filter((contributor) => contributor.user?.id !== (currentContributor && currentContributor?.user?.id))
          .slice(0, 50)
          .map(
            (contributor) =>
              contributor && (
                <AvatarElement
                  key={contributor.user?.id}
                  width="28px"
                  height="28px"
                  wrapperProps={{
                    display: 'inline-block',
                    marginLeft: '-5px',
                    marginTop: 2,
                  }}
                  avatarOnly
                  borderRadius="50%"
                  seed={contributor?.user?.id}
                  user={contributor?.user}
                />
              ),
          )}
      </Box>
      <ProjectGrantApplicantContributorsModal
        grantApplicantContributors={contributors}
        {...grantApplicantContributorsModal}
      />
    </>
  )
}

export const GrantApplicantCard = ({
  project,
  funding,
  contributorsCount,
  contributors,
  grantHasVoting,
  isClosed,
  isCompetitionVote,
  canVote,
  fundingModalProps,
  grantStatus,
  isLoggedIn,
  onOpenLoginModal,
  currentUser,
  votingSystem,
}: GrantApplicantCardProps) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const classes = useStyles()
  const projectLink = getPath('project', project.name)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const currentUserContribution =
    currentUser &&
    currentUser.hasSocialAccount &&
    contributors.find((contributor) => contributor.user?.id === currentUser?.id)

  const renderWidgetItem = (funding: GrantApplicantFunding, contributorsCount: number) => {
    return (
      <HStack gap={5}>
        {isCompetitionVote && (
          <Box display={'flex'} alignItems="center" flexDirection={'column'}>
            <Box display={'flex'} alignItems="center">
              <Text fontWeight={'700'} fontSize={'26px'} fontFamily={fonts.livvic} color="primary.500">
                {contributorsCount || 0}
              </Text>
            </Box>

            <Text fontWeight={'400'} fontSize="10px" fontStyle="normal" color="neutral.900">
              {votingSystem === VotingSystem.OneToOne ? t('voters') : t('votes')}
            </Text>
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
    if ((!isLoggedIn || !currentUser?.hasSocialAccount) && votingSystem !== VotingSystem.OneToOne && grantHasVoting) {
      return (
        <Button
          onClick={(e) => {
            e.stopPropagation()
            onOpenLoginModal()
          }}
          height="40px"
          width="100%"
          size="md"
          fontSize="16px"
          variant="primary"
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
            e.stopPropagation()
            onOpen()
          }}
          height="40px"
          width="100%"
          size="md"
          variant="primary"
          zIndex={2}
          pointerEvents="auto"
        >
          {t('Vote')}
        </Button>
      )
    }

    if (grantStatus !== GrantStatusEnum.Closed) {
      return (
        <Button
          as={Link}
          to={getPath('project', project.name)}
          size={'md'}
          variant={'primary'}
          zIndex={2}
          pointerEvents="auto"
        >
          {t('View project')}
        </Button>
      )
    }
  }

  const handleCardClick = () => {
    window.location.href = projectLink
  }

  return (
    <Box onClick={handleCardClick} position="relative">
      <CardLayout as="div" p={2} key={project.id} position="relative" zIndex={1} cursor="pointer">
        <Box display="flex">
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
            <H3 fontSize="18px">{project.title}</H3>
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
              {(grantHasVoting || isClosed) && renderWidgetItem(funding, contributorsCount)}
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
            {(grantHasVoting || isClosed) && renderWidgetItem(funding, contributorsCount)}
          </VStack>
        )}
        {currentUserContribution && grantHasVoting && <UserContributionDetails {...currentUserContribution} />}
        <HowVotingWorksModal
          isOpen={isOpen}
          onClose={onClose}
          votingSystem={votingSystem}
          fundingModalProps={fundingModalProps}
          project={project}
        />
      </CardLayout>
    </Box>
  )
}

const HowVotingWorksModal = ({
  isOpen,
  onClose,
  votingSystem,
  fundingModalProps,
  project,
}: {
  isOpen: boolean
  onClose: () => void
  votingSystem?: VotingSystem
  fundingModalProps: { onOpen: ({ project }: { project: Project }) => void }
  project: Project
}) => {
  const { t } = useTranslation()

  if (votingSystem === VotingSystem.StepLog_10) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title={t('How voting works')}>
        <VStack py={2} px={2} gap={4} w="full">
          <VStack alignItems="flex-start" gap={2}>
            <Text>
              {t('This grant uses ')}
              <Text as="i">{t('Incremental Voting')}</Text>
              {t(', to ensure that all votes can make a difference. This means:')}
            </Text>
            <UnorderedList mt={4} spacing={2}>
              <ListItem>
                <Text>{t('You vote by sending sats')}</Text>
              </ListItem>
              <ListItem>
                <Text>
                  {t(
                    'You can send to a project multiple times, but each user gets to send a maximum of 3 votes per project.',
                  )}
                </Text>
              </ListItem>
              <ListItem>
                <Text>{t('You can send to multiple projects')}</Text>
              </ListItem>
              <ListItem>
                <Text>
                  {t('The amount of votes you cast on a project depends on the cumulative amount of you send to it:')}
                </Text>
              </ListItem>
            </UnorderedList>
            <VStack w="full" borderRadius={'4px'} bg={'neutral.800'} p={3}>
              <HStack w="full" justifyContent="flex-start" gap={5}>
                <Text width="60px" fontWeight="bold" color={'neutral.0'}>
                  {t('1 vote')}
                </Text>
                <Text fontWeight="bold" color={'neutral.0'}>
                  {t('From 1,000 to 9,999 sats')}
                </Text>
              </HStack>
              <HStack w="full" justifyContent="flex-start" gap={5}>
                <Text width="60px" fontWeight="bold" color={'neutral.0'}>
                  {t('2 votes')}
                </Text>
                <Text fontWeight="bold" color={'neutral.0'}>
                  {t('From 10,000 to 99,999 sats')}
                </Text>
              </HStack>
              <HStack w="full" justifyContent="flex-start" gap={5}>
                <Text width="60px" fontWeight="bold" color={'neutral.0'}>
                  {t('3 votes')}
                </Text>
                <Text fontWeight="bold" color={'neutral.0'}>
                  {t('Above 100k sats')}
                </Text>
              </HStack>
            </VStack>
          </VStack>

          <HStack w="full" justifyContent="center">
            <Button
              w="full"
              variant="primary"
              onClick={() => {
                fundingModalProps.onOpen({ project })
                onClose()
              }}
            >
              {t("Let's vote!")}
            </Button>
          </HStack>
        </VStack>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('How voting works')}>
      <VStack py={2} px={2} gap={4} w="full">
        <VStack alignItems="flex-start" gap={2}>
          <Text>
            {t('This grant uses ')}
            <Text as="i">{t('Proportional Voting')}</Text>
            {t(' to enable more funding to go towards projects. This means:')}
          </Text>
          <UnorderedList mt={4} spacing={2}>
            <ListItem>
              <Text>{t('1 Sat = 1 Vote. Each Sat is one Vote.')}</Text>
            </ListItem>
            <ListItem>
              <Text>{t('You can send Sats to projects to multiple projects and multiple times')}</Text>
            </ListItem>
            <ListItem>
              <Text>{t('You can send Sats anonymously')}</Text>
            </ListItem>
          </UnorderedList>
        </VStack>

        <HStack w="full" justifyContent="center">
          <Button
            w="full"
            variant="primary"
            onClick={() => {
              fundingModalProps.onOpen({ project })
              onClose()
            }}
          >
            {t("Let's vote!")}
          </Button>
        </HStack>
      </VStack>
    </Modal>
  )
}
