import { CloseIcon } from '@chakra-ui/icons'
import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { BiPencil } from 'react-icons/bi'
import { BsHeartFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'

import { getPath } from '../../../constants'
import { colors, fonts } from '../../../styles'
import { Entry, EntryStatus } from '../../../types/generated/graphql'
import { getShortAmountLabel } from '../../../utils'
import { CardLayout } from '../../layouts'
import { MonoBody1, MonoBody2 } from '../../typography'
import { ICard, IconButtonComponent, SatoshiAmount } from '../../ui'
import { ProjectEntryCardThumbnailPlaceholder } from './ProjectEntryCardThumbnailPlaceholder'
import { ProjectListItemImage } from './ProjectListItemImage'

type Props = ICard & {
  entry: Entry
  onEdit?: () => void
  onDelete?: () => void
}

export const ProjectEntryCard = ({
  entry,
  onEdit,
  onDelete,
  ...rest
}: Props) => {
  const navigate = useNavigate()
  const { colorMode } = useColorMode()

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

  return (
    <CardLayout
      hover
      display="flex"
      as={Link}
      to={getPath('entry', `${entry.id}`)}
      padding="12px"
      width={{
        base: '100%',
      }}
      direction={{ base: 'column', md: 'row' }}
      cursor={isDraft ? 'auto' : 'pointer'}
      alignItems={{ base: 'flex-start', md: 'center' }}
    >
      <Box
        minWidth={{
          base: 'full',
          md: '142px',
        }}
        maxWidth={{
          base: 'full',
          md: '142px',
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
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
        p={1}
        pt={2}
      >
        <HStack w="100%" justifyContent="space-between">
          <Heading fontSize={'2xl'} fontFamily={'body'} noOfLines={[0, 1]}>
            {entry.title}
          </Heading>

          <HStack>
            {onEdit && (
              <IconButtonComponent
                aria-label="edit-entry"
                size="sm"
                icon={<BiPencil />}
                onClick={handleEdit}
              />
            )}
            {onDelete && (
              <IconButtonComponent
                aria-label="remove-entry"
                size="sm"
                icon={<CloseIcon />}
                backgroundColor="red.100"
                _hover={{ backgroundColor: 'red.300' }}
                onClick={handleDelete}
              />
            )}
          </HStack>
        </HStack>

        <Text
          marginTop="2"
          color={
            colorMode === 'light' ? 'brand.neutral600' : 'brand.neutral200'
          }
          fontSize="lg"
          as={'p'}
          noOfLines={[0, 2]}
        >
          {entry.description}
        </Text>

        <Spacer />

        <Stack
          align={'start'}
          justify={'start'}
          direction={{ base: 'column', lg: 'row' }}
          spacing={'22px'}
          wrap={{
            base: 'wrap',
            sm: 'nowrap',
          }}
          overflow="hidden"
        >
          <HStack spacing={'12px'} align={'center'} flex={0}>
            <HStack spacing={1}>
              <MonoBody1 color="brand.primary" fontWeight={'bold'}>
                {entry.fundersCount}
              </MonoBody1>
              <BsHeartFill color={colors.primary} />
            </HStack>

            <SatoshiAmount
              fontFamily={fonts.mono}
              color="brand.primary"
              fontSize="16px"
              fontWeight="bold"
              scale={0.8}
            >
              {getShortAmountLabel(entry.amountFunded)}
            </SatoshiAmount>
          </HStack>

          {entry.project ? (
            <HStack
              flex={1}
              spacing={1.5}
              alignItems="center"
              justifyContent="flex-start"
              overflow="hidden"
            >
              <ProjectListItemImage
                boxSize="30px"
                imageSrc={entry.project.thumbnailImage || ''}
                project={entry.project}
                flexShrink={0}
              />

              <Text
                color="brand.neutral600"
                textTransform={'uppercase'}
                overflow="hidden"
                isTruncated
              >
                {entry.project?.title}
              </Text>
            </HStack>
          ) : null}

          <Badge
            textTransform="uppercase"
            fontSize={'10px'}
            fontWeight="regular"
            borderRadius="4px"
            display="flex"
          >
            {entry.type}
          </Badge>
        </Stack>
      </Stack>
    </CardLayout>
  )
}
