import { CopyIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  HTMLChakraProps,
  Text,
  Tooltip,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsInfoCircle } from 'react-icons/bs'

import { AnonymousAvatar, SatoshiAmount } from '../../../../../../../../../components/ui'
import { GEYSER_FEE_DISCLAIMER, LIGHTNING_FEE_PERCENTAGE, noFeeProjects } from '../../../../../../../../../constants'
import { useFundCalc } from '../../../../../../../../../helpers'
import { IFundForm } from '../../../../../../../../../hooks'
import { IBadge } from '../../../../../../../../../interfaces'
import { ProjectFragment, ProjectReward, Satoshis } from '../../../../../../../../../types'
import { copyTextToClipboard } from '../../../../../../../../../utils'
import { hasOwnNode } from '../../../../../../../../../utils/helpers'
import { Badge } from '../../fundingForm/components/Badge'
import { DownloadInvoice } from './DownloadInvoice'

export enum ContributionInfoBoxVersion {
  NEUTRAL = 'neutral',

  PRIMARY = 'primary',
}

type Props = HTMLChakraProps<'div'> & {
  project: ProjectFragment
  contributionAmount: Satoshis
  referenceCode?: string | null
  isFunderAnonymous?: boolean
  showGeyserFee: boolean
  funderEmail?: string
  funderUsername?: string
  funderAvatarURL?: string
  badgesEarned?: IBadge[]
  formState: IFundForm
  version: ContributionInfoBoxVersion
  fundingTxId?: BigInt
}

const ContributionInfoBoxDivider = ({ version }: { version: ContributionInfoBoxVersion }) => {
  if (version === ContributionInfoBoxVersion.PRIMARY) {
    return <Divider borderColor="neutral.0" mixBlendMode="screen" orientation="horizontal" />
  }

  return <Divider />
}

export const ContributionInfoBox = ({
  project,
  formState,
  contributionAmount,
  referenceCode,
  isFunderAnonymous,
  funderEmail,
  funderUsername,
  funderAvatarURL,
  showGeyserFee,
  version,
  fundingTxId,
  ...rest
}: Props) => {
  const { t } = useTranslation()
  const rewards = project.rewards?.filter((reward) => reward !== null) as ProjectReward[]
  const hasRewards = rewards && rewards.length > 0
  const hasSelectedRewards = formState.rewardsByIDAndCount && Object.entries(formState.rewardsByIDAndCount).length > 0

  const isNoFees = noFeeProjects.includes(project.name) || hasOwnNode(project)

  const { getTotalAmount } = useFundCalc(formState)
  const [copy, setCopy] = useState(false)

  const [isFeeTooltipOpen, setFeeTooltipOpen] = useState(false)
  const tooltipContainerRef = useRef(null)

  useOutsideClick({
    ref: tooltipContainerRef,
    handler: () => setFeeTooltipOpen(false),
  })

  return (
    <VStack
      padding={2}
      width={'full'}
      borderRadius="8px"
      backgroundColor={version === ContributionInfoBoxVersion.NEUTRAL ? 'neutral.000' : 'primary.50'}
      spacing={2}
      justify={'flex-start'}
      alignItems="flex-start"
      {...rest}
    >
      {referenceCode && fundingTxId ? (
        <HStack direction="column" spacing="2" justifyContent={'space-between'} width={'100%'}>
          <Text fontSize={'16px'} fontWeight={'bold'} textColor={'neutral.900'}>
            {t('Download Invoice')}
          </Text>
          <DownloadInvoice fundingTxId={fundingTxId} />
        </HStack>
      ) : (
        <>
          <Text fontSize={'18px'} fontWeight={'semibold'}>
            {project.title}
          </Text>
          <ContributionInfoBoxDivider version={version} />
        </>
      )}

      <VStack spacing={2} width="full" color="neutral.900" justify={'space-between'}>
        {funderEmail && !referenceCode && (
          <HStack justify={'space-between'} width={'full'}>
            <Text fontSize={'14px'} fontWeight={'medium'} textColor={'neutral.900'}>
              {t('Email')}:
            </Text>
            <Text fontSize={'16px'} fontWeight={'medium'} color="neutral.700">
              {funderEmail}
            </Text>
          </HStack>
        )}
        {!referenceCode && (
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
        )}
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

      {referenceCode && (
        <VStack align={'flex-start'} mt={2}>
          <Text color="neutral.900" fontWeight="bold" fontSize={'16px'}>
            {t('Share')}
          </Text>
          <Text color="neutral.900" fontWeight="medium" fontSize={'14px'}>
            {t('Consider sharing the project on social media to help the project reach even more people!')}
          </Text>
          <Button
            size="sm"
            color="neutral.900"
            leftIcon={<CopyIcon height="16px" color={'neutral.600'} />}
            variant="secondary"
            fontWeight={'medium'}
            fontSize={'16px'}
            width="100%"
            onClick={() => {
              if (copy === false) {
                copyTextToClipboard(`${window.location.origin}/project/${project.name}`)
                setCopy(true)
                setTimeout(() => {
                  setCopy(false)
                }, 2000)
              }
            }}
          >
            {t('Copy link')}
          </Button>
        </VStack>
      )}
    </VStack>
  )
}
