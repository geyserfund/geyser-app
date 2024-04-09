import { Box, Button, Divider, FormControl, FormErrorMessage, FormLabel, HStack, Input } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useForm } from 'react-hook-form'
import { TbMailFilled } from 'react-icons/tb'
import * as yup from 'yup'

import { CardLayout } from '../../../../../../../../../../../components/layouts'
import { H3 } from '../../../../../../../../../../../components/typography'
import { useCustomTheme } from '../../../../../../../../../../../utils'

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required()

export const OnChainEmailAddress = () => {
  const { colors } = useCustomTheme()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: { email: string }) => {
    console.log(data)
  }

  return (
    <CardLayout w="full" padding="20px" spacing="10px">
      <HStack spacing="10px">
        <HStack
          justifyContent="center"
          alignItems="center"
          height="24px"
          width="24px"
          bgColor={'primary.500'}
          borderRadius="8px"
        >
          <TbMailFilled size="14px" fill="neutral.0" />
        </HStack>
        <H3>{t('Get notified (optional)')}</H3>
      </HStack>
      <Divider borderColor="neutral.200" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.email)}>
          <FormLabel htmlFor="email">First email</FormLabel>
          <Input
            id="email"
            placeholder="email"
            {...register('email', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>
        <Button mt={4} isLoading={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </CardLayout>
  )
}
