import { Box, Button, HStack, Image, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PiShareFat } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { ProjectEntryCardThumbnailPlaceholder } from '@/components/molecules'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { EntryStatus, ProjectEntryFragment } from '@/types'
import { toInt } from '@/utils'

import { PostEditMenu } from '../components/PostEditMenu'

type Props = {
  entry: ProjectEntryFragment
}

export const ProjectEntryCard = ({ entry }: Props) => {
  const { t } = useTranslation()

  const { project } = useProjectAtom()

  const isDraft = useMemo(() => {
    return entry.status === EntryStatus.Unpublished
  }, [entry.status])

  return (
    <>
      <CardLayout
        as={Link}
        to={
          isDraft
            ? getPath('projectPostEdit', project.name, entry.id)
            : getPath('projectPostView', project.name, entry.id)
        }
        dense
        spacing={0}
        w="100%"
      >
        {entry.image && (
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
        )}
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
            <PostEditMenu entry={entry} />
            <Button size="sm" variant="soft" colorScheme="neutral1" rightIcon={<PiShareFat />}>
              {t('Share')}
            </Button>
          </HStack>
        </VStack>
      </CardLayout>
    </>
  )
}
