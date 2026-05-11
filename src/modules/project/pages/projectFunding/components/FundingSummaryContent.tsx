/* eslint-disable complexity */
import { Button, Divider, Grid, HStack, Icon, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { PiCaretDown, PiCaretUp, PiInfo } from 'react-icons/pi'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { TooltipPopover } from '@/shared/components/feedback/TooltipPopover.tsx'
import { Body, H2 } from '@/shared/components/typography'
import { centsToDollars, commaFormatted, useMobileMode } from '@/utils'

export type FundingSummaryAmount = {
  sats: number
  usdCents: number
}

export type FundingSummaryAmountRow = FundingSummaryAmount & {
  label: React.ReactNode
  tooltip?: React.ReactNode
}

export type FundingSummaryProductItem = {
  image?: string | null
  key: string
  label: string
}

export type FundingSummaryContentData = {
  currentGoalTitle?: string
  donation?: FundingSummaryAmountRow
  guardianBadgesSats?: number
  matchingAmount?: FundingSummaryAmountRow
  matchingAvailable?: FundingSummaryAmountRow
  membership?: {
    label: React.ReactNode
    value: React.ReactNode
  }
  networkFee?: FundingSummaryAmount
  productItems: FundingSummaryProductItem[]
  productsCost?: FundingSummaryAmount
  referenceCode?: string | null
  referrerHeroId?: string | null
  shippingCost?: FundingSummaryAmount
  showShippingEstimateTooltip?: boolean
  tip?: FundingSummaryAmountRow
  total: FundingSummaryAmount
}

type FundingSummaryContentProps = {
  data: FundingSummaryContentData
  disableCollapse?: boolean
  hasDetails?: boolean
  mobileHeaderContent?: React.ReactNode
}

type SummaryRowProps = {
  children: React.ReactNode
  label: React.ReactNode
}

const SummaryRow = ({ label, children }: SummaryRowProps) => (
  <Grid w="full" templateColumns="minmax(0, 1fr) max-content" columnGap={3} alignItems="start">
    <Body size={{ base: 'sm', lg: 'md' }} light textAlign="left" whiteSpace="nowrap">
      {label}
    </Body>
    <HStack minW={0} alignItems="start" justifyContent="flex-end" flexWrap="wrap">
      {children}
    </HStack>
  </Grid>
)

const AmountValue = ({ sats, usdCents }: FundingSummaryAmount) => (
  <>
    <Body size={{ base: 'sm', lg: 'md' }} wordBreak="break-all">
      {`${commaFormatted(sats)} `}
      <Body size={{ base: 'sm', lg: 'md' }} as="span" light>
        sats
      </Body>
    </Body>
    <Body as="span" size={{ base: 'sm', lg: 'md' }} medium light wordBreak="break-all">
      {`($${centsToDollars(usdCents).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })})`}
    </Body>
  </>
)

const AmountRow = ({ label, sats, usdCents, tooltip }: FundingSummaryAmountRow) => (
  <SummaryRow label={label}>
    <AmountValue sats={sats} usdCents={usdCents} />
    {tooltip}
  </SummaryRow>
)

/** FundingSummaryContent renders funding summary rows from caller-provided amounts. */
export const FundingSummaryContent = ({
  data,
  disableCollapse,
  hasDetails,
  mobileHeaderContent,
}: FundingSummaryContentProps) => {
  const { t } = useTranslation()

  const isMobileMode = useMobileMode()
  const { isOpen: isMobileDetailsOpen, onToggle: onMobileDetailsToggle } = useDisclosure()
  const sectionDividerColor = useColorModeValue('neutralAlpha.4', 'neutralAlpha.6')

  const hasProductSection = Boolean(data.productItems.length || data.productsCost?.sats || data.shippingCost?.sats)
  const hasMatchingSection = Boolean(data.matchingAvailable || data.matchingAmount)
  const hasContributionSection = Boolean(
    data.donation?.sats ||
      data.membership ||
      data.productItems.length ||
      data.productsCost?.sats ||
      data.shippingCost?.sats ||
      data.tip?.sats ||
      data.networkFee?.sats ||
      data.guardianBadgesSats ||
      data.currentGoalTitle,
  )
  const hasMobileDetails = hasDetails ?? Boolean(hasMatchingSection || hasContributionSection || data.referrerHeroId)
  const mobileDisplayStyle = disableCollapse
    ? 'flex'
    : { base: hasMobileDetails && isMobileDetailsOpen ? 'flex' : 'none', lg: 'flex' }
  const resolvedMobileHeaderContent =
    mobileHeaderContent === undefined ? (
      <VStack w="full" alignItems="start" display={{ base: 'flex', lg: 'none' }} spacing={3} marginBottom={3}>
        <H2 size="xl" bold sx={{ textWrap: 'balance' }}>
          {t('Summary')}
        </H2>
      </VStack>
    ) : (
      mobileHeaderContent
    )

  return (
    <motion.div
      layout
      style={{
        width: '100%',
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        fontVariantNumeric: 'tabular-nums',

        gap: isMobileMode ? '4px' : '12px',
      }}
      transition={{ type: 'spring', stiffness: 900, damping: 40 }}
    >
      <HStack as={motion.div} layout w="full" justifyContent="space-between">
        <H2 size={{ base: 'xl', lg: '2xl' }} display={{ base: 'none', lg: 'block' }} bold sx={{ textWrap: 'balance' }}>
          {t('Summary')}
        </H2>
      </HStack>
      <Button
        variant="soft"
        colorScheme="neutral1"
        size="sm"
        onClick={onMobileDetailsToggle}
        rightIcon={isMobileDetailsOpen ? <PiCaretDown /> : <PiCaretUp />}
        display={{ base: hasMobileDetails ? 'auto' : 'none', lg: 'none' }}
        position="absolute"
        top={1}
        right={0}
        sx={{
          transition: 'transform 0.1s cubic-bezier(0.2, 0, 0, 1), background-color 0.2s',
          '&:active:not(:disabled)': { transform: 'scale(0.96)' },
        }}
      >
        {isMobileDetailsOpen ? t('Collapse') : t('Details')}
      </Button>
      <VStack w="full" alignItems="start" spacing={{ base: 2, lg: 3 }} display={mobileDisplayStyle}>
        {resolvedMobileHeaderContent}

        {data.referrerHeroId && (
          <SummaryRow label={t('Referred by')}>
            <Body size={{ base: 'sm', lg: 'md' }}>{data.referrerHeroId}</Body>
          </SummaryRow>
        )}

        {data.referrerHeroId && (hasMatchingSection || hasContributionSection) && (
          <Divider borderColor={sectionDividerColor} />
        )}

        {data.matchingAvailable && <AmountRow {...data.matchingAvailable} />}

        {data.matchingAmount && <AmountRow {...data.matchingAmount} />}

        {hasMatchingSection && hasContributionSection && <Divider borderColor={sectionDividerColor} />}

        {data.donation && <AmountRow {...data.donation} />}

        {data.donation && hasProductSection && <Divider borderColor={sectionDividerColor} />}

        {data.membership && <SummaryRow label={data.membership.label}>{data.membership.value}</SummaryRow>}

        {data.productItems.length > 0 && (
          <Grid w="full" templateColumns="minmax(0, 1fr) max-content" columnGap={3} alignItems="start">
            <Body size={{ base: 'sm', lg: 'md' }} light textAlign="left" whiteSpace="nowrap">
              {t('Products')}
            </Body>
            <VStack w="full" alignItems="start" spacing={1}>
              {data.productItems.map((item) => (
                <HStack w="full" key={item.key} alignItems="center">
                  <ImageWithReload
                    height="20px"
                    width="20px"
                    minWidth="20px"
                    borderRadius="innerCard"
                    src={item.image}
                    alt={item.label}
                  />
                  <Body isTruncated size={{ base: 'sm', lg: 'md' }}>
                    {item.label}
                  </Body>
                </HStack>
              ))}
            </VStack>
          </Grid>
        )}

        {data.productsCost?.sats ? <AmountRow label={t('Products cost')} {...data.productsCost} /> : null}

        {data.shippingCost?.sats ? (
          <AmountRow
            label={t('Shipping cost')}
            {...data.shippingCost}
            tooltip={
              data.showShippingEstimateTooltip ? (
                <TooltipPopover
                  text={t('Shipping cost is an estimate and may vary depending on the shipping address.')}
                >
                  <HStack as="span" h="full" alignItems="center">
                    <Icon as={PiInfo} />
                  </HStack>
                </TooltipPopover>
              ) : undefined
            }
          />
        ) : null}

        {hasProductSection &&
          (data.tip?.sats || data.networkFee?.sats || data.guardianBadgesSats || data.currentGoalTitle) && (
            <Divider borderColor={sectionDividerColor} />
          )}

        {data.tip?.sats ? <AmountRow {...data.tip} /> : null}

        {data.networkFee?.sats ? (
          <AmountRow
            label={t('Network fees')}
            {...data.networkFee}
            tooltip={
              <TooltipPopover
                text={t('Network fees include mining and swapping fees on the Bitcoin and Rootstock network.')}
              >
                <HStack as="span" h="full" alignItems="center">
                  <Icon as={PiInfo} />
                </HStack>
              </TooltipPopover>
            }
          />
        ) : null}

        {data.guardianBadgesSats ? (
          <SummaryRow label={t('Guardian badges')}>
            <Body size={{ base: 'sm', lg: 'md' }}>{`${commaFormatted(data.guardianBadgesSats)} `}</Body>
          </SummaryRow>
        ) : null}

        {data.currentGoalTitle && (
          <SummaryRow label={t('To a goal')}>
            <Body size={{ base: 'sm', lg: 'md' }}>{data.currentGoalTitle}</Body>
          </SummaryRow>
        )}
      </VStack>

      {(hasMatchingSection || hasContributionSection || data.referrerHeroId) && (
        <Divider borderColor={sectionDividerColor} />
      )}

      <Grid
        as={motion.div}
        layout
        w="full"
        templateColumns="minmax(0, 1fr) max-content"
        columnGap={3}
        alignItems="start"
      >
        <Body size={{ base: 'md', lg: 'xl' }} light textAlign="left" whiteSpace="nowrap">
          {`${t('Total')}: `}
        </Body>
        <HStack minW={0} justifyContent="flex-end" flexWrap="wrap">
          <Body size={{ base: 'md', lg: 'xl' }} medium wordBreak="break-all">
            {`${commaFormatted(data.total.sats)} `}
          </Body>
          <Body as="span" size={{ base: 'md', lg: 'xl' }} light>
            sats
          </Body>
          <Body as="span" size={{ base: 'md', lg: 'xl' }} medium light wordBreak="break-all">
            {`($${centsToDollars(data.total.usdCents).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })})`}
          </Body>
        </HStack>
      </Grid>

      {data.referenceCode && (
        <SummaryRow label={t('Reference code')}>
          <Body size={{ base: 'sm', lg: 'md' }}>{data.referenceCode}</Body>
        </SummaryRow>
      )}
    </motion.div>
  )
}
