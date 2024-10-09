/* eslint-disable complexity */
import { Button, HStack, IconButton, Stack, Tooltip, VStack } from '@chakra-ui/react'
import { Loader } from '@giphy/react-components'
import { useTranslation } from 'react-i18next'
import { BiInfoCircle } from 'react-icons/bi'
import { PiArrowLeft, PiCaretDown, PiX } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'

import { UploadBox } from '@/components/ui'
import { TopNavContainerBar } from '@/modules/navigation/components/topNav'
import { useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { ControlledSelect, ControlledTextArea, ControlledTextInput } from '@/shared/components/controlledInput'
import { ControlledSwitchInput } from '@/shared/components/controlledInput/ControlledSwitchInput'
import { FieldContainer } from '@/shared/components/form'
import { CardLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { CalendarButton, CreatorEmailButton, FileUpload } from '@/shared/molecules'
import { ImageCropAspectRatio } from '@/shared/molecules/ImageCropperModal'
import { MediaControlWithReorder } from '@/shared/molecules/MediaControlWithReorder'
import { PrivateCommentPrompt, RewardCurrency } from '@/types'

import { UpdateCurrencyModal } from '../components/UpdateCurrencyModal'
import { useProjectRewardForm } from '../hooks/useProjectRewardForm'

type Props = {
  buttonText: string
  titleText: string
  createOrUpdate?: 'create' | 'update'
  isLaunch?: boolean
  hideBackbutton?: boolean
  rewardId?: string
}

const MAX_REWARD_IMAGES = 5

export const ProjectRewardForm = ({ buttonText, titleText, createOrUpdate, isLaunch = false, rewardId }: Props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { hasRewards } = useRewardsAtom()

  const {
    control,
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
    rewardId,
    createOrUpdate: createOrUpdate || 'create',
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
          <Button
            as={Link}
            to={hasRewards ? getPath('projectRewards', project?.name) : getPath('project', project?.name)}
            size="lg"
            variant="ghost"
            colorScheme="neutral1"
            leftIcon={<PiArrowLeft />}
          >
            {hasRewards ? t('Back to rewards') : t('Back to project')}
          </Button>

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
      <CardLayout minWidth="100%" justifyContent="center" alignItems="center" bg="neutralAlpha.1" mobileDense>
        <VStack w={{ base: '100%', lg: '75%' }} alignItems="center" justifyContent="center">
          <HStack w="100%">
            <Body size="lg" fontWeight={600}>
              {t(titleText)}
            </Body>
          </HStack>
          <CardLayout w="100%" border={'none'} padding={0} mobileDense gap={6}>
            <CardLayout>
              <FieldContainer
                title={t('Images')}
                subtitle={t('Add one or multiple images to help showcase your reward')}
              >
                <MediaControlWithReorder
                  links={watch('images')}
                  updateLinks={(links) => setValue('images', links, { shouldDirty: true })}
                  aspectRatio={ImageCropAspectRatio.Reward}
                />
                <Stack alignItems="start" direction={{ base: 'column', md: 'row' }} w={'full'} pt={4}>
                  <FileUpload
                    containerProps={{ flex: 1, w: { base: 'full', md: 'unset' } }}
                    caption={t('For best fit, select horizontal 4:3 image. Image size limit: 10MB.')}
                    onUploadComplete={handleImageUpload}
                    onDeleteClick={handleDeleteImage}
                    childrenOnLoading={<UploadBox loading h={{ base: '40px', lg: '64px' }} borderRadius="12px" />}
                    imageCrop={ImageCropAspectRatio.Reward}
                    isDisabled={watch('images').length >= MAX_REWARD_IMAGES}
                  >
                    <UploadBox
                      h={{ base: '40px', lg: '64px' }}
                      borderRadius="12px"
                      flex={1}
                      title={
                        watch('images').length >= MAX_REWARD_IMAGES
                          ? t('Max items reached')
                          : watch('images').length > 0
                          ? t('Upload additional image')
                          : t('Upload image')
                      }
                      opacity={watch('images').length >= MAX_REWARD_IMAGES ? 0.5 : 1}
                      titleProps={{ fontSize: 'lg', light: true }}
                    />
                  </FileUpload>
                </Stack>
              </FieldContainer>
            </CardLayout>
            <Stack direction={{ base: 'column', lg: 'row' }}>
              <ControlledTextInput
                label={t('Reward Name')}
                name="name"
                control={control}
                placeholder={'T-Shirt'}
                error={errors.name?.message}
                size="sm"
              />
              <ControlledTextInput
                label={t('Limited Edition (skip if no limit)')}
                name="maxClaimable"
                control={control}
                placeholder={'100'}
                error={errors.maxClaimable?.message}
                infoTooltip={
                  <Tooltip
                    label={t(
                      'Limited Edition rewards cannot be edited after rewards have been purchased to ensure fairness for the first buyers. To change the amounts of Limited Edition rewards create a new reward.',
                    )}
                  >
                    <span>
                      <BiInfoCircle />
                    </span>
                  </Tooltip>
                }
                size="sm"
              />
            </Stack>
            <Stack direction={{ base: 'column', lg: 'row' }}>
              <ControlledSelect
                label={t('Currency')}
                name="rewardCurrency"
                control={control}
                options={[
                  { label: t('BTC (sats)'), value: RewardCurrency.Btcsat },
                  { label: t('USD ($)'), value: RewardCurrency.Usdcent },
                ]}
                onChange={handleCurrencySelectChange}
                size="sm"
              />

              <ControlledTextInput
                label={`${t('Price')} (${watch('rewardCurrency') === RewardCurrency.Usdcent ? 'USD' : 'SATS'})`}
                name="cost"
                control={control}
                placeholder={'0'}
                error={errors.cost?.message}
                size="sm"
              />
            </Stack>
            <Stack direction={{ base: 'column', lg: 'row' }}>
              <ControlledSelect
                label={t('Category')}
                name="category"
                control={control}
                options={rewardCategories}
                placeholder={t('Select Category')}
                size="sm"
              />
            </Stack>
            <Stack direction={{ base: 'column', lg: 'row' }}>
              <ControlledTextInput
                label={t('Short Description')}
                name="shortDescription"
                control={control}
                placeholder={t('Describe the item you would like to sell')}
                error={errors.shortDescription?.message}
                size="sm"
              />
            </Stack>
            <Stack direction={{ base: 'column', lg: 'row' }}>
              <ControlledTextArea
                label={t('Description')}
                name="description"
                control={control}
                placeholder={t('Describe the item you would like to sell')}
                error={errors.description?.message}
                resize="vertical"
              />
            </Stack>

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
                  defaultChecked={watch('preOrder')}
                />

                <Body size={'md'} light pr={{ base: 0, lg: 2 }}>
                  {t(
                    "For rewards that are still in development and not ready to ship, set them to 'Pre-order' to enable advance purchases by users.",
                  )}
                </Body>
              </VStack>
              {watch('preOrder') ? (
                <VStack alignItems={'flex-start'}>
                  <Body size={'sm'} medium>
                    {t('Expected Availability Date')}
                  </Body>
                  <CalendarButton
                    onChange={(value) => setValue('estimatedAvailabilityDate', value)}
                    containerProps={{ w: '100%' }}
                    showMonthYearPicker={true}
                  >
                    <ControlledTextInput
                      name="estimatedAvailabilityDate"
                      control={control}
                      width="full"
                      border="none"
                      backgroundColor="transparent"
                      displayValue={
                        formatEstimatedAvailabilityDate(watch('estimatedAvailabilityDate')) || 'Select date'
                      }
                      rightAddon={
                        watch('estimatedAvailabilityDate') ? (
                          <IconButton
                            aria-label="clear-date"
                            icon={<PiX />}
                            variant="ghost"
                            onClick={() => {
                              setValue('estimatedAvailabilityDate', undefined)
                            }}
                          />
                        ) : (
                          <PiCaretDown />
                        )
                      }
                    />
                  </CalendarButton>
                  <Body size={'sm'} light>
                    {t("Use “Expected Availability Date' to set when your reward will be developed and available.")}
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
                    size="sm"
                  />

                  <Body size={'sm'} light>
                    {t('Specify estimated delivery time for the reward from the moment it is ordered.')}
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
                    'Set a custom message to thank contributors, provide important details, or share any additional information you’d like them to know after they claim the reward.',
                  )}
                  control={control}
                  placeholder={t('Enter your message here...')}
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
                  label={t('Ask contributors for Nostr public address (npub)')}
                  name="privateCommentPrompts"
                  control={control}
                  switchPosition="left"
                  isChecked={utils.isPromptChecked(PrivateCommentPrompt.NostrNpub)}
                  onChange={() => utils.handlePromptToggle(PrivateCommentPrompt.NostrNpub)}
                />
                <ControlledSwitchInput
                  label={t(
                    'Ask contributors to specify reward preferences or options based on your reward description',
                  )}
                  name="privateCommentPrompts"
                  control={control}
                  switchPosition="left"
                  isChecked={utils.isPromptChecked(PrivateCommentPrompt.ProjectRewardSpecs)}
                  onChange={() => utils.handlePromptToggle(PrivateCommentPrompt.ProjectRewardSpecs)}
                />
              </VStack>
            </CardLayout>

            <CardLayout spacing={4} w="100%" align={'flex-start'}>
              <VStack alignItems={'flex-start'}>
                <ControlledSwitchInput label={t('Ask for shipping address')} name="hasShipping" control={control} />

                <Body size={'md'} light pr={{ base: 0, lg: 2 }}>
                  {t(
                    "Enable this option to request the user's shipping address. This is necessary for delivering physical products directly to your supporters.",
                  )}
                </Body>
              </VStack>

              {watch('hasShipping') && (
                <VStack pl={2} spacing={2} borderLeft="2px solid" borderColor="primary.400" align={'flex-start'}>
                  <Body medium>
                    {t(
                      'Shipping addresses will be requested from the user at checkout and sent to this email address.',
                    )}
                  </Body>

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
          </CardLayout>
        </VStack>
      </CardLayout>

      <UpdateCurrencyModal
        isOpen={currencyChangeModal.isOpen}
        onClose={currencyChangeModal.onClose}
        title={`${t('Are you sure you want to make the change?')}`}
        confirm={handleConfirmCurrencyChange}
        description={`${t(
          'Please note that all reward prices will be automatically updated to reflect their equivalent value in SWITCH_TO_REWARD_CURRENCY, based on the current Bitcoin price in US Dollars. If you wish you can update prices individually for each reward on reward’s page.',
        ).replace('SWITCH_TO_REWARD_CURRENCY', pendingCurrency === RewardCurrency.Usdcent ? 'USD' : 'Bitcoin')}`}
        warning={`${t(
          'You are about to switch the currency denomination for all your rewards from CURRENT_REWARD_CURRENCY to SWITCH_TO_REWARD_CURRENCY. ',
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
