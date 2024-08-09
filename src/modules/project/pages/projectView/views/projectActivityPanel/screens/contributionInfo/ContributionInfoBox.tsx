import { Avatar, Box, Divider, HStack, HTMLChakraProps, Text, Tooltip, useOutsideClick, VStack } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsInfoCircle } from 'react-icons/bs'

import { AnonymousAvatar, SatoshiAmount } from '../../../../../../../../components/ui'
import { useFundCalc } from '../../../../../../../../helpers'
import {
  GEYSER_FEE_DISCLAIMER,
  LIGHTNING_FEE_PERCENTAGE,
  noFeeProjects,
} from '../../../../../../../../shared/constants'
import { FundingStatus, InvoiceStatus, ProjectReward, Satoshis } from '../../../../../../../../types'
import { hasOwnNode } from '../../../../../../../../utils/helpers'
import { useFundingContext } from '../../../../../../context'
import { Badge } from '../../../../../../pages1/projectFunding/components/Badge'
import { DownloadInvoice } from '../../../../../../pages1/projectFunding/views/fundingSuccess/components/DownloadInvoice'
import { CopyProjectLink } from './components'

export enum ContributionInfoBoxVersion {
  NEUTRAL = 'neutral',

  PRIMARY = 'primary',
}

type Props = HTMLChakraProps<'div'> & {
  showGeyserFee: boolean
  version: ContributionInfoBoxVersion
  openedFromGrant?: boolean
}

const ContributionInfoBoxDivider = ({ version }: { version: ContributionInfoBoxVersion }) => {
  if (version === ContributionInfoBoxVersion.PRIMARY) {
    return <Divider borderColor="neutral.0" mixBlendMode="screen" orientation="horizontal" />
  }

  return <Divider />
}

