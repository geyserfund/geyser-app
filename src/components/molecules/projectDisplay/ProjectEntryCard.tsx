import { CloseIcon } from '@chakra-ui/icons'
import { Box, HStack, Image, Spacer, Stack, Text } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { BiPencil } from 'react-icons/bi'
import { BsHeartFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import { getPath } from '../../../constants'
import { AvatarElement } from '../../../pages/projectView/projectMainBody/components'
import { fonts } from '../../../styles'
import {
  EntryForProjectFragment,
  EntryStatus,
} from '../../../types/generated/graphql'
import { getShortAmountLabel, toInt } from '../../../utils'
import { CardLayout } from '../../layouts'
import { Body1, Body2, H2 } from '../../typography'
import { ICard, IconButtonComponent, SatoshiAmount } from '../../ui'
import { EntryStatusLabel } from '../../ui/EntryStatusLabel'
import { ProjectEntryCardThumbnailPlaceholder } from './ProjectEntryCardThumbnailPlaceholder'

type Props = ICard & {
  entry: EntryForProjectFragment
  onEdit?: () => void
  onDelete?: () => void
}

export const ProjectEntryCard = ({ entry, onEdit, onDelete }: Props) => {
  const navigate = useNavigate()

  const isDraft = useMemo(() => {
    return entry.status === EntryStatus.Unpublished
  }, [entry.status])

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (onEdit) {
      onEdit()
    }
  }

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (onDelete) {
      onDelete()
    }
  }

  const handleClick = () => {
    navigate(getPath('entry', `${entry.id}`))
  }

  return (
    <CardLayout
      hover
      display="flex"
      onClick={handleClick}
      padding="12px"
      width={{
        base: '100%',
      }}
      direction={{ base: 'column', lg: 'row' }}
      cursor={isDraft ? 'auto' : 'pointer'}
      alignItems={{ base: 'flex-start', lg: 'center' }}
    >
      <Box
        minWidth={{
          base: 'full',
          lg: '142px',
        }}
        maxWidth={{
          base: 'full',
          lg: '142px',
        }}
        height="142px"
        maxHeight="142px"
      >
        <Image
          maxHeight="142px"
          objectFit="cover"
          boxSize="100%"
          borderRadius={'md'}
          src={entry.image || ''}
          alt={entry.title}
          fallback={<ProjectEntryCardThumbnailPlaceholder />}
        />
      </Box>

      <Stack
        flex={1}
        height="100%"
        width={{
          base: 'full',
          lg: 'calc(100% - 142px)',
        }}
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
        p={1}
      >
        <Stack
          width="100%"
          direction="row"
          justifyContent="space-between"
          alignItems="start"
        >
          <Stack
            flex={1}
            direction={{ base: 'column', lg: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            overflow="hidden"
            pt={1}
          >
            <H2 width="100%" overflow="hidden" isTruncated>
              {entry.title}
            </H2>
            <EntryStatusLabel entry={entry} />
          </Stack>

          <HStack>
            {onEdit && (
              <IconButtonComponent
                noBorder
                aria-label="edit-entry"
                size="sm"
                borderWidth="0"
                icon={<BiPencil fontSize="16px" />}
                onClick={handleEdit}
              />
            )}
            {onDelete && (
              <IconButtonComponent
                noBorder
                aria-label="remove-entry"
                size="sm"
                icon={<CloseIcon />}
                _hover={{ backgroundColor: 'red.100' }}
                onClick={handleDelete}
              />
            )}
          </HStack>
        </Stack>

        <Body1
          marginTop="2"
          color={'neutral.600'}
          fontSize="lg"
          as={'p'}
          noOfLines={[0, 2]}
        >
          {entry.description}
        </Body1>

        <Spacer />

        <Stack
          width="100%"
          align="center"
          justify="start"
          direction={'row'}
          spacing={{ base: '10px', lg: '22px' }}
          overflow="hidden"
        >
          <HStack
            color="primary.400"
            spacing={'10px'}
            align={'center'}
            flex={0}
          >
            <HStack spacing={1}>
              <Text fontFamily={fonts.mono} fontWeight="bold" variant="body1">
                {entry.fundersCount}
              </Text>
              <BsHeartFill />
            </HStack>

            <SatoshiAmount
              fontFamily={fonts.mono}
              variant="body1"
              fontWeight="bold"
              scale={0.8}
            >
              {getShortAmountLabel(entry.amountFunded)}
            </SatoshiAmount>
          </HStack>

          <AvatarElement
            borderRadius="50%"
            user={entry.creator}
            wrapperProps={{ overflow: 'hidden' }}
          />

          {entry.publishedAt && (
            <Body2 whiteSpace="nowrap">
              {DateTime.fromMillis(toInt(entry.publishedAt)).toFormat(
                'dd LLL yyyy',
              )}
            </Body2>
          )}
        </Stack>
      </Stack>
    </CardLayout>
  )
}
