import {
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import { Box, Card, CardBody, Stack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'

import { useAuthContext } from '@/context'
import { SkeletonLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { useCurrencyFormatter } from '@/shared/utils/hooks'
import {
  useCancelUserSubscriptionMutation,
  UserSubscriptionFragment,
  UserSubscriptionInterval,
  UserSubscriptionStatus,
  useUserSubscriptionsQuery,
} from '@/types/generated/graphql'

import { ProfileSettingsLayout } from '../common/ProfileSettingsLayout.tsx'

const FormattedSubscriptionInterval: Record<UserSubscriptionInterval, string> = {
  [UserSubscriptionInterval.Monthly]: 'Monthly',
  [UserSubscriptionInterval.Yearly]: 'Yearly',
  [UserSubscriptionInterval.Quarterly]: 'Quarterly',
  [UserSubscriptionInterval.Weekly]: 'Weekly',
}

const SubscriptionDetail = ({ label, value }: { label: string; value: string }) => (
  <HStack>
    <Body color="neutralAlpha.9">{label}</Body>
    <Body color="black">{value}</Body>
  </HStack>
)

interface ActiveSubscriptionCardProps {
  userSubscription: UserSubscriptionFragment
  handleCancelUserSubscription: (id: string) => void
}

const ActiveSubscriptionCard = (props: ActiveSubscriptionCardProps) => {
  const { userSubscription, handleCancelUserSubscription } = props
  const { formatAmount } = useCurrencyFormatter()
  const [isOpen, setIsOpen] = useState(false)

  const formattedStartDate = new Date(Number(userSubscription.startDate)).toLocaleDateString()
  const formattedNextBillingDate = new Date(Number(userSubscription.nextBillingDate)).toLocaleDateString()
  const formattedAmount = formatAmount(
    userSubscription.projectSubscriptionPlan.cost,
    userSubscription.projectSubscriptionPlan.currency,
  )
  const formattedInterval = FormattedSubscriptionInterval[userSubscription.projectSubscriptionPlan.interval]

  return (
    <Card variant="outline" borderRadius="xl" borderColor="neutralAlpha.6">
      <CardBody>
        <Flex justify="space-between" align="center" direction={{ base: 'column', md: 'row' }}>
          <Box width="100%">
            <Body size="lg" mb={2}>
              {userSubscription.projectSubscriptionPlan.name}
            </Body>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={4}
              color="neutralAlpha.11"
              width="100%"
              align={{ base: 'stretch', md: 'center' }}
              justify="space-between"
            >
              <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                <SubscriptionDetail label="Started:" value={formattedStartDate} />
                <SubscriptionDetail label="Next Payment:" value={formattedNextBillingDate} />
                <SubscriptionDetail label="Amount:" value={formattedAmount} />
                <SubscriptionDetail label="Interval:" value={formattedInterval} />
              </Stack>
              <Button variant="outline" colorScheme="neutral1" size="sm" onClick={() => setIsOpen(true)}>
                {t('Cancel')}
              </Button>
            </Stack>
          </Box>
        </Flex>
      </CardBody>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius={12} maxW="600px">
          <ModalHeader fontSize="md">Cancel subscription</ModalHeader>
          <ModalCloseButton />
          <ModalBody w="full" fontSize="sm">
            <Body>
              {` ${t('Are you sure you want to cancel your subscription to')} ${
                userSubscription.projectSubscriptionPlan.name
              } ?`}
            </Body>
          </ModalBody>

          <ModalFooter gap={3} w="full">
            <Button size="lg" w="full" variant="soft" colorScheme="neutral1" onClick={() => setIsOpen(false)}>
              {t('Nevermind')}
            </Button>
            <Button
              w="full"
              size="lg"
              colorScheme="primary1"
              onClick={() => {
                handleCancelUserSubscription(userSubscription.id)
                setIsOpen(false)
              }}
            >
              {t('Yes, cancel the subscription')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  )
}

const CanceledSubscriptionCard = (userSubscription: UserSubscriptionFragment) => {
  const { formatAmount } = useCurrencyFormatter()
  const formattedCanceledDate = new Date(Number(userSubscription.canceledAt)).toLocaleDateString()
  const formattedStartDate = new Date(Number(userSubscription.startDate)).toLocaleDateString()
  const formattedAmount = formatAmount(
    userSubscription.projectSubscriptionPlan.cost,
    userSubscription.projectSubscriptionPlan.currency,
  )
  const formattedInterval = FormattedSubscriptionInterval[userSubscription.projectSubscriptionPlan.interval]

  return (
    <Card variant="outline" borderRadius="xl" borderColor="neutralAlpha.6">
      <CardBody>
        <Flex justify="space-between" align="center" direction={{ base: 'column', md: 'row' }}>
          <Box width="100%">
            <Body size="lg" mb={2}>
              {userSubscription.projectSubscriptionPlan.name}
            </Body>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={4}
              color="neutralAlpha.11"
              width="100%"
              align={{ base: 'stretch', md: 'center' }}
              justify="space-between"
            >
              <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                <SubscriptionDetail label="Started:" value={formattedStartDate} />
                <SubscriptionDetail label="Ended:" value={formattedCanceledDate} />
                <SubscriptionDetail label="Amount:" value={formattedAmount} />
                <SubscriptionDetail label="Interval:" value={formattedInterval} />
              </Stack>
              <Button variant="outline" colorScheme="neutral1" size="sm" onClick={() => {}}>
                {t('Re-new')}
              </Button>
            </Stack>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  )
}

export const ProfileSettingsSubscriptions = () => {
  const { user } = useAuthContext()

  const { data, loading } = useUserSubscriptionsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      input: {
        where: {
          userId: user?.id,
        },
      },
    },
  })
  const toast = useToast()
  const [cancelUserSubscription] = useCancelUserSubscriptionMutation({
    onError(error) {
      toast({
        title: t('Error canceling subscription'),
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    },
    onCompleted() {
      toast({
        title: t('Subscription canceled'),
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
  })

  if (!user) return null

  let activeSubscriptions =
    data?.userSubscriptions.filter(
      (subscription: UserSubscriptionFragment) => subscription.status === UserSubscriptionStatus.Active,
    ) || []
  const canceledSubscriptions =
    data?.userSubscriptions.filter(
      (subscription: UserSubscriptionFragment) => subscription.status === UserSubscriptionStatus.Canceled,
    ) || []

  const handleCancelUserSubscription = async (id: string) => {
    const cancelSubscriptionResult = await cancelUserSubscription({ variables: { id } })
    activeSubscriptions = activeSubscriptions?.filter(
      (subscription: UserSubscriptionFragment) => subscription.id !== id,
    )

    if (cancelSubscriptionResult.data?.userSubscriptionCancel) {
      canceledSubscriptions?.push(cancelSubscriptionResult.data.userSubscriptionCancel)
    }
  }

  return (
    <ProfileSettingsLayout desktopTitle={t('Subscriptions')}>
      <Stack spacing={8} px={{ base: 0, lg: 6 }} w="full">
        <Body size="sm" color="neutralAlpha.11" regular>
          {t('View, adjust, and manage all your subscriptions.')}
        </Body>

        {loading ? (
          <Stack spacing={8} m={8} w="full">
            <Box>
              <SkeletonLayout height="40px" width="300px" mb={2} />
              <SkeletonLayout height="20px" width="400px" />
            </Box>

            <Stack spacing={8}>
              <Box>
                <SkeletonLayout height="24px" width="200px" mb={2} />
                <SkeletonLayout height="120px" borderRadius="xl" />
              </Box>

              <Box>
                <SkeletonLayout height="24px" width="200px" mb={2} />
                <SkeletonLayout height="120px" borderRadius="xl" />
              </Box>
            </Stack>
          </Stack>
        ) : (
          <Stack spacing={8}>
            <Box>
              <Body size="md" mb={2}>
                {t('Active subscriptions')}
              </Body>
              {activeSubscriptions?.length && activeSubscriptions?.length > 0 ? (
                <Stack spacing={4}>
                  {activeSubscriptions.map((subscription: UserSubscriptionFragment) => (
                    <ActiveSubscriptionCard
                      key={subscription.id}
                      userSubscription={subscription}
                      handleCancelUserSubscription={handleCancelUserSubscription}
                    />
                  ))}
                </Stack>
              ) : (
                <Card variant="outline" bg="neutralAlpha.1" borderColor="neutralAlpha.6" h="120px" borderRadius="xl">
                  <CardBody>
                    <Body
                      color="neutralAlpha.11"
                      textAlign="center"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      h="full"
                    >
                      {t("You don't have any active subscriptions.")}
                    </Body>
                  </CardBody>
                </Card>
              )}
            </Box>

            <Box>
              <Body size="md" mb={2}>
                {t('Canceled subscriptions')}
              </Body>
              {canceledSubscriptions?.length && canceledSubscriptions?.length > 0 ? (
                <Stack spacing={4}>
                  {canceledSubscriptions.map((subscription: UserSubscriptionFragment) => (
                    <CanceledSubscriptionCard key={subscription.id} {...subscription} />
                  ))}
                </Stack>
              ) : (
                <Card variant="outline" bg="neutralAlpha.3" borderColor="neutralAlpha.6" h="120px" borderRadius="xl">
                  <CardBody>
                    <Body
                      color="neutralAlpha.11"
                      textAlign="center"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      h="full"
                    >
                      {t("You don't have any paused subscriptions.")}
                    </Body>
                  </CardBody>
                </Card>
              )}
            </Box>
          </Stack>
        )}
      </Stack>
    </ProfileSettingsLayout>
  )
}
