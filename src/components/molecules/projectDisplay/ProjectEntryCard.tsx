import {
  Badge,
  Box,
  Heading,
  HStack,
  HTMLChakraProps,
  Image,
  SkeletonCircle,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router';
import {
  ProjectFundersCountIndicator,
  ProjectImageListItemPlaceholder,
} from '..';
import { ICard, SatoshiAmount } from '../../ui';
import { IProjectListEntryItem } from '../../../interfaces';
import { isMobileMode } from '../../../utils';
import { BsPencil } from 'react-icons/bs';
import { createUseStyles } from 'react-jss';
import { ProjectEntryCardThumbnailPlaceholder } from './ProjectEntryCardThumbnailPlaceholder';

type Props = ICard & {
  entry: IProjectListEntryItem;
  onClick?: () => void;
  onEdit?: () => void;
};

const useStyles = createUseStyles({
  thumbnailImage: {
    height: '142px',
    width: '196px',
    borderRadius: '0.5em',
  },
});

type ProjectImageProps = HTMLChakraProps<'div'> & {
  entry: IProjectListEntryItem;
};

const ProjectImage = ({ entry, ...rest }: ProjectImageProps) => {
  const imageSrc = entry.project.image;

  return (
    <Box {...rest}>
      {imageSrc && imageSrc.length > 0 ? (
        <Image
          flexShrink={0}
          src={imageSrc}
          boxSize="42px"
          borderRadius="md"
          objectFit="cover"
          fallback={<ProjectImageListItemPlaceholder />}
          fit="cover"
          alt={`Main image for ${entry.project.name}`}
        />
      ) : (
        <SkeletonCircle size="full" speed={0} borderRadius={'4px'} />
      )}
    </Box>
  );
};

export const ProjectEntryCard = ({ entry, onClick, onEdit }: Props) => {
  const isMobile = isMobileMode();
  const history = useHistory();
  const styles = useStyles();

  const handleClick =
    onClick ||
    (() => {
      history.push(`/entry/${entry.id}`);
    });

  const handleEdit = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (onEdit) {
      onEdit();
    }
  };

  return (
    <Stack
      height={'166px'}
      direction={isMobile ? 'column' : 'row'}
      spacing={isMobile ? '0px' : '20px'}
      align="center"
      justify="start"
      maxWidth={'100%'}
      p={2}
      onClick={handleClick}
      cursor="pointer"
    >
      <Box flexShrink={0}>
        <Image
          className={styles.thumbnailImage}
          src={entry.image}
          fallback={<ProjectEntryCardThumbnailPlaceholder />}
          fit="cover"
          alt={entry.title}
        />
      </Box>

      <Box flex={1} display="flex">
        <HStack flex={1}>
          <VStack
            justify={'space-between'}
            align="start"
            height="full"
            flex={1}
            overflow="hidden"
          >
            <Heading
              as={'h2'}
              isTruncated={isMobile === false}
              noOfLines={[0, 1]}
            >
              {entry.title}
            </Heading>

            <Text color="brand.neutral600" as={'p'} noOfLines={[0, 2]}>
              {entry.description}
            </Text>

            <Spacer />

            <HStack flex={0}>
              <HStack spacing={2}>
                <ProjectImage entry={entry} flexShrink={0} />

                <Text
                  color="brand.neutral600"
                  textTransform={'uppercase'}
                  noOfLines={1}
                  isTruncated
                >
                  {entry.project.title}
                </Text>
              </HStack>

              <SatoshiAmount color="brand.primary" fontWeight="bold">
                {entry.amountFunded}
              </SatoshiAmount>

              <Badge textTransform="uppercase" padding={1} borderRadius={0.5}>
                {entry.type}
              </Badge>
            </HStack>
          </VStack>

          <VStack justifyContent="center" height="100%" paddingRight="10px">
            {onEdit ? (
              <Box
                _hover={{
                  cursor: 'pointer',
                  backgroundColor: 'brand.neutral200',
                }}
                as="span"
                borderRadius="50%"
                padding="8px"
                onClick={handleEdit}
              >
                <BsPencil />
              </Box>
            ) : (
              <ProjectFundersCountIndicator count={entry.fundersCount} />
            )}
          </VStack>
        </HStack>
      </Box>
    </Stack>
  );
};
