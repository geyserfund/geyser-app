import { Box, Text, Flex, Link } from '@chakra-ui/react';
import { useState } from 'react';

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

export default function NoteCard({ nostrich, content, date }: Props) {
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
        className="notecard"
        alignItems="flex-start"
        margin="16px 0"
        paddingTop="0px"
        border="1px solid #ccc"
        borderRadius="8px"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        flexWrap="wrap"
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
              backgroundColor="gray.200"
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
          paddingTop={{ base: '5px', md: '0px' }} // Adjusting top padding for responsiveness
        >
          <Text
            marginLeft="20px"
            fontFamily="Arial, sans-serif"
            fontSize="16px"
            fontWeight="bold"
            paddingTop="5px"
            paddingRight="20px"
            marginBottom="5px"
            lineHeight="1.3"
          >
            {display_name}
          </Text>
          <Box marginLeft="20px" marginTop="5px" overflowY="auto">
            <Text
              fontSize="13px"
              overflow="hidden"
              textOverflow="ellipsis"
              wordWrap="break-word"
            >
              {about}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Link>
  );
}
