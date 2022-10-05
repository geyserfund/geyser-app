import {
  Badge,
  Box,
  Heading,
  HStack,
  HTMLChakraProps,
  Image,
  Spacer,
  Text,
  useColorModeValue,
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
  const imageSrc = entry.image;

  return (
    <Box {...rest}>
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
    <Box
      display="flex"
      flexDirection={{ base: 'column', sm: 'row' }}
      justifyContent="space-between"
      onClick={handleClick}
      cursor="pointer"
    >
      <Box
        display="flex"
        flex="1"
        marginRight="3"
        position="relative"
        alignItems="center"
      >
        <Box>
          <Image
            className={styles.thumbnailImage}
            src={entry.image}
            fallback={<ProjectEntryCardThumbnailPlaceholder />}
            fit="cover"
            alt={entry.title}
          />
        </Box>
      </Box>

      <Box display={'flex'} flexDirection="row" flex="0">
        {/* Center content */}
        <Box
          display="flex"
          flexShrink={1}
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Heading
            as={'h2'}
            isTruncated={isMobile === false}
            noOfLines={[0, 1]}
          >
            {entry.title}
          </Heading>

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

          <HStack
            display={'flex'}
            flexDirection="row"
            alignItems={'center'}
            justifyContent="flex-start"
            spacing={4}
          >
            <HStack
              spacing={2}
              alignItems="center"
              justifyContent="flex-start"
              flexGrow={0}
              flexShrink={1}
              maxWidth="66%"
            >
              <ProjectImage entry={entry} flexShrink={0} />

              <Text
                as={'p'}
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

            <Badge
              textTransform="uppercase"
              padding={1}
              borderRadius={0.5}
              display="flex"
            >
              {entry.type}
            </Badge>
          </HStack>
        </Box>

        {/* Badges and Controls */}

        <Box display={'flex'} flexDirection="column" flex="0">
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
        </Box>
      </Box>
    </Box>
  );
};
