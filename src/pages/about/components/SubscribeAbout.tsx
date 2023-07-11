import { Button, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { createCreatorRecord } from '../../../api'
import { H1, H3 } from '../../../components/typography'
import { TextInputBox } from '../../../components/ui'
import { useNotification, validateEmail } from '../../../utils'

export const SubscribeAbout = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()

  const [submitting, setSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleEmail = (event: any) => {
    if (error) {
      setError('')
    }

    setEmail(event.target.value)
  }

  const handleConfirm = async () => {
    const res = validateEmail(email)
    if (!res) {
      setError('Please enter a valid email address.')
      return
    }

    try {
      setSubmitting(true)
      const records = [
        {
          fields: {
            Email: email,
            Type: ['Subscriber'],
          },
        },
      ]

      await createCreatorRecord({ records })

      setSubmitting(false)
      setEmail('')

      toast({
        title: 'Succesfully subscribed to Geyser',
        status: 'success',
      })
    } catch (error) {
      toast({
        title: 'Something went wrong.',
        description: 'Please try again',
        status: 'error',
      })
    }
  }

  return (
    <VStack
      maxWidth={'764px'}
      width={'100%'}
      spacing={5}
      padding={3}
      alignItems={'center'}
    >
      <H1>{t('Subscribe to our newsletter')}</H1>
      <H3 color={'neutral.600'}>
        {t(
          'Receive updates about exciting new projects, product updates and Geyser news.',
        )}
      </H3>
      <TextInputBox
        wrapperProps={{ width: '350px' }}
        placeholder={'satoshi@gmx.com'}
        onChange={handleEmail}
        error={error}
      />
      <Button
        isLoading={submitting}
        width={350}
        variant={'primaryGradient'}
        onClick={handleConfirm}
      >
        {t('Subscribe')}
      </Button>
    </VStack>
  )
}