export const ContributionInfoBox = ({ showGeyserFee, version, openedFromGrant, ...rest }: Props) => {
  const { t } = useTranslation()

  const {
    fundForm: { state: formState },
    fundingTx,
    project,
  } = useFundingContext()

  const { getTotalAmount } = useFundCalc(formState)

  const [isFeeTooltipOpen, setFeeTooltipOpen] = useState(false)
  const tooltipContainerRef = useRef(null)

  useOutsideClick({
    ref: tooltipContainerRef,
    handler: () => setFeeTooltipOpen(false),
  })

  if (!project || !project.name) return null

  // const rewards = project.rewards?.filter((reward) => reward !== null) as ProjectReward[]
  const rewards = [] as ProjectReward[]
  const hasRewards = rewards && rewards.length > 0
  const hasSelectedRewards = formState.rewardsByIDAndCount && Object.entries(formState.rewardsByIDAndCount).length > 0
  const isNoFees = noFeeProjects.includes(project.name) || hasOwnNode(project)
  const contributionAmount = getTotalAmount('sats', project.name) as Satoshis
  const { id: fundingTxId, invoiceStatus, status } = fundingTx

  const { funderUsername, funderAvatarURL, anonymous: isFunderAnonymous, email: funderEmail } = formState

  const isPaid = invoiceStatus === InvoiceStatus.Paid || status === FundingStatus.Pending

  const renderTitle = () => {
    if (fundingTxId && isPaid) {
      return (
        <HStack direction="column" spacing="2" justifyContent={'space-between'} width={'100%'}>
          <Text lineHeight="1.0" fontSize={'16px'} fontWeight={'bold'} textColor={'neutral.900'}>
            {t('Download Invoice')}
          </Text>
          <DownloadInvoice fundingTxId={fundingTxId} />
        </HStack>
      )
    }

    return (
      <>
        <Text lineHeight={'1.0'} fontSize={'18px'} fontWeight={'semibold'}>
          {project.title}
        </Text>
        <ContributionInfoBoxDivider version={version} />
      </>
    )
  }

  const renderEmail = () => {
    if (funderEmail && isPaid) {
      return (
        <HStack justify={'space-between'} width={'full'}>
          <Text fontSize={'14px'} fontWeight={'medium'} textColor={'neutral.900'}>
            {t('Email')}:
          </Text>
          <Text fontSize={'16px'} fontWeight={'medium'} color="neutral.700">
            {funderEmail}
          </Text>
        </HStack>
      )
    }

    return null
  }

  const renderFundingAs = () => {
    if (!isPaid) {
      return (
        <HStack spacing={2} width={'full'} justify={'space-between'}>
          <Text fontSize={'14px'} fontWeight={'medium'} textColor={'neutral.900'}>
            {t('Funding as')}:
          </Text>
          {isFunderAnonymous ? (
            <HStack>
              <AnonymousAvatar seed={0} imageSize={'20px'} />
              <Text fontSize={'14px'} fontWeight={'normal'} color="neutral.700">
                {t('anonymous')}
              </Text>
            </HStack>
          ) : (
            <HStack>
              <Avatar width={'20px'} height={'20px'} src={funderAvatarURL} />
              <Text fontSize={'14px'} fontWeight={'normal'} color="neutral.700">
                {funderUsername}
              </Text>
            </HStack>
          )}
        </HStack>
      )
    }

    return null
  }

  return (
    <VStack
      padding={'15px'}
      width={'full'}
      borderRadius="8px"
      backgroundColor={version === ContributionInfoBoxVersion.NEUTRAL ? 'neutral.100' : 'primary.50'}
      spacing={2}
      justify={'flex-start'}
      alignItems="flex-start"
      {...rest}
    >
      {renderTitle()}

      <VStack spacing={2} width="full" color="neutral.900" justify={'space-between'}>
        {renderEmail()}
        {renderFundingAs()}
      </VStack>

      {hasRewards && hasSelectedRewards && (
        <>
          <ContributionInfoBoxDivider version={version} />
          <HStack
            justifyContent={'space-between'}
            width={'full'}
            alignItems="flex-start"
            color="neutral.700"
            fontWeight={'normal'}
          >
            <Text fontSize={'14px'} fontWeight={'medium'} textColor={'neutral.900'}>
              {t('Items')}:
            </Text>
            <VStack flex={1} flexWrap={'wrap'} alignItems="flex-end">
              {formState.rewardsByIDAndCount &&
                Object.entries(formState.rewardsByIDAndCount).map(([key, value]) => {
                  const reward = rewards?.find(({ id }) => id === key)
                  if (reward) {
                    return (
                      <Text key={key} fontSize={'14px'} fontWeight={'normal'} color="neutral.700">
                        {value} x {reward.name}
                      </Text>
                    )
                  }
                })}
              {getTotalAmount('dollar', project.name) >= 10 && (
                <HStack>
                  <Badge donationAmountInDollars={getTotalAmount('dollar', project.name)} />
                  <Text fontSize="14px" textColor={'neutral.700'} fontWeight={'normal'}>
                    {t('Badge')}
                  </Text>
                </HStack>
              )}
            </VStack>
          </HStack>
        </>
      )}
      {formState.donationAmount && formState.donationAmount > 0 && (
        <HStack justify={'space-between'} width={'full'}>
          <Text fontSize={'14px'} fontWeight={'medium'} textColor={'neutral.900'}>
            {t('Donation')}:
          </Text>
          <Text fontSize={'14px'} fontWeight={'normal'} color="neutral.700">
            {formState.donationAmount.toLocaleString()} sats
          </Text>
        </HStack>
      )}
      {showGeyserFee && (
        <>
          <ContributionInfoBoxDivider version={version} />
          <HStack justifyContent={'space-between'} width={'full'}>
            <HStack>
              <Text fontSize="14px" textColor={'neutral.900'} fontWeight={'medium'}>
                {t('Geyser fee')}:
              </Text>
              <Box as="span" ref={tooltipContainerRef}>
                <Tooltip borderRadius="4px" label={t(GEYSER_FEE_DISCLAIMER)} isOpen={isFeeTooltipOpen} placement="top">
                  <Box
                    as="span"
                    onMouseEnter={() => setFeeTooltipOpen(true)}
                    onMouseLeave={() => setFeeTooltipOpen(false)}
                    onClick={() => setFeeTooltipOpen(true)}
                  >
                    <BsInfoCircle fontSize="12px" />
                  </Box>
                </Tooltip>
              </Box>
            </HStack>

            <HStack>
              <SatoshiAmount fontSize="14px" textColor={'neutral.900'} fontWeight={'medium'}>
                {isNoFees ? 0 : Math.round(contributionAmount * 0.02)}
              </SatoshiAmount>
              <Text fontSize="14px" textColor={'neutral.700'} fontWeight={'normal'}>
                {isNoFees ? `(0%)` : `(${LIGHTNING_FEE_PERCENTAGE}%)`}
              </Text>
            </HStack>
          </HStack>
        </>
      )}

      <HStack justifyContent={'space-between'} width={'full'} fontSize={'10px'}>
        <Text color="neutral.900" fontWeight="bold" fontSize={'16px'}>
          {t('Total')}:
        </Text>

        <HStack>
          <Text color="neutral.900" fontWeight="bold" fontSize={'16px'}>
            {`$${getTotalAmount('dollar', project.name)}`}
          </Text>
          <Text color="neutral.700" fontWeight="normal" fontSize={'16px'}>
            {`(${getTotalAmount('sats', project.name).toLocaleString()} sats)`}
          </Text>
        </HStack>
      </HStack>
      {!openedFromGrant && <CopyProjectLink showCopy={isPaid} projectName={project.name} />}
    </VStack>
  )
}
