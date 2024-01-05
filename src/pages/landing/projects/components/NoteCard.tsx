import { useState } from 'react';
import { CardLayout } from '../../../../components/layouts';
import { Text, Box, Flex, Link } from '@chakra-ui/react';


  const ImageWithReload = ({ src, alt, ...rest }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <img
      src={error ? '' : src}
      alt={alt}
      onError={handleError}
      style={{ width: '120px', height: '120px', maxHeight: '120px', objectFit: 'cover' }}
      {...rest}
    />
  );
};

interface Props {
  content: string;
  nostrich: string;
}

export default function CustomCard({ nostrich, content, date }: Props) {
  let parsedContent;
  try {
    parsedContent = JSON.parse(content);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    parsedContent = {};
  }
  const { display_name, image, about, website } = parsedContent;

  return (
    <Link href={website} textDecoration="none" _hover={{ textDecoration: 'none' }}>
      <Flex
        alignItems="flex-start"
        overflow="hidden"
        margin="16px 0"
        paddingTop="0px"
        border="2px solid #ccc"
        borderRadius="8px"
        backgroundColor="neutral.0"
        transition="border-color 0.5s"
        boxShadow="none"
        flexWrap="wrap"
        _hover={{ cursor: 'pointer', borderColor: 'neutral.400' }}
        _active={{ borderColor: 'primary.400' }}
        _focus={{ borderColor: 'primary.400' }}
      >
        <Box
          flex={{ base: '0 0 120px', md: '0 0 auto' }}
          minWidth="120px"
          position="relative"
          overflow="hidden"
          marginLeft="0px"
          marginRight={{ base: '0px', md: '20px' }}
          marginBottom={{ base: '0px', md: '0px' }}
        >
          {image && (
            <ImageWithReload
              src={image}
              alt={display_name}
            />
          )}
          {!image && (
            <Box
              height="120px"
              width="120px"
              backgroundColor="neutral.0"
              borderRadius="8px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text></Text>
            </Box>
          )}
        </Box>

        <Flex
          flex="1"
          flexDirection="column"
          overflow="hidden"
          maxHeight="120px"
          paddingTop={{ base: '5px', md: '0px' }}
        >
          <Text
            marginLeft="8px"
            fontFamily="Arial, sans-serif"
            fontSize="18px"
            fontWeight="bold"
            paddingTop="5px"
            paddingRight="20px"
            marginBottom="0px"
            lineHeight="1.3"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {display_name}
          </Text>
          <Box marginLeft="8px" marginTop="5px">
            <Text
              fontSize="13px"
              overflow="hidden"
              textOverflow="ellipsis"
              display="-webkit-box"
              WebkitLineClamp={3}
              WebkitBoxOrient="vertical"
            >
              {about}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Link>
  );
}
