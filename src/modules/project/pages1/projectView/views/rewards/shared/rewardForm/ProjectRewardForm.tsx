/* eslint-disable complexity */
import { Button, IconButton, Stack, Tooltip, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BiInfoCircle } from 'react-icons/bi'
import { PiCaretDown, PiX } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

import Loader from '@/components/ui/Loader'
import { TopNavContainerBar } from '@/modules/navigation/components/topNav'
import { ControlledTextArea, ControlledTextInput } from '@/shared/components/controlledInput'
import { ControlledAmountInput } from '@/shared/components/controlledInput/ControlledAmountInput'
import { ControlledCustomSelect } from '@/shared/components/controlledInput/ControlledCustomSelect.tsx'
import { ControlledSwitchInput } from '@/shared/components/controlledInput/ControlledSwitchInput'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { CalendarButton, CreatorEmailButton } from '@/shared/molecules'
import { BackButton } from '@/shared/molecules/BackButton.tsx'
import { PrivateCommentPrompt, RewardCurrency } from '@/types'

import { UpdateCurrencyModal } from '../../components/UpdateCurrencyModal'
import { useProjectRewardForm } from '../../hooks/useProjectRewardForm'
import { DescriptionComponent } from './components/DescriptionComponent.tsx'
import { FormElementWithSwitch } from './components/FormElementWithSwitch.tsx'
import { HeaderComponent } from './components/HeaderComponent.tsx'
import { ShippingConfig } from './components/ShippingConfig.tsx'

type Props = {
  buttonText: string
  titleText: string
  isUpdate?: boolean
  isLaunch?: boolean
  defaultCategory?: string
  hideBackbutton?: boolean
  rewardUUID?: string
}

