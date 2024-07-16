import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, IconButton, Image, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { MdModeEdit } from 'react-icons/md'
import { PiShareFat } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

import { ProjectEntryCardThumbnailPlaceholder } from '@/components/molecules'
import { CardLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { EntryStatus, ProjectEntryFragment } from '@/types'
import { toInt } from '@/utils'

type Props = {
  entry: ProjectEntryFragment
  onEdit?: () => void
  onDelete?: () => void
}

export const ProjectEntryCard = ({ entry, onEdit, onDelete }: Props) => {
  const { t } = useTranslation()

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
    if (isDraft) {
      if (onEdit) {
        onEdit()
      }
    } else {
      navigate(getPath('entry', `${entry.id}`))
    }
  }

  return (
    <>
      <CardLayout hover onClick={handleClick} p={0} spacing={0} w="100%">
        <Box w="full" maxHeight="330px" overflow="hidden">
          <Image
            objectFit="cover"
            boxSize="100%"
            borderRadius={'md'}
            src={entry.image || ''}
            alt={entry.title}
            fallback={<ProjectEntryCardThumbnailPlaceholder />}
          />
        </Box>
        <VStack w="full" p={{ base: 3, lg: 6 }} spacing={4} alignItems="start">
          <VStack w="full" spacing={2} alignItems="start">
            <Body size="xl" medium dark>
              {entry.title}
            </Body>
            {entry.publishedAt && (
              <Body size="xs" medium muted whiteSpace="nowrap">
                {DateTime.fromMillis(toInt(entry.publishedAt)).toFormat('dd LLL, yyyy')}
              </Body>
            )}
          </VStack>
          <Body size="xs" medium dark>
            {entry.description}
          </Body>
          <HStack w="full" justifyContent={'end'}>
            {onEdit && (
              <IconButton
                variant="soft"
                colorScheme="info"
                aria-label="edit-entry"
                size="sm"
                minWidth="24px"
                icon={<MdModeEdit fontSize="16px" />}
                onClick={handleEdit}
              />
            )}
            {onDelete && (
              <IconButton
                variant="soft"
                colorScheme="danger"
                aria-label="remove-entry"
                size="sm"
                minWidth="24px"
                icon={<DeleteIcon />}
                onClick={handleDelete}
              />
            )}
            <Button size="sm" variant="soft" colorScheme="neutral1" rightIcon={<PiShareFat />}>
              {t('Share')}
            </Button>
          </HStack>
        </VStack>
      </CardLayout>
    </>
  )
}
