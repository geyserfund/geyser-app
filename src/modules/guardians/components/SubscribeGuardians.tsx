/* eslint-disable camelcase */
import { Button, VStack } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'

import { createSubscriber } from '@/api/flodesk'
import { useAuthContext } from '@/context'
import { FieldContainer } from '@/shared/components/form'
import { Body } from '@/shared/components/typography'
import { useFollowProject } from '@/shared/hooks/graphqlState'
import { fonts } from '@/shared/styles'
import { useNotification, validateEmail } from '@/utils'

const GuardiansSubscribeSegmentId = '67490199bf44afbcefaff2a0'

const GeyserGuardiansProject = {
  id: 2621,
  name: 'geyserguardians',
  title: 'Geyser Guardians',
}

export const SubscribeGuardians = () => {
  const toast = useNotification()

  const { isLoggedIn, user } = useAuthContext()

  const { handleFollow } = useFollowProject(GeyserGuardiansProject)

  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email)
    }
  }, [user])

  const handleConfirm = async () => {
    const res = validateEmail(email)
    if (!res) {
      setError('Please enter a valid email address.')
      return
    }

    try {
      setSubmitting(true)

      const records = { email, segment_ids: [GuardiansSubscribeSegmentId] }

      await createSubscriber(records)
      if (isLoggedIn) {
        await handleFollow()
      }

      setSubmitting(false)
      setSuccess(true)
    } catch (error) {
      toast.error({
        title: 'Something went wrong.',
        description: 'Please try again',
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('')
    }

    setEmail(e.target.value)
  }

  if (success) {
    return (
      <VStack
        direction={{ base: 'column', lg: 'row' }}
        w={'full'}
        maxWidth="816px"
        fontFamily={fonts.mazius}
        color="guardians.successText"
        spacing={0}
      >
        <Body size={{ base: '16px', lg: '32px', xl: '40px' }}>{t('You’re signed up! ')}</Body>
        <Body size={{ base: '16px', lg: '32px', xl: '40px' }}>
          {t('Stay tuned–more secrets will soon be unveiled!')}
        </Body>
      </VStack>
    )
  }

  return (
    <Stack direction={{ base: 'column', lg: 'row' }} w={'full'} maxWidth="816px" spacing={{ base: '8px', lg: '16px' }}>
      <FieldContainer error={error} flex={1}>
        <Input
          height={{ base: '32px', md: '40px', lg: '52px', xl: '60px' }}
          fontSize={{ base: '14px', md: '16px', lg: '20px', xl: '24px' }}
          placeholder="guardian@geyser.fund"
          value={email}
          onChange={handleChange}
          isDisabled={Boolean(user?.email)}
        />
      </FieldContainer>
      <Button
        height={{ base: '32px', md: '40px', lg: '52px', xl: '60px' }}
        paddingX={6}
        variant="solid"
        backgroundColor="neutral1.12"
        color="gray.1"
        onClick={handleConfirm}
        isLoading={submitting}
        fontFamily={fonts.ptSerif}
        fontSize={{ base: '14px', md: '16px', lg: '20px', xl: '24px' }}
        _hover={{ backgroundColor: 'neutral1.11' }}
      >
        {t('Sign me up')}
      </Button>
    </Stack>
  )
}
