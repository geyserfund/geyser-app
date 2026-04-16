import { Box, Button, Flex, HStack, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { postMicroLendingWaitlist } from '@/api/airtable.ts'
import { ControlledTextArea } from '@/shared/components/controlledInput/ControlledTextArea.tsx'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useNotification } from '@/utils/index.ts'

import { MICRO_LENDING_WAITLIST_SECTION_ID } from '../../utils/layoutConstants.ts'
import { type MicroLendingInterest, microLendingInterestOptions } from '../../utils/mainPageContent.ts'
import { MicroLendingSectionHeading } from './MicroLendingSectionHeading.tsx'

type WaitlistFormData = {
  interest: MicroLendingInterest
  name: string
  email: string
  country: string
  message: string
}

const waitlistSchema: yup.ObjectSchema<WaitlistFormData> = yup
  .object({
    interest: yup
      .mixed<MicroLendingInterest>()
      .oneOf([...microLendingInterestOptions], t('Please select how you are interested'))
      .required(t('Please select how you are interested')),
    name: yup.string().required(t('Name is required')),
    email: yup.string().required(t('Email is required')).email(t('Invalid email address')),
    country: yup.string().required(t('Country is required')),
    message: yup.string().default(''),
  })
  .required()

/** Waitlist form with interest toggles; posts to Airtable. */
export function MicroLendingWaitlistSection(): JSX.Element {
  const toast = useNotification()
  const [submitting, setSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistFormData>({
    resolver: yupResolver(waitlistSchema),
    mode: 'onBlur',
    defaultValues: {
      interest: 'Borrower',
      name: '',
      email: '',
      country: '',
      message: '',
    },
  })

  const onSubmit = async (data: WaitlistFormData) => {
    try {
      setSubmitting(true)
      await postMicroLendingWaitlist({
        interest: data.interest,
        name: data.name.trim(),
        email: data.email.trim(),
        country: data.country.trim(),
        message: data.message.trim() || undefined,
      })
      toast.success({
        title: t("You're on the list"),
        description: t('Thanks for your interest. We will be in touch.'),
      })
      reset({ interest: data.interest, name: '', email: '', country: '', message: '' })
    } catch {
      toast.error({
        title: t('Something went wrong.'),
        description: t('Please try again'),
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <VStack
      id={MICRO_LENDING_WAITLIST_SECTION_ID}
      align="stretch"
      spacing={6}
      scrollMarginTop={{ base: '72px', md: '88px' }}
    >
      <MicroLendingSectionHeading>{t('Join the Waitlist')}</MicroLendingSectionHeading>
      <Box w="full" display="flex" justifyContent="center">
        <CardLayout
          noborder
          spacing={0}
          padding={{ base: 5, md: 8 }}
          w="full"
          maxW={{ base: 'full', md: '50%' }}
          boxShadow="md"
        >
          <VStack as="form" onSubmit={handleSubmit(onSubmit)} align="stretch" spacing={5} w="full">
            <VStack align="stretch" spacing={2}>
              <Controller
                name="interest"
                control={control}
                render={({ field }) => (
                  <Flex w="full" align="center" gap={3} flexWrap="wrap" rowGap={2}>
                    <Body size="md" fontWeight="medium" flexShrink={0}>
                      {t('I am interested as a')}
                      {':'}
                    </Body>
                    <HStack flex="1" flexWrap="wrap" spacing={3} justifyContent="flex-end" minW={0}>
                      {microLendingInterestOptions.map((value) => (
                        <Button
                          key={value}
                          type="button"
                          size="lg"
                          variant={field.value === value ? 'soft' : 'outline'}
                          colorScheme="neutral1"
                          onClick={() => field.onChange(value)}
                        >
                          {value === 'Borrower' ? t('Borrower') : value === 'Lender' ? t('Lender') : t('Both')}
                        </Button>
                      ))}
                    </HStack>
                  </Flex>
                )}
              />
              {errors.interest?.message ? (
                <Body size="sm" color="red.500">
                  {errors.interest.message}
                </Body>
              ) : null}
            </VStack>

            <ControlledTextInput
              name="name"
              control={control}
              label={t('Name')}
              placeholder={t('Your name')}
              error={errors.name?.message}
              isRequired
            />
            <ControlledTextInput
              name="email"
              control={control}
              label={t('Email')}
              placeholder={t('Enter your email')}
              error={errors.email?.message}
              isRequired
              type="email"
              autoComplete="email"
            />
            <ControlledTextInput
              name="country"
              control={control}
              label={t('Country')}
              placeholder={t('Your country')}
              error={errors.country?.message}
              isRequired
              autoComplete="country-name"
            />
            <ControlledTextArea
              name="message"
              control={control}
              label={t('Tell Us More About Your Interest')}
              placeholder={t('Optional details')}
              error={errors.message?.message}
              rows={5}
            />

            <Box pt={1}>
              <Button type="submit" colorScheme="primary1" variant="solid" size="lg" w="full" isLoading={submitting}>
                {t('Join Waitlist')}
              </Button>
            </Box>
          </VStack>
        </CardLayout>
      </Box>
    </VStack>
  )
}
