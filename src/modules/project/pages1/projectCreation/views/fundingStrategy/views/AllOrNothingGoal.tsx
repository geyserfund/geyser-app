import { Button, Input, InputGroup, InputLeftElement, InputRightElement, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { DateTime } from 'luxon'
import ReactDatePicker from 'react-datepicker'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import * as yup from 'yup'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { ControlledCheckboxInput } from '@/shared/components/controlledInput/ControlledCheckboxInput.tsx'
import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants/index.ts'
import { usdRateAtom } from '@/shared/state/btcRateAtom.ts'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { ProjectCreationStep } from '@/types/index.ts'
import { commaFormatted, toInt } from '@/utils/index.ts'

import { useUpdateProjectWithLastCreationStep } from '../../../hooks/useIsStepAhead.tsx'
import { ProjectCreationLayout } from '../../../Layouts/ProjectCreationLayout.tsx'

const formSchema = yup.object({
  amount: yup
    .number()
    .required(t('Amount is required'))
    .min(210000, t('Goal must be at least 210,000 sats (~210$)'))
    .typeError(t('Amount must be a number')),
  duration: yup
    .number()
    .required(t('Duration is required'))
    .min(1, t('Duration must be at least 1 day'))
    .typeError(t('Duration must be a number')),
  launchDate: yup.date().optional().typeError(t('Launch date must be a valid date')),
  isPrivate: yup.boolean().optional(),
})

type FormValues = yup.InferType<typeof formSchema>

export const AllOrNothingGoal = () => {
  const navigate = useNavigate()
  const usdRate = useAtomValue(usdRateAtom)

  const { control, handleSubmit, register, setValue, watch, formState, clearErrors } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
    defaultValues: {
      amount: 0,
      duration: 0,
      launchDate: undefined,
      isPrivate: true,
    },
  })

  const { project } = useProjectAtom()

  const { updateProjectWithLastCreationStep } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.FundingGoal,
    getPath('launchProjectRewards', project.id),
  )

  const { formatUsdAmount } = useCurrencyFormatter()

  const continueProps = {
    type: 'submit' as const,
    isDisabled: false,
  }

  const backButtonProps = {
    onClick() {
      navigate(getPath('launchFundingStrategy', project.id))
    },
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replaceAll(',', '')
    const val = Number(value)
    setValue('amount', val, { shouldValidate: true, shouldDirty: true })
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
    })
  }

  const launchDate = watch('launchDate')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ProjectCreationLayout
        title={t('Funding Goal')}
        continueButtonProps={continueProps}
        backButtonProps={backButtonProps}
      >
        <VStack w="full" h="full" align="flex-start" spacing={8}>
          <FieldContainer
            title={t('Goal amount')}
            subtitle={t('The goal must be at least of 210,000 sats (~210$).')}
            error={formState.errors.amount?.message}
          >
            <InputGroup maxWidth="600px" marginTop={4}>
              <InputLeftElement
                minWidth="100px"
                h="full"
                alignItems="center"
                justifyContent="flex-start"
                paddingLeft={4}
              >
                <Body size="lg" light>
                  {formatUsdAmount(watch('amount'))}
                </Body>
              </InputLeftElement>

              <Input
                paddingRight={14}
                size="lg"
                fontWeight="bold"
                textAlign="right"
                placeholder={'0'}
                value={watch('amount') ? commaFormatted(watch('amount')) : ''}
                onChange={handleInput}
                isInvalid={Boolean(formState.errors.amount)}
                onFocus={() => {
                  clearErrors('amount')
                }}
              />

              <InputRightElement h="full" alignItems="center" minWidth="50px" paddingRight={4}>
                <Body bold>sats</Body>
              </InputRightElement>
            </InputGroup>
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
            title={t('Schedule launch date & time (optional)')}
            subtitle={
              <VStack align="flex-start" gap={0}>
                <Body size="sm">
                  {t(
                    'Pick a launch date for your project. The countdown will start from that date and time. The project will be visible but not fundable yet. You can chose to keep it private until its launch. You can also edit the launch date later.',
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
            <ControlledCheckboxInput
              control={control}
              name="isPrivate"
              label={t('Keep project private until launch')}
              size="lg"
              marginTop={4}
            />
          </FieldContainer>
        </VStack>
      </ProjectCreationLayout>
    </form>
  )
}
