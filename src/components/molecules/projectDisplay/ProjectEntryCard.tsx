import {
  Badge,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router';
import { ICard, IconButtonComponent, SatoshiAmount } from '../../ui';
import { BsHeartFill } from 'react-icons/bs';
import { ProjectEntryCardThumbnailPlaceholder } from './ProjectEntryCardThumbnailPlaceholder';
import { colors, getPath } from '../../../constants';
import { ProjectListItemImage } from './ProjectListItemImage';
import { CloseIcon } from '@chakra-ui/icons';
import { BiPencil } from 'react-icons/bi';
import { Entry } from '../../../types/generated/graphql';
import { IProjectListEntryItem } from '../../../interfaces';

type Props = ICard & {
  entry: Entry | IProjectListEntryItem;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const ProjectEntryCard = ({
  entry,
  onClick,
  onEdit,
  onDelete,
  ...rest
}: Props) => {
  const history = useHistory();
  const { colorMode } = useColorMode();

  const handleClick =
    onClick ||
    (() => {
      history.push(getPath('entry', `${entry.id}`));
    });

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (onEdit) {
      onEdit();
    }
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  const hoverEffect = {
    backgroundColor: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
  };

  return (
    <Stack
      borderRadius="lg"
      width={{
        base: '100%',
        xl: '798px',
      }}
      maxWidth={'798px'}
      direction={{ base: 'column', md: 'row' }}
      backgroundColor={colorMode === 'light' ? 'white' : 'gray.900'}
      _hover={hoverEffect}
      transition={'background-color 0.3s ease-in-out'}
      padding={4}
      cursor={'pointer'}
      overflow="hidden"
      alignItems={{ base: 'flex-start', md: 'center' }}
      onClick={handleClick}
      {...rest}
    >
      <Flex
        flex={1}
        width={{
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
      </Flex>

      <Stack
        flex={1}
        flexDirection="column"
        justifyContent="center"
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
          align={'center'}
          justify={'start'}
          direction={'row'}
          spacing={'22px'}
          wrap={{
            base: 'wrap',
            sm: 'nowrap',
          }}
        >
          <HStack spacing={'12px'} align={'center'} flex={0}>
            <HStack spacing={1}>
              <Text color="brand.primary" fontWeight={'bold'}>
                {entry.fundersCount}
              </Text>
              <BsHeartFill color={colors.primary} />
            </HStack>

            <SatoshiAmount color="brand.primary" fontWeight="bold">
              {entry.amountFunded}
            </SatoshiAmount>
          </HStack>

          {entry.project ? (
            <HStack
              spacing={1.5}
              alignItems="center"
              justifyContent="flex-start"
            >
              <ProjectListItemImage
                imageSrc={entry.image || ''}
                project={entry.project}
                flexShrink={0}
              />

              <Text color="brand.neutral600" textTransform={'uppercase'}>
                {entry.project?.title}
              </Text>
            </HStack>
          ) : null}

          <Badge
            flex={0}
            textTransform="uppercase"
            fontSize={'10px'}
            fontWeight="regular"
            padding={1}
            borderRadius={0.5}
            display="flex"
          >
            {entry.type}
          </Badge>
        </Stack>
      </Stack>
    </Stack>
  );
};
