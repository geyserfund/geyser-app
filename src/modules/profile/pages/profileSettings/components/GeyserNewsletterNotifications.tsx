import { HStack, Icon, Skeleton, Switch, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiEnvelopeSimple, PiLightning, PiStar } from 'react-icons/pi'

import { useAuthContext } from '@/context'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { NewsletterPreferenceKey } from '@/shared/constants/newsletter.ts'
import {
  useNewsletterPreferencesGetQuery,
  useNewsletterPreferencesUpdateMutation,
  useNewsletterStatusUpdateMutation,
} from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

const newsletterRows: {
  key: NewsletterPreferenceKey
  title: string
  description: string
  icon: typeof PiEnvelopeSimple
}[] = [
  {
    key: 'newsletterMonthly',
    title: 'Monthly Newsletter',
    description: 'A monthly roundup from Geyser.',
    icon: PiEnvelopeSimple,
  },
  {
    key: 'productUpdates',
    title: 'Product Updates',
    description: 'News about new features and improvements.',
    icon: PiLightning,
  },
  {
    key: 'projectSpotlights',
    title: 'Project Spotlights',
    description: 'Curated stories and featured projects from the community.',
    icon: PiStar,
  },
]

/** Controls for global Geyser newsletter preferences. */
export const GeyserNewsletterNotifications = () => {
  const { user } = useAuthContext()
  const toast = useNotification()
  const iconBg = useColorModeValue('primaryAlpha.3', 'primaryAlpha.4')
  const dividerColor = useColorModeValue('neutral1.4', 'neutral1.6')

  const { data, loading, refetch } = useNewsletterPreferencesGetQuery({
    skip: !user?.id,
    variables: { userId: user.id },
  })
  const [updatePreferences, { loading: isUpdatingPreferences }] = useNewsletterPreferencesUpdateMutation()
  const [updateStatus, { loading: isUpdatingStatus }] = useNewsletterStatusUpdateMutation()

  const preferences = data?.newsletterPreferencesGet
  const isActive = preferences?.status === 'active'
  const isMutating = isUpdatingPreferences || isUpdatingStatus

  const handleStatusChange = async (isChecked: boolean) => {
    try {
      await updateStatus({
        variables: {
          input: {
            userId: user.id,
            isActive: isChecked,
          },
        },
      })
      await refetch()
    } catch (error) {
      toast.error({
        title: t('Update failed'),
        description: (error as Error).message,
      })
    }
  }

  const handlePreferenceChange = async (key: NewsletterPreferenceKey, isChecked: boolean) => {
    try {
      await updatePreferences({
        variables: {
          input: {
            userId: user.id,
            [key]: isChecked,
          },
        },
      })
      await refetch()
    } catch (error) {
      toast.error({
        title: t('Update failed'),
        description: (error as Error).message,
      })
    }
  }

  if (loading) {
    return <Skeleton height="280px" borderRadius="lg" />
  }

  return (
    <CardLayout w="full" p={{ base: 4, lg: 5 }} spacing={4}>
      <HStack w="full" justifyContent="space-between" alignItems="flex-start">
        <VStack align="flex-start" spacing={1}>
          <Body size="lg" bold>
            {t('Geyser Newsletter')}
          </Body>
          <Body size="sm" color="neutralAlpha.11">
            {t('Choose which updates you want to receive from Geyser.')}
          </Body>
        </VStack>
        <Switch
          colorScheme="primary1"
          isChecked={isActive}
          isDisabled={isMutating}
          aria-label={t('Toggle Geyser Newsletter')}
          onChange={(event) => handleStatusChange(event.target.checked)}
        />
      </HStack>

      <VStack w="full" align="stretch" spacing={0}>
        {newsletterRows.map((row, index) => (
          <HStack
            key={row.key}
            w="full"
            justifyContent="space-between"
            py={4}
            borderTop={index === 0 ? 'none' : '1px solid'}
            borderColor={dividerColor}
          >
            <HStack spacing={4}>
              <HStack w={12} h={12} justifyContent="center" borderRadius="full" bg={iconBg}>
                <Icon as={row.icon} color="primary1.9" fontSize="24px" />
              </HStack>
              <VStack align="flex-start" spacing={0}>
                <Body size="md" medium>
                  {t(row.title)}
                </Body>
                <Body size="sm" color="neutralAlpha.11">
                  {t(row.description)}
                </Body>
              </VStack>
            </HStack>
            <Switch
              colorScheme="primary1"
              isChecked={Boolean(preferences?.[row.key])}
              isDisabled={!isActive || isMutating}
              aria-label={t(row.title)}
              onChange={(event) => handlePreferenceChange(row.key, event.target.checked)}
            />
          </HStack>
        ))}
      </VStack>
    </CardLayout>
  )
}
