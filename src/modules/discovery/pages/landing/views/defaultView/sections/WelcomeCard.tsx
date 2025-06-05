import { Button, HStack, Link, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { createSubscriber } from '@/api/index.ts'
import { useAuthContext } from '@/context'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { Body } from '@/shared/components/typography'
import { GeyserAboutUrl, GeyserBannerLogoUrl } from '@/shared/constants'
import { GradientBanner } from '@/shared/molecules/GradientBanner.tsx'
import { useNotification } from '@/utils/index.ts'

const schema = yup.object({
  email: yup.string().email(t('Please enter a valid email address')).required(t('Email is required')),
})

type SubscriptionFormData = {
  email: string
}

const welcomeCardDismissedAtom = atomWithStorage('welcomeCardDismissedAtom', false)

export const WelcomeCard = () => {
  const { isLoggedIn } = useAuthContext()

  const toast = useNotification()

  const [submitting, setSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscriptionFormData>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })

  const [isWelcomeCardDismissed, setIsWelcomeCardDismissed] = useAtom(welcomeCardDismissedAtom)

  if (isLoggedIn || isWelcomeCardDismissed) return null

  const onSubmit = async (data: SubscriptionFormData) => {
    try {
      setSubmitting(true)
      let records = {} as any

      records = {
        email: data.email,
      }

      await createSubscriber(records)

      reset()

      toast.success({
        title: t('Succesfully subscribed'),
      })
    } catch (error) {
      toast.error({
        title: t('Something went wrong.'),
        description: t('Please try again'),
      })
    }

    setSubmitting(false)
  }

  return (
    <GradientBanner
      title={t('Where grassroots Bitcoin projects come to life.')}
      subtitle={t(
        'Geyser rallies the Bitcoin community to fund ideas, products, and causes that drive real-world adoption from the ground up.',
      )}
      imageUrl={GeyserBannerLogoUrl}
      onClose={() => setIsWelcomeCardDismissed(true)}
      endContent={
        <>
          <Body as={Link} href={GeyserAboutUrl} underline wordBreak="keep-all">
            {t('Learn more')}.
          </Body>{' '}
          <Body as="span" light bold>
            {t('Discover the best bitcoin projects - join the list!')}
          </Body>
        </>
      }
    >
      <VStack py={{ base: 0, lg: 2 }} alignItems="flex-start">
        <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
          <HStack w="full" maxWidth="450px" flexWrap="wrap" spacing={4} alignItems="flex-start">
            <ControlledTextInput
              name="email"
              size="sm"
              containerProps={{ maxWidth: '250px' }}
              opacity={0.5}
              _focus={{ opacity: 1 }}
              control={control}
              placeholder={t('satoshi@gmx.com')}
              error={errors.email?.message}
              required
            />
            <Button
              variant="outline"
              minWidth="150px"
              backgroundColor="white"
              colorScheme="gray"
              type="submit"
              isLoading={submitting}
            >
              {t('Get Updates')}
            </Button>
          </HStack>
        </form>
        <HStack w="full" justifyContent="flex-start" flexWrap="wrap" spacing={2}>
          <Body size="md" wordBreak="keep-all">
            ✔️ {t('New projects & product launches')}
          </Body>
          <Body size="md" wordBreak="keep-all">
            ✔️ {t('Real-world Bitcoin adoption stories')}
          </Body>
          <Body size="md" wordBreak="keep-all">
            ✔️ {t('Join +10,0000 Bitcoiners supporting Bitcoin adoption')}
          </Body>
        </HStack>
      </VStack>
    </GradientBanner>
  )
}
