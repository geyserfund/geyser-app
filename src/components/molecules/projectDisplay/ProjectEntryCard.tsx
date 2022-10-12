import {
  Badge,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router';
import { ICard, IconButtonComponent, SatoshiAmount } from '../../ui';
import { IProjectListEntryItem } from '../../../interfaces';
import { BsHeartFill } from 'react-icons/bs';
import { createUseStyles } from 'react-jss';
import { ProjectEntryCardThumbnailPlaceholder } from './ProjectEntryCardThumbnailPlaceholder';
import { colors } from '../../../constants';
import { ProjectListItemImage } from './ProjectListItemImage';
import { CloseIcon } from '@chakra-ui/icons';
import { BiPencil } from 'react-icons/bi';
import { Entry } from '../../../types/generated/graphql';

type Props = ICard & {
  entry: Entry | IProjectListEntryItem;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

const useStyles = createUseStyles({
  thumbnailImage: {
    height: '142px',
    width: '196px',
    borderRadius: '0.5em',
  },
});

export const ProjectEntryCard = ({
  entry,
  onClick,
  onEdit,
  onDelete,
  ...rest
}: Props) => {
  const history = useHistory();
  const styles = useStyles();

  const handleClick =
    onClick ||
    (() => {
      history.push(`/entry/${entry.id}`);
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

  return (
    <Stack
      borderRadius="lg"
      width={{ sm: '100%', md: '798px' }}
      direction={{ base: 'column', md: 'row' }}
      backgroundColor={useColorModeValue('white', 'gray.900')}
      _hover={{
        backgroundColor: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
      transition={'background-color 0.3s ease-in-out'}
      padding={4}
      cursor={'pointer'}
      overflow="hidden"
      onClick={handleClick}
      {...rest}
    >
      <Flex>
        <Image
          className={styles.thumbnailImage}
          src={entry.image}
          fallback={<ProjectEntryCardThumbnailPlaceholder />}
          fit="cover"
          alt={entry.title}
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
          color={useColorModeValue('brand.neutral600', 'brand.neutral200')}
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
        >
          <HStack spacing={'12px'} align={'center'} flex={0}>
            <HStack spacing={1}>
              <Text color="brand.primary500" fontWeight={'bold'}>
                {entry.fundersCount}
              </Text>
              <BsHeartFill color={colors.primary500} />
            </HStack>

            <SatoshiAmount color="brand.primary500" fontWeight="bold">
              {entry.amountFunded}
            </SatoshiAmount>
          </HStack>

          {entry.project ? (
            <HStack
              spacing={1}
              alignItems="center"
              justifyContent="flex-start"
              flex={0}
            >
              <ProjectListItemImage
                imageSrc={entry.image || ''}
                project={entry.project}
                flexShrink={0}
              />

              <Text
                as={'p'}
                color="brand.neutral600"
                textTransform={'uppercase'}
                noOfLines={1}
              >
                {entry.project.title}
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
