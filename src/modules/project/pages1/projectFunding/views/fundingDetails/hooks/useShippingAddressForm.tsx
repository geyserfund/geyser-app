import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useAtom, useSetAtom } from 'jotai'
import { FormEvent, useCallback, useEffect } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useAuthContext } from '@/context/auth.tsx'
import {
  isShippingAddressValidAtom,
  shippingAddressAtom,
  shippingCountryAtom,
} from '@/modules/project/funding/state/shippingAddressAtom.ts'
import { useShippingAddressCreateMutation, useShippingAddressesGetQuery } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { ShippingAddressFormData } from '../sections/FundingDetailsShippingAddress.tsx'

const shippingAddressSchema = yup.object().shape({
  fullName: yup.string().required(t('Full name is required')),
  streetAddress: yup.string().required(t('Street address is required')),
  city: yup.string().required(t('City is required')),
  state: yup.string().required(t('State is required')),
  postalCode: yup.string().required(t('Postal code is required')),
  country: yup.string().required(t('Country is required')),
})

export type ShippingHandleSubmitType = (
  e: FormEvent<HTMLDivElement>,
  onValid: SubmitHandler<ShippingAddressFormData>,
  onInvalid: SubmitErrorHandler<ShippingAddressFormData>,
) => void

export const useShippingAddressForm = () => {
  const toast = useNotification()
  const { user } = useAuthContext()

  const [shippingAddress, setShippingAddress] = useAtom(shippingAddressAtom)
  const setIsShippingAddressValid = useSetAtom(isShippingAddressValidAtom)
  const setShippingCountry = useSetAtom(shippingCountryAtom)

  const form = useForm<ShippingAddressFormData>({
    resolver: yupResolver(shippingAddressSchema),
    mode: 'onChange',
    defaultValues: {
      id: shippingAddress?.id ?? undefined,
      fullName: shippingAddress?.fullName ?? undefined,
      streetAddress: shippingAddress?.addressLines?.[0] ?? undefined,
      city: shippingAddress?.city ?? undefined,
      state: shippingAddress?.state ?? undefined,
      postalCode: shippingAddress?.postalCode ?? undefined,
      country: shippingAddress?.country ?? undefined,
    },
  })

  const { isDirty } = form.formState

  useShippingAddressesGetQuery({
    skip: !user?.id && !shippingAddress?.id,
    variables: {
      input: {
        userId: user.id,
      },
    },
    onCompleted(data) {
      const prevShippingAddress =
        data.shippingAddressesGet.find((address) => address.id === shippingAddress?.id) || data.shippingAddressesGet[0]
      if (prevShippingAddress) {
        setShippingAddress(prevShippingAddress)
        form.reset({
          id: prevShippingAddress.id,
          fullName: prevShippingAddress.fullName,
          streetAddress: prevShippingAddress.addressLines?.[0],
          city: prevShippingAddress.city,
          state: prevShippingAddress.state ?? undefined,
          postalCode: prevShippingAddress.postalCode ?? undefined,
          country: prevShippingAddress.country ?? undefined,
        })
      }
    },
  })

  const [createShippingAddress, { loading: createShippingAddressLoading }] = useShippingAddressCreateMutation({
    onCompleted(data) {
      setShippingAddress({
        id: data.shippingAddressCreate.id,
        fullName: data.shippingAddressCreate.fullName,
        addressLines: data.shippingAddressCreate.addressLines,
        city: data.shippingAddressCreate.city,
        state: data.shippingAddressCreate.state,
        country: data.shippingAddressCreate.country,
        postalCode: data.shippingAddressCreate.postalCode,
      })
    }
  })

  const formCountry = form.watch('country')

  useEffect(() => {
    setShippingCountry(formCountry)
    return () => {
      setShippingCountry(undefined)
    }
  }, [formCountry, setShippingCountry])

  const handleSubmitWrapper = useCallback(
    (
      e: FormEvent<HTMLDivElement>,
      onValid: SubmitHandler<ShippingAddressFormData>,
      onInvalid: SubmitErrorHandler<ShippingAddressFormData>,
    ) => {
      form.handleSubmit(
        async (data) => {
          // Only called when needs shipping is true
          if (!shippingAddress?.id || isDirty) {

            try{
              await createShippingAddress({
                variables: {
                  input: {
                    addressLines: [data.streetAddress],
                    city: data.city,
                    state: data.state,
                    postalCode: data.postalCode,
                    country: data.country,
                    fullName: data.fullName,
                  },
                },
              })
            onValid(data) 
            } catch(error){
              toast.error({
                title: t('Failed to save shipping address'),
                description: error instanceof Error ? error.message : undefined,
              })
            }
          } else {
            onValid(data)
          }
        },
        (errors) => {
          setIsShippingAddressValid(false)
          onInvalid(errors)
        },
      )(e)
    },
    [createShippingAddress, form, isDirty, shippingAddress, setIsShippingAddressValid, toast],
  )

  return {
    form,
    handleSubmitWrapper,
    loading: createShippingAddressLoading,
  }
}
