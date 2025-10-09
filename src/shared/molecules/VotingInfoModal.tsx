import { Button, Divider, HStack, ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/context'
import { useAuthModal } from '@/modules/auth/hooks'
import { Project, VotingSystem } from '@/types'

import { Modal } from '../components/layouts'
import { CardLayout } from '../components/layouts/CardLayout'
import { Body } from '../components/typography'
import { getPath } from '../constants'
import { Feedback, FeedBackVariant } from './Feedback'

type VotingInfoModalProps = {
  isOpen: boolean
  onClose: () => void
  votingSystem?: VotingSystem
  project: Pick<Project, 'name'>
  modalTitle?: string
  grantName?: string
}

export const VotingInfoModal = ({
  isOpen,
  onClose,
  votingSystem,
  project,
  modalTitle,
  grantName,
}: VotingInfoModalProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { isLoggedIn } = useAuthContext()
  const { loginOnOpen } = useAuthModal()

  const isStepVoting = votingSystem === VotingSystem.StepLog_10

  const modalBody = () => {
    if (isStepVoting) {
      return (
        <>
          {grantName && (
            <Feedback variant={FeedBackVariant.SUCCESS} noIcon>
              <Body size="sm">
                <Trans
                  i18nKey="This project is seeking funding through the {{grantName}}. To support the project with your vote, please log in with a linked social media account (Lightning accounts are not eligible for voting). You're welcome to contribute even without logging in, but it won't count as a vote."
                  values={{ grantName }}
                >
                  {'This project is seeking funding through the '}
                  <strong>{'{{grantName}}'}</strong>
                  {
                    "To support the project with your vote, please log in with a linked social media account (Lightning accounts are not eligible for voting). You're welcome to contribute even without logging in, but it won't count as a vote."
                  }
                </Trans>
              </Body>
            </Feedback>
          )}

          <VStack alignItems="flex-start">
            <Body size="sm">
              {t('This Grant uses Incremental Voting to ensure that all votes can have an impact. It works like this:')}
            </Body>
            <UnorderedList>
              <ListItem>
                <Body size="sm">{t('You can vote by sending Sats')}</Body>
              </ListItem>
              <ListItem>
                <Body size="sm">{t('You can vote multiple times and towards multiple projects')}</Body>
              </ListItem>
              <ListItem>
                <Body size="sm">
                  {t('You can cast up to 3 votes per project based on the cumulative amounts sent to each project:')}
                </Body>
              </ListItem>
            </UnorderedList>
          </VStack>

          <CardLayout w="full" padding={4} backgroundColor={'neutral1.2'}>
            <HStack w={'full'} justifyContent={'space-between'}>
              <Body size="sm" light>
                {t('1 vote')}:
              </Body>
              <Body size="sm" light>
                {t('From 1,000 to 9,999 sats')}
              </Body>
            </HStack>
            <Divider />
            <HStack w={'full'} justifyContent={'space-between'}>
              <Body size="sm" light>
                {t('2 votes')}:
              </Body>
              <Body size="sm" light>
                {t('From 10,000 to 99,999 sats')}
              </Body>
            </HStack>
            <Divider />
            <HStack w={'full'} justifyContent={'space-between'}>
              <Body size="sm" light>
                {t('3 votes')}:
              </Body>
              <Body size="sm" light>
                {t('Above 100k sats')}
              </Body>
            </HStack>
          </CardLayout>
        </>
      )
    }

    return (
      <VStack alignItems="flex-start">
        <Body size="sm">
          {t('This Grant uses Proportional Voting to enable more funding to go towards projects. This means:')}
        </Body>
        <UnorderedList>
          <ListItem>
            <Body size="sm">{t('1 Sat = 1 Vote. Each Sat is one Vote.')}</Body>
          </ListItem>
          <ListItem>
            <Body size="sm">{t('You can send Sats to multiple projects and multiple times')}</Body>
          </ListItem>
          <ListItem>
            <Body size="sm">{t('You can send Sats anonymously')}</Body>
          </ListItem>
        </UnorderedList>
      </VStack>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle || t('How voting works')}
      size="sm"
      bodyProps={{
        as: VStack,
        gap: 4,
      }}
    >
      {modalBody()}
      <HStack w="full" justifyContent="center">
        {isLoggedIn || !isStepVoting ? (
          <Button
            w="full"
            variant="solid"
            colorScheme="primary1"
            onClick={() => {
              navigate(getPath('projectFunding', project.name))
            }}
          >
            {t("Let's vote!")}
          </Button>
        ) : (
          <>
            <Button
              w="full"
              variant="outline"
              colorScheme="primary1"
              onClick={() => {
                loginOnOpen({
                  showLightning: false,
                })
              }}
            >
              {t('Login')}
            </Button>
            <Button
              w="full"
              variant="solid"
              colorScheme="primary1"
              onClick={() => {
                navigate(getPath('projectFunding', project.name))
              }}
            >
              {t('Contribute without login')}
            </Button>
          </>
        )}
      </HStack>
    </Modal>
  )
}
