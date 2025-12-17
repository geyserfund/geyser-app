import {
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { DateTime } from 'luxon'
import { useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import { useForm } from 'react-hook-form'
import { PiX } from 'react-icons/pi'
import { useNavigate } from 'react-router'
import * as yup from 'yup'

import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { AmountInput } from '@/shared/components/form/AmountInput.tsx'
import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants/index.ts'
import { usdRateAtom } from '@/shared/state/btcRateAtom.ts'
import { ProjectCreationStep, Satoshis, USDCents } from '@/types/index.ts'
import { toInt } from '@/utils/index.ts'

import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'
import { useUpdateProjectWithLastCreationStep } from '../../../hooks/useIsStepAhead.tsx'

const formSchema = yup.object({
  amount: yup
    .number()
    .required(t('Amount is required'))
    .min(210000, t('Goal must be at least 210,000 sats'))
    .typeError(t('Amount must be a number')),
  duration: yup
    .number()
    .required(t('Duration is required'))
    .min(1, t('Duration must be at least 1 day'))
    .typeError(t('Duration must be a number')),
  launchDate: yup.date().optional().typeError(t('Launch date must be a valid date')),
  amountUSD: yup.number().optional().typeError(t('Amount must be a number')),
})

type FormValues = yup.InferType<typeof formSchema>

export const AllOrNothingGoal = () => {
  const navigate = useNavigate()
  const usdRate = useAtomValue(usdRateAtom)

  const { project } = useProjectAtom()

  const { getSatoshisFromUSDCents, getUSDAmount } = useBTCConverter()

  const { handleSubmit, register, setValue, watch, formState, clearErrors } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
    defaultValues: {
      amount: project.aonGoal?.goalAmount || 0,
      amountUSD: project.aonGoal?.goalAmount ? getUSDAmount(project.aonGoal?.goalAmount as Satoshis) : 0,
      duration: project.aonGoal?.goalDurationInDays || 0,
      launchDate: project.launchScheduledAt ? DateTime.fromMillis(project.launchScheduledAt).toJSDate() : undefined,
    },
  })

  const amount = watch('amount') || 0
  const amountUSD = watch('amountUSD') || 0

  const { updateProjectWithLastCreationStep } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.FundingGoal,
    getPath('launchProjectRewards', project.id),
  )

  const continueProps = {
    type: 'submit' as const,
    isDisabled: false,
  }

  const backButtonProps = {
    onClick() {
      navigate(getPath('launchFundingStrategy', project.id))
    },
  }

  const onSubmit = (data: FormValues) => {
    updateProjectWithLastCreationStep({
      aonGoal: {
        aonGoalAmount: {
          aonGoalInSats: data.amount,
          aonGoalUsdQuote: toInt(usdRate),
        },
        aonGoalDurationInDays: data.duration,
      },
      launchScheduledAt: data.launchDate ? DateTime.fromJSDate(data.launchDate).toMillis() : undefined,
    })
  }

  const launchDate = watch('launchDate')

  const { isOpen: isSatoshi, onToggle } = useDisclosure({ defaultIsOpen: false })
  const isDollar = !isSatoshi

  const handleAmountInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replaceAll(',', '')
    const val = Number(value)

    if (!val) {
      setValue('amountUSD', 0)
      setValue('amount', 0)
      return
    }

    if (isDollar) {
      setValue('amountUSD', val)
    } else {
      setValue('amount', val)
    }
  }

  useEffect(() => {
    if (isDollar) {
      const usdToSats = getSatoshisFromUSDCents((amountUSD * 100) as USDCents)
      setValue('amount', usdToSats)
    }
  }, [isDollar, amountUSD, getSatoshisFromUSDCents, setValue])

  useEffect(() => {
    if (isSatoshi) {
      const satsToUsd = getUSDAmount(amount as Satoshis)
      setValue('amountUSD', satsToUsd)
    }
  }, [isSatoshi, amount, getUSDAmount, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ProjectCreationPageWrapper
        title={t('Funding Goal')}
        continueButtonProps={continueProps}
        backButtonProps={backButtonProps}
      >
        <VStack w="full" h="full" align="flex-start" spacing={8}>
          <FieldContainer
            title={t('Goal amount')}
            subtitle={t('The goal must be at least of 210,000 sats.')}
            error={formState.errors.amount?.message}
          >
            <AmountInput
              satoshi={watch('amount')}
              dollar={watch('amountUSD') || 0}
              isSatoshi={isSatoshi}
              handleInput={handleAmountInput}
              onToggle={onToggle}
            />
          </FieldContainer>
          <FieldContainer
            title={t('Project duration')}
            subtitle={
              <VStack align="flex-start" gap={0}>
                <Body size="sm">
                  {t(
                    'The project duration determines how long your project will be active for. We recommend projects to be 30 days or less. They cannot be longer than 60 days.',
                  )}
                </Body>
                <Body size="sm">
                  <Body as="span" bold>
                    {t('Note')}:
                  </Body>{' '}
                  {t('This duration cannot be updated once the project has launched.')}
                </Body>
              </VStack>
            }
            error={formState.errors.duration?.message}
          >
            <InputGroup maxWidth="120px" marginTop={4}>
              <Input
                paddingRight={14}
                size="lg"
                fontWeight="bold"
                textAlign="right"
                placeholder={'0'}
                type="number"
                max={60}
                min={1}
                {...register('duration')}
                isInvalid={Boolean(formState.errors.duration)}
                onFocus={() => {
                  clearErrors('duration')
                }}
              />

              <InputRightElement h="full" alignItems="center" minWidth="50px" paddingRight={4}>
                <Body bold>{t('days')}</Body>
              </InputRightElement>
            </InputGroup>
          </FieldContainer>
          <FieldContainer
            title={t('Schedule launch (optional)')}
            subtitle={
              <VStack align="flex-start" gap={0}>
                <Body size="sm">
                  {t(
                    'Pick a launch date for your project. The project will not be visible until you launch it. You can also edit the launch date later.',
                  )}
                </Body>
                <Body size="sm">
                  <Body as="span" bold>
                    {t('Note')}:
                  </Body>{' '}
                  {t('The project will not automatically launch, you will still need to launch manually.')}
                </Body>
              </VStack>
            }
          >
            <HStack>
              <ReactDatePicker
                selected={watch('launchDate')}
                onChange={(date) =>
                  setValue('launchDate', date || undefined, { shouldValidate: true, shouldDirty: true })
                }
                showTimeSelect
                dateFormat="MM/dd/yyyy h:mm aa"
                timeIntervals={15}
                placeholderText={t('Select date and time')}
                customInput={
                  <Button
                    size="xl"
                    borderRadius="8px"
                    color="utils.text"
                    borderColor="neutral1.6"
                    w="full"
                    variant="outline"
                    colorScheme="neutral1"
                    marginTop={4}
                  >
                    {launchDate
                      ? DateTime.fromJSDate(launchDate).toFormat('MMMM dd, yyyy - h:mm a')
                      : ' Select date and time'}
                  </Button>
                }
              />
              {launchDate && (
                <IconButton
                  aria-label="clear-launch-date"
                  variant="outline"
                  colorScheme="error"
                  size="xl"
                  marginTop={4}
                  icon={<PiX />}
                  onClick={() => setValue('launchDate', undefined)}
                />
              )}
            </HStack>
          </FieldContainer>
        </VStack>
      </ProjectCreationPageWrapper>
    </form>
  )
}