export const ProjectRewardForm = ({
  buttonText,
  titleText,
  isUpdate,
  isLaunch = false,
  rewardUUID,
  defaultCategory,
}: Props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const {
    control,
    formLoaded,
    loading,
    watch,
    errors,
    enableSubmit,
    handleSubmit,
    setValue,
    project,
    projectOwner,
    currencyChangeModal,
    rewardLoading,
    utils,
  } = useProjectRewardForm({
    rewardUUID,
    isUpdate,
    isLaunch,
    defaultCategory,
  })

  const ownerEmail = projectOwner?.user?.email || ''

  const {
    handleConfirmCurrencyChange,
    handleCurrencySelectChange,
    rewardCategories,
    isRewardCategoriesLoading,
    handleImageUpload,
    handleDeleteImage,
    formatEstimatedAvailabilityDate,
    pendingCurrency,
  } = utils

  if (!project || isRewardCategoriesLoading) {
    return null
  }

  if (rewardLoading) {
    return <Loader />
  }

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit}>
      {!isLaunch && (
        <TopNavContainerBar>
          <BackButton />

          <Button
            {...(isLaunch ? { flexGrow: 1 } : {})}
            size="lg"
            display={{ base: 'block' }}
            variant="solid"
            colorScheme="primary1"
            type="submit"
            isLoading={loading}
            isDisabled={!enableSubmit}
          >
            {buttonText}
          </Button>
        </TopNavContainerBar>
      )}
      <CardLayout
        minWidth="100%"
        justifyContent="center"
        alignItems="center"
        bg={isLaunch ? 'transparent' : 'neutralAlpha.1'}
        border={isLaunch ? 'none' : '1px solid'}
        spacing={{ base: 6, lg: 10 }}
        mobileDense
      >
        <VStack
          width={'100%'}
          maxWidth={{ base: '100%', lg: isLaunch ? '100%' : '75%' }}
          alignItems="start"
          justifyContent="center"
          gap={6}
        >
          <Body size="lg" fontWeight={600}>
            {t(titleText)}
          </Body>

          <HeaderComponent
            watch={watch}
            setValue={setValue}
            handleImageUpload={handleImageUpload}
            handleDeleteImage={handleDeleteImage}
          />
          <ControlledTextInput
            label={t('Product Name')}
            name="name"
            control={control}
            placeholder={'T-Shirt'}
            error={errors.name?.message}
          />
          <ControlledTextInput
            label={t('Short Description')}
            name="shortDescription"
            control={control}
            placeholder={t('Summary that captures the essence of your product')}
            error={errors.shortDescription?.message}
          />

          <DescriptionComponent formLoaded={formLoaded} control={control} errors={errors} watch={watch} />

          <Stack w="full" direction={{ base: 'column', lg: 'row' }}>
            <ControlledAmountInput
              label={`${t('Price')} (${watch('rewardCurrency') === RewardCurrency.Usdcent ? 'USD' : 'SATS'})`}
              name="cost"
              control={control}
              placeholder={'0'}
              error={errors.cost?.message}
              currency={watch('rewardCurrency')}
            />
            <ControlledCustomSelect<any, any, false>
              label={t('Currency')}
              name="rewardCurrency"
              control={control}
              options={[
                { label: t('BTC (sats)'), value: RewardCurrency.Btcsat },
                { label: t('USD ($)'), value: RewardCurrency.Usdcent },
              ]}
              width="100%"
              onChange={(value) => handleCurrencySelectChange(value?.value)}
            />
          </Stack>

          <Stack w="full" direction={{ base: 'column', lg: 'row' }}>
            <ControlledCustomSelect
              label={t('Category')}
              name="category"
              control={control}
              options={rewardCategories}
              placeholder={t('Select Category')}
              width="100%"
            />
            <ControlledTextInput
              label={t('Limited Edition (skip if no limit)')}
              name="maxClaimable"
              control={control}
              placeholder={'100'}
              error={errors.maxClaimable?.message}
              isDisabled={utils.maxClaimableDisabled}
              infoTooltip={
                <Tooltip
                  label={t(
                    'Limited Edition products cannot be edited after products have been purchased to ensure fairness for the first buyers. To change the amounts of Limited Edition products create a new product.',
                  )}
                >
                  <span>
                    <BiInfoCircle />
                  </span>
                </Tooltip>
              }
              numberOnly
            />
          </Stack>

          <FormElementWithSwitch
            title={t('Add shipping')}
            description={t(
              'Collect the customer’s shipping address and automatically add shipping fees to the product based on that address. This is necessary for delivering physical products directly to your supporters.',
            )}
            switchProps={{
              name: 'hasShipping',
              control,
            }}
          >
            <ShippingConfig />
          </FormElementWithSwitch>
        </VStack>
        <VStack
          width={'100%'}
          maxWidth={{ base: '100%', lg: isLaunch ? '100%' : '75%' }}
          alignItems="start"
          justifyContent="center"
          gap={6}
        >
          <Body size="lg" fontWeight={600}>
            {t('Additional configuration')}
          </Body>
          <CardLayout padding={4} overflow="none">
            <VStack alignItems={'flex-start'}>
              <ControlledSwitchInput
                labelComponent={
                  <Body size="md" medium>
                    {t('Pre-Order')}
                  </Body>
                }
                name="preOrder"
                control={control}
                onChange={(e) => {
                  setValue('preOrder', e.target.checked, { shouldDirty: true })
                  setValue('estimatedAvailabilityDate', undefined, { shouldDirty: true })
                  setValue('estimatedDeliveryInWeeks', undefined, { shouldDirty: true })
                }}
                isChecked={watch('preOrder')}
              />

              <Body size={'md'} light pr={{ base: 0, lg: 2 }}>
                {t(
                  "For products that are still in development and not ready to ship, set them to 'Pre-order' to enable advance purchases by users.",
                )}
              </Body>
            </VStack>
            {watch('preOrder') ? (
              <VStack alignItems={'flex-start'}>
                <Body size={'sm'} medium>
                  {t('Expected Availability Date')}
                </Body>
                <CalendarButton
                  onChange={(value) => setValue('estimatedAvailabilityDate', value, { shouldDirty: true })}
                  containerProps={{ w: '100%' }}
                  showMonthYearPicker={true}
                >
                  <ControlledTextInput
                    name="estimatedAvailabilityDate"
                    control={control}
                    width="full"
                    border="none"
                    backgroundColor="transparent"
                    displayValue={formatEstimatedAvailabilityDate(watch('estimatedAvailabilityDate')) || 'Select date'}
                    rightAddon={
                      watch('estimatedAvailabilityDate') ? (
                        <IconButton
                          aria-label="clear-date"
                          icon={<PiX />}
                          variant="ghost"
                          onClick={() => {
                            setValue('estimatedAvailabilityDate', undefined, { shouldDirty: true })
                          }}
                        />
                      ) : (
                        <PiCaretDown />
                      )
                    }
                  />
                </CalendarButton>
                <Body size={'sm'} light>
                  {t("Use “Expected Availability Date' to set when your product will be developed and available.")}
                </Body>
              </VStack>
            ) : (
              <VStack alignItems={'flex-start'}>
                <Body size={'sm'} medium>
                  {t('Delivery Time (Weeks)')}
                </Body>
                <ControlledTextInput
                  name="estimatedDeliveryInWeeks"
                  control={control}
                  placeholder={'Enter number of weeks'}
                  error={errors.estimatedDeliveryInWeeks?.message}
                />

                <Body size={'sm'} light>
                  {t('Specify estimated delivery time for the product from the moment it is ordered.')}
                </Body>
              </VStack>
            )}
          </CardLayout>

          <CardLayout padding={4} overflow="none">
            <VStack alignItems={'flex-start'}>
              <ControlledTextArea
                label={t('Confirmation Message')}
                name="confirmationMessage"
                description={t(
                  'Set a custom message to thank contributors, provide important details, or share any additional information you’d like them to know after they claim the product.',
                )}
                control={control}
                error={errors.confirmationMessage?.message}
                isInvalid={Boolean(errors.confirmationMessage?.message)}
                placeholder={t('Enter your message here...')}
                resize="vertical"
              />
            </VStack>
          </CardLayout>

          <CardLayout>
            <VStack alignItems={'flex-start'}>
              <Body size={'md'} medium>
                {t('Private comment')}
              </Body>

              <Body size={'md'} light>
                {t(
                  'Contributors can always send you a private message with additional information. You can also select predefined options below to request specific details from them in the private message. If selected, the private comment becomes mandatory for the contributor.',
                )}
              </Body>
              <ControlledSwitchInput
                label={t('Add your product specifications (eg. T-shirt size)')}
                name="privateCommentPrompts"
                control={control}
                switchPosition="left"
                isChecked={utils.isPromptChecked(PrivateCommentPrompt.ProjectRewardSpecs)}
                onChange={() => utils.handlePromptToggle(PrivateCommentPrompt.ProjectRewardSpecs)}
              />
              <ControlledSwitchInput
                label={t('Ask contributors for Nostr public address (npub)')}
                name="privateCommentPrompts"
                control={control}
                switchPosition="left"
                isChecked={utils.isPromptChecked(PrivateCommentPrompt.NostrNpub)}
                onChange={() => utils.handlePromptToggle(PrivateCommentPrompt.NostrNpub)}
              />
              <ControlledSwitchInput
                label={t('Ask contributors for a lighting address in case of partial or full refund')}
                name="privateCommentPrompts"
                control={control}
                switchPosition="left"
                isChecked={utils.isPromptChecked(PrivateCommentPrompt.LightningAddress)}
                onChange={() => utils.handlePromptToggle(PrivateCommentPrompt.LightningAddress)}
              />
            </VStack>
          </CardLayout>

          <CardLayout spacing={4} w="100%" align={'flex-start'}>
            <VStack alignItems={'flex-start'}>
              <ControlledSwitchInput
                label={t('Ask for shipping address')}
                name="hasShipping"
                control={control}
                isChecked={watch('hasShipping')}
              />

              <Body size={'md'} light pr={{ base: 0, lg: 2 }}>
                {t(
                  "Enable this option to request the user's shipping address. This is necessary for delivering physical products directly to your supporters.",
                )}
              </Body>
            </VStack>

            {watch('hasShipping') && (
              <VStack pl={2} spacing={2} borderLeft="2px solid" borderColor="primary.400" align={'flex-start'} w="100%">
                <Body medium>{t('Send your shipping address to the creator at the following email')}</Body>

                <CreatorEmailButton email={ownerEmail} />
              </VStack>
            )}
          </CardLayout>
          {isLaunch && (
            <Stack
              h="100%"
              w="100%"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="flex-end"
              zIndex={4}
            >
              <Button size="lg" variant="outline" colorScheme="neutral1" flexGrow={1} onClick={() => navigate(-1)}>
                {t('Cancel')}
              </Button>
              <Button
                flexGrow={1}
                size="lg"
                display={{ base: 'block' }}
                variant="solid"
                colorScheme="primary1"
                type="submit"
                isLoading={loading}
                isDisabled={!enableSubmit}
              >
                {buttonText}
              </Button>
            </Stack>
          )}
        </VStack>
      </CardLayout>

      <UpdateCurrencyModal
        isOpen={currencyChangeModal.isOpen}
        onClose={currencyChangeModal.onClose}
        title={`${t('Are you sure you want to make the change?')}`}
        confirm={handleConfirmCurrencyChange}
        description={`${t(
          'Please note that all product prices will be automatically updated to reflect their equivalent value in SWITCH_TO_REWARD_CURRENCY, based on the current Bitcoin price in US Dollars. If you wish you can update prices individually for each product on product’s page.',
        ).replace('SWITCH_TO_REWARD_CURRENCY', pendingCurrency === RewardCurrency.Usdcent ? 'USD' : 'Bitcoin')}`}
        warning={`${t(
          'You are about to switch the currency denomination for all your products from CURRENT_REWARD_CURRENCY to SWITCH_TO_REWARD_CURRENCY. ',
        )
          .replace('SWITCH_TO_REWARD_CURRENCY', pendingCurrency === RewardCurrency.Usdcent ? 'USD($)' : 'Bitcoin(sats)')
          .replace(
            'CURRENT_REWARD_CURRENCY',
            watch('rewardCurrency') === RewardCurrency.Usdcent ? 'USD($)' : 'Bitcoin(sats)',
          )}`}
      />
    </form>
  )
}
