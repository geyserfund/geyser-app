import { Button, HStack, Icon, IconButton, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { PiX } from 'react-icons/pi'

import { useAuthContext } from '@/context/auth.tsx'
import { UpdateVerifyEmail } from '@/modules/profile/pages/profileSettings/components/UpdateVerifyEmail.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { UserVerificationModal } from '@/modules/project/pages1/projectDashboard/views/wallet/components/UserVerificationModal.tsx'
import { useUserVerificationModal } from '@/modules/project/pages1/projectDashboard/views/wallet/hooks/useUserVerificationModal.ts'
import { isProjectOwnerAtom } from '@/modules/project/state/projectAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { UserVerificationLevel, UserVerificationLevelInput, UserVerificationStatus } from '@/types/index.ts'

import {
  becomeVerifiedNoticeAtom,
  firstFundingLimitAlmostReachedAtom,
  secondFundingLimitAlmostReachedAtom,
} from './noticeAtom.ts'

/** Helper to check if verification is on hold */
const isVerificationOnHold = (currentVerificationLevel: any) => {
  return (
    currentVerificationLevel?.level === UserVerificationLevel.Level_3 &&
    currentVerificationLevel?.status === UserVerificationStatus.Rejected
  )
}

/** Helper to check if funding limit has been reached */
const hasFundingLimitReached = (project: any, user: any) => {
  return (
    (project.balanceUsdCent > 1000000 && !user?.complianceDetails.verifiedDetails.phoneNumber) ||
    (project.balanceUsdCent > 100000000 && !user?.complianceDetails.verifiedDetails.identity)
  )
}

/** Helper to check if funding limit is almost reached */
const isAlmostReachedLimit = (
  project: any,
  user: any,
  firstFundingLimitAlmostReached: boolean,
  secondFundingLimitAlmostReached: boolean,
) => {
  return (
    (project.balanceUsdCent > 900000 &&
      !user?.complianceDetails.verifiedDetails.identity &&
      !firstFundingLimitAlmostReached) ||
    (project.balanceUsdCent > 90000000 &&
      !user?.complianceDetails.verifiedDetails.phoneNumber &&
      !secondFundingLimitAlmostReached)
  )
}

/** Helper to check if user should be prompted to become verified */
const shouldShowBecomeVerified = (user: any, becomeVerifiedNotice: boolean) => {
  return !user?.complianceDetails.verifiedDetails.identity?.verified && !becomeVerifiedNotice
}

export const CreatorVerificationNotice = () => {
  const { user } = useAuthContext()
  const firstFundingLimitAlmostReached = useAtomValue(firstFundingLimitAlmostReachedAtom)
  const secondFundingLimitAlmostReached = useAtomValue(secondFundingLimitAlmostReachedAtom)
  const becomeVerifiedNotice = useAtomValue(becomeVerifiedNoticeAtom)
  const { project } = useProjectAtom()

  const isProjectOwner = useAtomValue(isProjectOwnerAtom)

  const isEmailVerified = user?.isEmailVerified
  const currentVerificationLevel = user?.complianceDetails.currentVerificationLevel

  if (!isProjectOwner) {
    return null
  }

  if (!isEmailVerified) {
    return <EmailVerifyNotice />
  }

  if (isVerificationOnHold(currentVerificationLevel)) {
    return <VerificationOnHoldNotice />
  }

  if (hasFundingLimitReached(project, user)) {
    return <FundingLimitReachedNotice />
  }

  if (isAlmostReachedLimit(project, user, firstFundingLimitAlmostReached, secondFundingLimitAlmostReached)) {
    return <AlmostReachedLimitNotice />
  }

  if (shouldShowBecomeVerified(user, becomeVerifiedNotice)) {
    return <BecomeVerifiedNotice />
  }

  return null
}

const EmailVerifyNotice = () => {
  return (
    <CardLayout as={HStack} width="100%" background="orange.3" borderColor="orange.6" flexDirection="row">
      <VStack flex={1} spacing={0} alignItems="start">
        <Body bold>{t('Email verification required')}</Body>
        <Body size="sm" light>
          {t('Please verify your email.')}
        </Body>
      </VStack>
      <VStack justifyContent="flex-end" h="full">
        <UpdateVerifyEmail verifyButtonMode verifyButtonProps={{ variant: 'outline', colorScheme: 'orange' }} />
      </VStack>
    </CardLayout>
  )
}

const VerificationOnHoldNotice = () => {
  const { startVerification, userVerificationModal, generateVerificationTokenLoading, userVerificationToken } =
    useUserVerificationModal()

  return (
    <>
      <CardLayout as={HStack} width="100%" background="orange.3" borderColor="orange.6" flexDirection="row">
        <VStack flex={1} spacing={0} alignItems="start">
          <Body bold>{t('Verification on hold')}</Body>
          <Body size="sm" light>
            {t(
              'Your verification is on hold. You may need to upload some documents again, or provide additional information. Please contact support@geyser.fund.',
            )}
          </Body>
        </VStack>
        <VStack justifyContent="flex-end" h="full">
          <Button
            variant="outline"
            colorScheme="orange"
            isLoading={generateVerificationTokenLoading}
            onClick={() => {
              startVerification(UserVerificationLevelInput.Level_3)
            }}
          >
            {t('Complete verification')}
          </Button>
        </VStack>
      </CardLayout>
      <UserVerificationModal
        userVerificationModal={userVerificationModal}
        accessToken={userVerificationToken?.token || ''}
        verificationLevel={userVerificationToken?.verificationLevel}
      />
    </>
  )
}

const FundingLimitReachedNotice = () => {
  const { user } = useAuthContext()

  const { startVerification, userVerificationModal, generateVerificationTokenLoading, userVerificationToken } =
    useUserVerificationModal()

  const isLevel2 = user?.complianceDetails.verifiedDetails.phoneNumber?.verified

  const level1Text = t(
    'Your project has reached your funding limit of $10k. Complete phone-verification to continue raising up to $100k.',
  )
  const level2Text = t(
    'Your project has reached your funding limit of $100k. Complete identity-verification to continue raising above $100k.',
  )

  return (
    <>
      <CardLayout as={HStack} width="100%" background="error.3" borderColor="error.6" flexDirection="row">
        <VStack flex={1} spacing={0} alignItems="start">
          <Body bold>{t('Funding limit reached!')}</Body>
          <Body size="sm" light>
            {isLevel2 ? level2Text : level1Text}
          </Body>
        </VStack>
        <VStack justifyContent="flex-end" h="full">
          <Button
            variant="solid"
            colorScheme="error"
            isLoading={generateVerificationTokenLoading}
            onClick={() => {
              startVerification(isLevel2 ? UserVerificationLevelInput.Level_3 : UserVerificationLevelInput.Level_2)
            }}
          >
            {t('Complete verification')}
          </Button>
        </VStack>
      </CardLayout>
      <UserVerificationModal
        userVerificationModal={userVerificationModal}
        accessToken={userVerificationToken?.token || ''}
        verificationLevel={userVerificationToken?.verificationLevel}
      />
    </>
  )
}

const AlmostReachedLimitNotice = () => {
  const { user } = useAuthContext()
  const setFirstFundingLimitAlmostReached = useSetAtom(firstFundingLimitAlmostReachedAtom)
  const setSecondFundingLimitAlmostReached = useSetAtom(secondFundingLimitAlmostReachedAtom)

  const { startVerification, userVerificationModal, generateVerificationTokenLoading, userVerificationToken } =
    useUserVerificationModal()

  const isLevel2 = user?.complianceDetails.verifiedDetails.phoneNumber?.verified

  const level1Text = t(
    'Your project has reached your funding limit of $10k. Complete phone-verification to continue raising up to $100k.',
  )
  const level2Text = t(
    'Your project has reached your funding limit of $100k. Complete identity-verification to continue raising above $100k.',
  )

  return (
    <>
      <CardLayout as={HStack} width="100%" background="amber.3" borderColor="amber.6" flexDirection="row">
        <IconButton
          position="absolute"
          variant="outline"
          right="5px"
          top="5px"
          size="xs"
          icon={<Icon as={PiX} />}
          aria-label="Close"
          onClick={() => {
            if (isLevel2) {
              setSecondFundingLimitAlmostReached(true)
            } else {
              setFirstFundingLimitAlmostReached(true)
            }
          }}
        />
        <VStack flex={1} spacing={0} alignItems="start">
          <Body bold>{t('You have almost reached your funding limit!')}</Body>
          <Body size="sm" light>
            {isLevel2 ? level2Text : level1Text}
          </Body>
        </VStack>
        <VStack justifyContent="flex-end" h="full">
          <Button
            variant="solid"
            colorScheme="amber"
            isLoading={generateVerificationTokenLoading}
            onClick={() => {
              startVerification(isLevel2 ? UserVerificationLevelInput.Level_3 : UserVerificationLevelInput.Level_2)
            }}
          >
            {t('Complete verification')}
          </Button>
        </VStack>
      </CardLayout>
      <UserVerificationModal
        userVerificationModal={userVerificationModal}
        accessToken={userVerificationToken?.token || ''}
        verificationLevel={userVerificationToken?.verificationLevel}
      />
    </>
  )
}

const BecomeVerifiedNotice = () => {
  const setBecomeVerifiedNotice = useSetAtom(becomeVerifiedNoticeAtom)
  const { startVerification, userVerificationModal, generateVerificationTokenLoading, userVerificationToken } =
    useUserVerificationModal()

  return (
    <>
      <CardLayout as={HStack} width="100%" flexDirection="row">
        <IconButton
          position="absolute"
          variant="outline"
          right="5px"
          top="5px"
          size="xs"
          icon={<Icon as={PiX} />}
          aria-label="Close"
          onClick={() => {
            setBecomeVerifiedNotice(true)
          }}
        />
        <VStack flex={1} spacing={0} alignItems="start">
          <Body bold>{t('Become a Verified Creator')}</Body>
          <Body size="sm" light>
            {t('Earn a "Verified Creator" badge and enable fiat contributions by verifying your identity.')}
          </Body>
        </VStack>
        <VStack justifyContent="flex-end" h="full">
          <Button
            variant="solid"
            colorScheme="primary1"
            isLoading={generateVerificationTokenLoading}
            onClick={() => {
              startVerification(UserVerificationLevelInput.Level_3)
            }}
          >
            {t('Verify now')}
          </Button>
        </VStack>
      </CardLayout>
      <UserVerificationModal
        userVerificationModal={userVerificationModal}
        accessToken={userVerificationToken?.token || ''}
        verificationLevel={userVerificationToken?.verificationLevel}
      />
    </>
  )
}
