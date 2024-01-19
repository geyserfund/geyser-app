import { HStack, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Body2 } from '../../../../../../../components/typography'
import {
  AnonymousAvatar,
  LinkableAvatar,
} from '../../../../../../../components/ui'
import {
  neutralColorsLight,
  nostrColorsLight,
  primaryColorsLight,
} from '../../../../../../../styles'
import { ShippingStatusSelect } from '../../components/ShippingStatusSelect'
import {
  TableData,
  TableWithAccordion,
} from '../../components/TableWithAccordion'
import { Item } from './RewardByStatus'

export enum RewardStatus {
  todo = 'todo',
  shipped = 'shipped',
  delivered = 'delivered',
}

type RewardStatusOption = {
  label: string
  value: RewardStatus
}

const RewardStatusOptions: RewardStatusOption[] = [
  {
    label: 'Todo',
    value: RewardStatus.todo,
  },
  {
    label: 'Shipped',
    value: RewardStatus.shipped,
  },
  {
    label: 'Delivered',
    value: RewardStatus.delivered,
  },
]

const getBackgroundColors = (value: RewardStatus) => {
  switch (value) {
    case RewardStatus.todo:
      return {
        backgroundColor: neutralColorsLight[200],
        hoverBgColor: neutralColorsLight[400],
      }
    case RewardStatus.shipped:
      return {
        backgroundColor: nostrColorsLight[100],
        hoverBgColor: nostrColorsLight[300],
      }
    case RewardStatus.delivered:
      return {
        backgroundColor: primaryColorsLight[100],
        hoverBgColor: primaryColorsLight[300],
      }
    default:
      return {
        backgroundColor: neutralColorsLight[200],
        hoverBgColor: neutralColorsLight[400],
      }
  }
}

export const RewardTable = ({ data }: { data: Item[] }) => {
  const { t } = useTranslation()

  const tableData: TableData<Item>[] = useMemo(
    () => [
      {
        header: t('Status'),
        key: 'status',
        render(item: Item) {
          const { backgroundColor, hoverBgColor } = getBackgroundColors(
            item.status,
          )
          return (
            <>
              <ShippingStatusSelect
                isSearchable={false}
                backgroundColor={backgroundColor}
                hoverBgColor={hoverBgColor}
                options={RewardStatusOptions}
                value={RewardStatusOptions.find(
                  (val) => val.value === item.status,
                )}
                defaultValue={RewardStatusOptions.find(
                  (val) => val.value === item.status,
                )}
                menuPortalTarget={document.body}
              />
            </>
          )
        },
        colSpan: 2,
      },
      {
        header: t('Name'),
        key: 'name',
        render(val: Item) {
          const isFunderAnonymous = !val.funder
          if (isFunderAnonymous) {
            return (
              <AnonymousAvatar
                seed={val.id}
                imageSize={'20px'}
                textColor="neutral.900"
              />
            )
          }

          return (
            <LinkableAvatar
              avatarUsername={val.funder.name || ''}
              userProfileID={val.funder.name}
              imageSrc={val.funder.imageUrl || ''}
            />
          )
        },
        colSpan: 2,
      },
      {
        header: t('Email'),
        key: 'email',
        colSpan: 2,
      },
      {
        header: t('Date'),
        key: 'paidAt',
        value(val: Item) {
          return DateTime.fromMillis(val.paidAt).toFormat('LLL dd, yyyy')
        },
        colSpan: 2,
      },
      {
        header: t('Reference codes'),
        key: 'reference',
        colSpan: 2,
      },
      {
        header: '',
        key: 'action',
        colSpan: 1,
      },
    ],
    [t],
  )

  const accordionContent = (item: Item) => {
    return (
      <HStack
        w="full"
        justifyContent="flex-end"
        alignItems="flex-start"
        px="24px"
        spacing="20px"
      >
        <HStack alignItems="flex-start" spacing="10px">
          <Body2 color="neutral.700">{t('Items')}:</Body2>
          <VStack spacing="5px">
            {item.rewards.map((reward) => {
              return (
                <HStack key={reward.id}>
                  <Body2 semiBold color="neutral.900">
                    {reward.quantity}x
                  </Body2>
                  <Body2 semiBold color="neutral.900">
                    {reward.name}
                  </Body2>
                </HStack>
              )
            })}
          </VStack>
        </HStack>
        <HStack spacing="10px">
          <VStack alignItems="flex-start" spacing="5px">
            <Body2 color="neutral.700">{t('Total')}:</Body2>
            <Body2 color="neutral.700">{t('Total (Sats')}:</Body2>
            <Body2 color="neutral.700">{t('Bitcoin Price')}:</Body2>
          </VStack>
          <VStack spacing="5px">
            <Body2 semiBold color="neutral.900">
              {item.amount}
            </Body2>
            <Body2 semiBold color="neutral.900">
              {item.amount}
            </Body2>
            <Body2 semiBold color="neutral.900">
              {item.amount}
            </Body2>
          </VStack>
        </HStack>
      </HStack>
    )
  }

  return (
    <TableWithAccordion<Item>
      items={data}
      schema={tableData}
      accordionContent={accordionContent}
    />
  )
}
